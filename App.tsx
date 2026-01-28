
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS, APP_NAME } from './constants';
import { Language } from './types';
import LiveAssistant from './LiveAssistant';

type View = 'home' | 'contact' | 'legal';
type LegalPageType = 'mentions' | 'privacy' | 'cgv' | null;

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [view, setView] = useState<View>('home');
  const [legalPage, setLegalPage] = useState<LegalPageType>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang, t.dir]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (targetView: View, hash?: string, legalType?: LegalPageType) => {
    setView(targetView);
    if (targetView === 'legal' && legalType) {
      setLegalPage(legalType);
      window.scrollTo(0, 0);
    } else if (targetView === 'home' && hash) {
      if (view === 'home') {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
    setIsMenuOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setView('home');
    }, 5000);
  };

  const currentLegalContent = legalPage ? t.legalContent[legalPage] : null;

  return (
    <div className={`min-h-screen transition-all ${t.dir === 'rtl' ? 'rtl' : 'ltr'} selection:bg-blue-100 selection:text-blue-900`}>
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="blob bg-blue-200 w-96 h-96 rounded-full top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-50 mix-blend-multiply animate-float"></div>
        <div className="blob bg-indigo-200 w-96 h-96 rounded-full top-0 right-0 translate-x-1/2 -translate-y-1/2 opacity-50 mix-blend-multiply animate-float" style={{animationDelay: '2s'}}></div>
        <div className="blob bg-purple-200 w-80 h-80 rounded-full bottom-0 left-20 translate-y-1/2 opacity-30 mix-blend-multiply animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'glass-nav border-slate-200/50 py-2' : 'bg-transparent border-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">{APP_NAME}</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => handleNavClick('home')} className={`text-sm font-medium transition-all hover:text-blue-600 ${view === 'home' && !legalPage ? 'text-blue-600' : 'text-slate-600'}`}>{t.nav.home}</button>
              <button onClick={() => handleNavClick('home', 'challenges')} className="text-slate-600 hover:text-blue-600 transition-colors font-medium text-sm">{t.nav.painPoints}</button>
              <button onClick={() => handleNavClick('home', 'pricing')} className="text-slate-600 hover:text-blue-600 transition-colors font-medium text-sm">{t.nav.services}</button>
              <button onClick={() => handleNavClick('contact')} className={`text-sm font-medium transition-all hover:text-blue-600 ${view === 'contact' ? 'text-blue-600' : 'text-slate-600'}`}>{t.nav.contact}</button>
              
              <div className="h-4 w-px bg-slate-200 mx-2"></div>

              {/* Language Switcher */}
              <div className="flex items-center bg-white/50 backdrop-blur border border-slate-200 rounded-full p-1">
                {(['en', 'fr', 'ar'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${lang === l ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <button onClick={() => handleNavClick('contact')} className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                {t.nav.cta}
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleMenu} className="text-slate-700 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-xl px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
            <button onClick={() => handleNavClick('home')} className="block text-slate-800 font-semibold text-lg w-full text-left py-2 border-b border-slate-50">{t.nav.home}</button>
            <button onClick={() => handleNavClick('home', 'challenges')} className="block text-slate-600 font-medium w-full text-left py-2">{t.nav.painPoints}</button>
            <button onClick={() => handleNavClick('home', 'pricing')} className="block text-slate-600 font-medium w-full text-left py-2">{t.nav.services}</button>
            <button onClick={() => handleNavClick('contact')} className="block text-slate-600 font-medium w-full text-left py-2">{t.nav.contact}</button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative">
        {view === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
              <div className="text-center max-w-5xl mx-auto relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 backdrop-blur border border-blue-100 text-blue-600 text-xs font-bold mb-8 uppercase tracking-wider shadow-sm animate-float">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  {t.hero.badge}
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
                  <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900">
                    {t.hero.title}
                  </span>
                </h1>
                <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
                  {t.hero.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button onClick={() => handleNavClick('contact')} className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300">
                    {t.hero.ctaPrimary}
                  </button>
                  <button onClick={() => handleNavClick('home', 'challenges')} className="w-full sm:w-auto px-10 py-4 bg-white/80 backdrop-blur text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-white hover:border-blue-300 hover:text-blue-600 hover:shadow-lg transition-all duration-300">
                    {t.hero.ctaSecondary}
                  </button>
                </div>
              </div>

              {/* Trust Indicators / Stats */}
              <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-10 border-t border-slate-200/60 bg-white/30 backdrop-blur rounded-3xl p-8 shadow-sm">
                {[
                    { label: "Projets Accompagnés", value: "2,500+" },
                    { label: "Satisfaction Client", value: "98%" },
                    { label: "Temps Moyen", value: "48h" },
                    { label: "Experts Juridiques", value: "50+" }
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <span className="text-3xl font-extrabold text-slate-900">{stat.value}</span>
                        <span className="text-xs uppercase font-bold text-slate-500 tracking-widest">{stat.label}</span>
                    </div>
                ))}
              </div>
            </section>

            {/* Pain Points Section */}
            <section id="challenges" className="py-32 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-20">
                  <h2 className="text-4xl font-extrabold text-slate-900 mb-6">{t.painPoints.title}</h2>
                  <p className="text-slate-500 max-w-2xl mx-auto text-xl">{t.painPoints.subtitle}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {t.painPoints.items.map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 group">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section id="pricing" className="py-24 bg-slate-900 text-white relative overflow-hidden rounded-[3rem] mx-2 md:mx-4 mb-20">
               {/* Decorative background for dark section */}
               <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]"></div>
               <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px]"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-20 text-center">
                  <h2 className="text-4xl font-extrabold text-white mb-4">{t.serv.title}</h2>
                  <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg">{t.serv.subtitle}</p>
                </div>
                <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
                  {/* Managed */}
                  <div className="bg-white text-slate-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-indigo-600 text-white px-8 py-2 font-bold text-sm uppercase rounded-bl-3xl shadow-lg">Populaire</div>
                    <div className="mb-8">
                        <h3 className="text-3xl font-extrabold text-slate-900 mb-2">{t.serv.managed.title}</h3>
                        <p className="text-blue-600 text-sm font-bold uppercase tracking-widest">{t.serv.managed.price}</p>
                    </div>
                    <p className="text-slate-600 mb-10 text-lg leading-relaxed">{t.serv.managed.desc}</p>
                    <ul className="space-y-4 mb-10 text-slate-700 font-medium">
                      {t.serv.managed.list.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg> 
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => handleNavClick('contact')} className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all transform active:scale-95">
                      {t.serv.managed.cta}
                    </button>
                  </div>
                  {/* Self-Hosted / Platform */}
                  <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-[2.5rem] p-10 hover:bg-slate-800 transition-all duration-300">
                    <div className="mb-8">
                        <h3 className="text-3xl font-extrabold text-white mb-2">{t.serv.selfHosted.title}</h3>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{t.serv.selfHosted.price}</p>
                    </div>
                    <p className="text-slate-300 mb-10 text-lg leading-relaxed">{t.serv.selfHosted.desc}</p>
                    <ul className="space-y-4 mb-10 text-slate-300 font-medium">
                      {t.serv.selfHosted.list.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg> 
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => handleNavClick('contact')} className="w-full py-5 bg-transparent border-2 border-slate-600 text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-slate-900 hover:border-white transition-all">
                      {t.serv.selfHosted.cta}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        
        {view === 'contact' && (
          /* Contact View */
          <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[90vh] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <button onClick={() => handleNavClick('home')} className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm uppercase tracking-wider group">
                   <span className="group-hover:-translate-x-1 transition-transform">←</span>
                   {t.legalContent.back}
                </button>
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">{t.contact.title}</h1>
                <p className="text-slate-500 mb-12 text-xl font-medium leading-relaxed">{t.contact.subtitle}</p>
                <div className="space-y-8">
                  <div className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">Assistance Directe</h4>
                      <p className="text-slate-900 font-bold text-xl">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">E-mail Prioritaire</h4>
                      <p className="text-slate-900 font-bold text-xl">expert@legalexpress.site</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] relative">
                {!formSubmitted ? (
                  <form className="space-y-6 relative z-10" onSubmit={handleContactSubmit}>
                    <div className="group">
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-blue-600 transition-colors">{t.contact.name}</label>
                      <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 font-medium" placeholder="Jean Dupont" />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-blue-600 transition-colors">{t.contact.email}</label>
                      <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 font-medium" placeholder="jean@entreprise.com" />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-blue-600 transition-colors">{t.contact.msg}</label>
                      <textarea rows={4} required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none text-slate-900 font-medium" placeholder="Décrivez votre idée..."></textarea>
                    </div>
                    <button type="submit" className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3">
                      {t.contact.send}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                  </form>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_0_8px_rgba(220,252,231,0.5)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900 mb-4">{t.contact.success}</p>
                    <p className="text-slate-500 text-lg">Un consultant va analyser vos premiers éléments.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {view === 'legal' && currentLegalContent && (
            <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-[90vh] animate-in slide-in-from-bottom-5 duration-500">
                 <button onClick={() => handleNavClick('home')} className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm uppercase tracking-wider group">
                   <span className="group-hover:-translate-x-1 transition-transform">←</span>
                   {t.legalContent.back}
                 </button>
                 <div className="bg-white/80 backdrop-blur-xl p-10 md:p-14 rounded-[2rem] shadow-xl border border-white">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 pb-6 border-b border-slate-100">{currentLegalContent.title}</h1>
                    <div className="prose prose-slate prose-lg text-slate-600 whitespace-pre-line leading-loose">
                        {currentLegalContent.body}
                    </div>
                 </div>
            </section>
        )}
      </main>
      
      {/* AI Assistant Widget */}
      <LiveAssistant lang={lang} />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 justify-between items-start gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => handleNavClick('home')}>
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">L</div>
                <span className="font-extrabold text-2xl text-slate-900 tracking-tight">{APP_NAME}</span>
              </div>
              <p className="text-slate-500 text-lg max-w-sm leading-relaxed mb-8">{t.footer.desc}</p>
              <div className="flex gap-4">
                  {['twitter', 'facebook', 'linkedin'].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer">
                          <div className="w-4 h-4 bg-current rounded-sm"></div>
                      </div>
                  ))}
              </div>
            </div>
            <div className={`flex flex-col ${t.dir === 'rtl' ? 'md:items-start' : 'md:items-end'}`}>
              <div className="flex flex-wrap gap-8 mb-4 font-bold text-sm text-slate-600">
                  <button onClick={() => handleNavClick('legal', undefined, 'mentions')} className="hover:text-blue-600 transition-colors text-left">{t.footer.links.mentions}</button>
                  <button onClick={() => handleNavClick('legal', undefined, 'privacy')} className="hover:text-blue-600 transition-colors text-left">{t.footer.links.privacy}</button>
                  <button onClick={() => handleNavClick('legal', undefined, 'cgv')} className="hover:text-blue-600 transition-colors text-left">{t.footer.links.cgv}</button>
              </div>
              <p className="text-sm font-medium text-slate-400">{t.footer.rights}</p>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 text-center">
             <p className="text-xs text-slate-400 font-medium">Fait avec passion à Paris 🇫🇷</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
