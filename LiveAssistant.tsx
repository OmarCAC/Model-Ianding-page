
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { SYSTEM_INSTRUCTION } from './constants';
import { convertFloat32ToInt16, arrayBufferToBase64, base64ToUint8Array } from './audioUtils';

interface LiveAssistantProps {
  lang: string;
}

const LiveAssistant: React.FC<LiveAssistantProps> = ({ lang }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isTalking, setIsTalking] = useState(false); // AI is talking
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Initialize Audio Contexts
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const stopAudio = () => {
    // Stop all playing sources
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch (e) { }
    });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;

    // Stop input processing
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (inputSourceRef.current) {
      inputSourceRef.current.disconnect();
      inputSourceRef.current = null;
    }
  };

  const handleConnect = async () => {
    setError(null);
    setIsConnecting(true);

    try {
      initAudio();

      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          sampleRate: 16000, 
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        } 
      });

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Live Connect
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
        },
        callbacks: {
            onopen: () => {
              setIsConnecting(false);
              setIsActive(true);
              
              // Setup Input Audio Processing
              const inputContext = new AudioContext({ sampleRate: 16000 });
              const source = inputContext.createMediaStreamSource(stream);
              const scriptProcessor = inputContext.createScriptProcessor(4096, 1, 1);
              
              scriptProcessor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const int16Data = convertFloat32ToInt16(inputData);
                const base64Data = arrayBufferToBase64(int16Data.buffer);
                
                sessionPromise.then(session => {
                   session.sendRealtimeInput({
                     media: {
                       mimeType: 'audio/pcm;rate=16000',
                       data: base64Data
                     }
                   });
                });
              };

              source.connect(scriptProcessor);
              scriptProcessor.connect(inputContext.destination);
              
              // Save refs to clean up later
              inputSourceRef.current = source as any; // Type casting for simplicity in this context
              processorRef.current = scriptProcessor;
            },
            onmessage: async (message: LiveServerMessage) => {
                const serverContent = message.serverContent;
                
                // Handle Interruption
                if (serverContent?.interrupted) {
                    sourcesRef.current.forEach(src => {
                        try { src.stop(); } catch(e) {}
                    });
                    sourcesRef.current.clear();
                    nextStartTimeRef.current = 0;
                    setIsTalking(false);
                }

                // Handle Audio Output
                const base64Audio = serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                if (base64Audio && audioContextRef.current) {
                    setIsTalking(true);
                    const ctx = audioContextRef.current;
                    const audioBytes = base64ToUint8Array(base64Audio);
                    
                    // Decode Raw PCM
                    const float32Data = new Float32Array(audioBytes.length / 2);
                    const dataView = new DataView(audioBytes.buffer);
                    for (let i = 0; i < float32Data.length; i++) {
                        float32Data[i] = dataView.getInt16(i * 2, true) / 32768.0;
                    }

                    const audioBuffer = ctx.createBuffer(1, float32Data.length, 24000);
                    audioBuffer.getChannelData(0).set(float32Data);

                    const source = ctx.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(ctx.destination);

                    // Schedule playback
                    const currentTime = ctx.currentTime;
                    const startTime = Math.max(currentTime, nextStartTimeRef.current);
                    source.start(startTime);
                    nextStartTimeRef.current = startTime + audioBuffer.duration;
                    
                    sourcesRef.current.add(source);
                    source.onended = () => {
                        sourcesRef.current.delete(source);
                        if (sourcesRef.current.size === 0) {
                            setIsTalking(false);
                        }
                    };
                }
            },
            onclose: () => {
                setIsActive(false);
                stopAudio();
            },
            onerror: (e) => {
                console.error(e);
                setError("Connection failed");
                setIsActive(false);
                stopAudio();
            }
        }
      });
      
      sessionRef.current = await sessionPromise;

    } catch (err) {
      console.error(err);
      setError("Microphone access denied or API error");
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    stopAudio();
    setIsActive(false);
    setIsTalking(false);
    window.location.reload(); 
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {!isActive ? (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`group flex items-center gap-3 pl-4 pr-6 py-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:scale-105 hover:shadow-blue-500/25 border border-white/20 backdrop-blur-md ${
            isConnecting ? 'bg-slate-100 text-slate-500' : 'bg-slate-900 text-white'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isConnecting ? 'bg-slate-200' : 'bg-blue-600 group-hover:bg-blue-500'} transition-colors`}>
            {isConnecting ? (
                <svg className="animate-spin h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            )}
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">{isConnecting ? "Connexion..." : "Assistant IA"}</span>
            <span className="font-bold text-sm">Parler avec Léa</span>
          </div>
        </button>
      ) : (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-6 w-80 border border-white/50 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="flex justify-between items-center w-full mb-8">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className={`w-3 h-3 rounded-full ${isTalking ? 'bg-green-500' : 'bg-blue-500'} relative z-10`}></div>
                    <div className={`absolute inset-0 rounded-full ${isTalking ? 'bg-green-500 animate-ping' : 'bg-blue-500'} opacity-50`}></div>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 text-sm">Léa</h3>
                    <p className="text-xs text-slate-500 font-medium">Assistant Juridique</p>
                </div>
            </div>
            <button onClick={handleDisconnect} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
            </button>
          </div>

          <div className="h-32 w-full bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-slate-100 shadow-inner">
             {/* Modern Audio Visualizer */}
             <div className="flex items-center justify-center gap-1.5 h-16 w-full px-8">
                {[1,2,3,4,5].map(i => (
                    <div 
                        key={i} 
                        className={`w-1.5 bg-gradient-to-t from-blue-600 to-indigo-500 rounded-full transition-all duration-75 ease-linear shadow-sm`} 
                        style={{ 
                            height: isTalking ? `${Math.max(20, Math.random() * 100)}%` : '4px',
                            opacity: isTalking ? 1 : 0.3
                        }}
                    ></div>
                ))}
             </div>
          </div>

          <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">
             {isTalking ? "Je vous parle..." : "Je vous écoute..."}
          </p>
          
          <button onClick={handleDisconnect} className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-colors">
            Terminer la session
          </button>
        </div>
      )}
      {error && (
        <div className="absolute bottom-full right-0 mb-4 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-bold shadow-xl w-max animate-in fade-in slide-in-from-bottom-2">
            ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default LiveAssistant;
