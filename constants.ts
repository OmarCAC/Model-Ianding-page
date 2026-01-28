
import { ContentSchema, Language } from './types';

export const APP_NAME = "LégalExpress";

export const SYSTEM_INSTRUCTION = `You are "Léa", the expert AI legal assistant for LégalExpress.
Your goal is to help entrepreneurs create their business in France efficiently.
You are professional, warm, reassuring, and precise.
You can explain legal statuses (SAS, SARL, Auto-entrepreneur), tax implications, and the registration process.
You should ask clarifying questions to understand the user's project if needed.
Keep your answers concise, spoken-style (not too long), and helpful.
If the user speaks French, reply in French. If English, reply in English.
Always act as a member of the LégalExpress team.`;

const LEGAL_TEXT_FR = {
  mentions: "LégalExpress SAS au capital de 10.000€.\nSiège social : 123 Avenue de la République, 75011 Paris.\nRCS Paris B 123 456 789.\nDirecteur de la publication : Jean Directeur.\nHébergeur : CloudSecure, 44 Rue des Données, 75000 Paris.",
  privacy: "Nous collectons vos données uniquement pour traiter votre demande de création d'entreprise. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Aucune donnée n'est revendue à des tiers.",
  cgv: "Nos services sont soumis à une obligation de moyens. Les délais indiqués (48h) courent à partir de la réception du dossier complet. Le paiement est dû à la commande. Tout litige relève du Tribunal de Commerce de Paris."
};

const LEGAL_TEXT_EN = {
  mentions: "LégalExpress SAS with a capital of €10,000.\nHeadquarters: 123 Avenue de la République, 75011 Paris, France.\nRCS Paris B 123 456 789.\nDirector of Publication: Jean Directeur.\nHost: CloudSecure, 44 Rue des Données, 75000 Paris.",
  privacy: "We collect your data solely to process your business creation request. In accordance with GDPR, you have the right to access, rectify, and delete your data. No data is sold to third parties.",
  cgv: "Our services are subject to a best-efforts obligation. The indicated deadlines (48h) start from the receipt of the complete file. Payment is due upon ordering. Any dispute falls under the jurisdiction of the Paris Commercial Court."
};

const LEGAL_TEXT_AR = {
  mentions: "LégalExpress SAS برأسمال 10,000 يورو.\nالمقر الرئيسي: 123 Avenue de la République, 75011 Paris.\nRCS Paris B 123 456 789.\nمدير النشر: Jean Directeur.\nالمضيف: CloudSecure, 44 Rue des Données, 75000 Paris.",
  privacy: "نحن نجمع بياناتك فقط لمعالجة طلب إنشاء شركتك. وفقًا للقانون العام لحماية البيانات (GDPR)، لديك الحق في الوصول إلى بياناتك وتصحيحها وحذفها. لا يتم بيع أي بيانات لأطراف ثالثة.",
  cgv: "تخضع خدماتنا لالتزام ببذل العناية الواجبة. المواعيد النهائية المشار إليها (48 ساعة) تبدأ من استلام الملف الكامل. الدفع مستحق عند الطلب. أي نزاع يقع ضمن اختصاص محكمة باريس التجارية."
};

export const TRANSLATIONS: Record<Language, ContentSchema> = {
  fr: {
    dir: 'ltr',
    nav: {
      home: "Accueil",
      painPoints: "Vos Défis",
      services: "Nos Packs",
      contact: "Consultation",
      cta: "Lancer mon projet"
    },
    hero: {
      badge: "Zéro paperasse, 100% Succès",
      title: "Transformez votre idée en entreprise en 48h sans stress",
      subtitle: "Ne laissez pas l'administration freiner votre ambition. Nous gérons tout : statuts, immatriculation, et conseils fiscaux pendant que vous bâtissez votre futur.",
      ctaPrimary: "Démarrer maintenant",
      ctaSecondary: "Voir comment ça marche"
    },
    painPoints: {
      title: "Pourquoi 80% des entrepreneurs hésitent ?",
      subtitle: "L'aventure entrepreneuriale ne devrait pas être un parcours du combattant administratif.",
      items: [
        {
          title: "Labyrinthe Administratif",
          desc: "Des formulaires sans fin et des procédures obscures qui vous font perdre des semaines précieuses.",
          icon: "📜"
        },
        {
          title: "Erreurs Juridiques Fatales",
          desc: "Un mauvais choix de statut peut coûter des milliers d'euros en impôts inutiles ou en responsabilités personnelles.",
          icon: "⚖️"
        },
        {
          title: "Coûts Cachés",
          desc: "Les honoraires d'avocats sont imprévisibles. Chez nous, tout est transparent dès le premier jour.",
          icon: "💸"
        },
        {
          title: "Solitude face aux Rejets",
          desc: "Un dossier rejeté par le greffe ? Nous nous occupons de la médiation et des corrections instantanément.",
          icon: "🛡️"
        }
      ]
    },
    serv: {
      title: "Choisissez votre vitesse de lancement",
      subtitle: "Des solutions adaptées à chaque profil d'entrepreneur.",
      managed: {
        title: "Pack Sérénité Totale",
        price: "Accompagnement A-Z",
        desc: "Nous prenons les rênes. De la rédaction des statuts au Kbis en main propre.",
        list: ["Rédaction personnalisée des statuts", "Immatriculation au Greffe incluse", "Annonce légale offerte", "Conseiller dédié 24/7"],
        cta: "Choisir la Sérénité"
      },
      selfHosted: {
        title: "Plateforme Autonome",
        price: "Outils Intelligents",
        desc: "Générez vos documents instantanément grâce à notre IA juridique et validez-les avec nos experts.",
        list: ["Générateur de statuts intelligent", "Vérification de conformité IA", "Guide fiscal interactif", "Support technique par chat"],
        cta: "Lancer en Autonomie"
      }
    },
    contact: {
      title: "Une question sensible ?",
      subtitle: "Parlez à un expert sans engagement. Votre confidentialité est notre priorité.",
      name: "Nom complet",
      email: "E-mail professionnel",
      msg: "Parlez-nous de votre projet",
      send: "Demander un appel gratuit",
      success: "Demande reçue ! Un expert vous contactera sous 2 heures."
    },
    footer: {
      desc: "L'accélérateur n°1 pour les entrepreneurs qui veulent se concentrer sur l'essentiel.",
      rights: "© 2026 LégalExpress. Tous droits réservés.",
      links: {
        mentions: "Mentions Légales",
        privacy: "Confidentialité",
        cgv: "CGV"
      }
    },
    legalContent: {
      back: "Retour à l'accueil",
      mentions: { title: "Mentions Légales", body: LEGAL_TEXT_FR.mentions },
      privacy: { title: "Politique de Confidentialité", body: LEGAL_TEXT_FR.privacy },
      cgv: { title: "Conditions Générales de Vente", body: LEGAL_TEXT_FR.cgv }
    }
  },
  ar: {
    dir: 'rtl',
    nav: {
      home: "الرئيسية",
      painPoints: "تحدياتك",
      services: "باقاتنا",
      contact: "استشارة",
      cta: "ابدأ مشروعي"
    },
    hero: {
      badge: "صفر تعقيدات، نجاح 100%",
      title: "حوّل فكرتك إلى شركة حقيقية في 48 ساعة بدون ضغوط",
      subtitle: "لا تدع المعاملات الإدارية تعيق طموحك. نحن نتولى كل شيء: العقود، التسجيل، والنصائح الضريبية بينما تبني مستقبلك.",
      ctaPrimary: "ابدأ الآن",
      ctaSecondary: "اكتشف كيف نعمل"
    },
    painPoints: {
      title: "لماذا يتردد 80% من رواد الأعمال؟",
      subtitle: "المغامرة الريادية لا ينبغي أن تكون معركة إدارية.",
      items: [
        {
          title: "متاهة إدارية",
          desc: "نماذج لا تنتهي وإجراءات غامضة تضيع عليك أسابيع ثمينة.",
          icon: "📜"
        },
        {
          title: "أخطاء قانونية قاتلة",
          desc: "اختيار خاطئ للنظام القانوني قد يكلفك آلاف الدراهم من الضرائب غير الضرورية.",
          icon: "⚖️"
        },
        {
          title: "تكاليف خفية",
          desc: "أتعاب المحامين غير متوقعة. معنا، كل شيء شفاف منذ اليوم الأول.",
          icon: "💸"
        },
        {
          title: "وحدة أمام الرفض",
          desc: "ملف مرفوض؟ نحن نتولى الوساطة والتصحيحات فوراً.",
          icon: "🛡️"
        }
      ]
    },
    serv: {
      title: "اختر سرعة انطلاقك",
      subtitle: "حلول مصممة لكل رائد أعمال.",
      managed: {
        title: "باقة الراحة التامة",
        price: "مرافقة من الألف إلى الياء",
        desc: "نحن نتولى كل شيء. من صياغة القانون الأساسي إلى تسليم السجل التجاري.",
        list: ["صياغة مخصصة للقانون الأساسي", "التسجيل التجاري متضمن", "الإعلان القانوني مهدی", "مستشار خاص 24/7"],
        cta: "اختر الراحة"
      },
      selfHosted: {
        title: "المنصة الذاتية",
        price: "أدوات ذكية",
        desc: "أنشئ وثائقك فوراً بفضل ذكائنا الاصطناعي القانوني وراجعها مع خبرائنا.",
        list: ["منشئ وثائق ذكي", "فحص المطابقة بالذكاء الاصطناعي", "دليل ضريبي تفاعلي", "دعم فني عبر الدردشة"],
        cta: "ابدأ باستقلالية"
      }
    },
    contact: {
      title: "لديك سؤال حساس؟",
      subtitle: "تحدث إلى خبير بدون التزام. خصوصيتك هي أولويتنا.",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      msg: "حدثنا عن مشروعك",
      send: "اطلب مكالمة مجانية",
      success: "تم الاستلام! سيتصل بك خبير خلال ساعتين."
    },
    footer: {
      desc: "المسرع الأول لرواد الأعمال الذين يريدون التركيز على المهم.",
      rights: "© 2026 LégalExpress. جميع الحقوق محفوظة.",
      links: {
        mentions: "إشعارات قانونية",
        privacy: "الخصوصية",
        cgv: "الشروط والأحكام"
      }
    },
    legalContent: {
      back: "عودة إلى الرئيسية",
      mentions: { title: "الإشعارات القانونية", body: LEGAL_TEXT_AR.mentions },
      privacy: { title: "سياسة الخصوصية", body: LEGAL_TEXT_AR.privacy },
      cgv: { title: "الشروط العامة للبيع", body: LEGAL_TEXT_AR.cgv }
    }
  },
  en: {
    dir: 'ltr',
    nav: {
      home: "Home",
      painPoints: "Challenges",
      services: "Packs",
      contact: "Consultation",
      cta: "Launch Now"
    },
    hero: {
      badge: "Zero Paperwork, 100% Success",
      title: "Turn Your Idea into a Legal Business in 48h Stress-Free",
      subtitle: "Don't let red tape kill your ambition. We handle everything: bylaws, registration, and tax advice while you build your vision.",
      ctaPrimary: "Start Now",
      ctaSecondary: "How it works"
    },
    painPoints: {
      title: "Why do 80% of Entrepreneurs Hesitate?",
      subtitle: "Starting a business shouldn't be an administrative obstacle course.",
      items: [
        {
          title: "Administrative Maze",
          desc: "Endless forms and obscure procedures that waste weeks of your time.",
          icon: "📜"
        },
        {
          title: "Fatal Legal Mistakes",
          desc: "The wrong legal structure can cost thousands in taxes or personal liability.",
          icon: "⚖️"
        },
        {
          title: "Hidden Costs",
          desc: "Lawyer fees are unpredictable. With us, everything is transparent from day one.",
          icon: "💸"
        },
        {
          title: "Alone against Rejections",
          desc: "File rejected? We handle the mediation and instant corrections for you.",
          icon: "🛡️"
        }
      ]
    },
    serv: {
      title: "Choose Your Launch Speed",
      subtitle: "Solutions tailored for every entrepreneur profile.",
      managed: {
        title: "Total Peace Pack",
        price: "A-Z Management",
        desc: "We take the lead. From drafting bylaws to delivering your registration certificate.",
        list: ["Customized Bylaws Drafting", "Commercial Registration Included", "Legal Announcement Included", "24/7 Dedicated Advisor"],
        cta: "Choose Peace of Mind"
      },
      selfHosted: {
        title: "Autonomous Platform",
        price: "Smart Tools",
        desc: "Generate your documents instantly with our legal AI and validate with experts.",
        list: ["Smart Bylaws Generator", "AI Compliance Check", "Interactive Tax Guide", "Live Chat Support"],
        cta: "Launch Independently"
      }
    },
    contact: {
      title: "Sensitive Question?",
      subtitle: "Speak to an expert with no obligation. Your privacy is our priority.",
      name: "Full Name",
      email: "Business Email",
      msg: "Tell us about your project",
      send: "Request a Free Call",
      success: "Request received! An expert will call you within 2 hours."
    },
    footer: {
      desc: "The #1 accelerator for entrepreneurs who want to focus on what matters.",
      rights: "© 2026 LégalExpress. All rights reserved.",
      links: {
        mentions: "Legal Mentions",
        privacy: "Privacy Policy",
        cgv: "Terms & Conditions"
      }
    },
    legalContent: {
      back: "Back to Home",
      mentions: { title: "Legal Mentions", body: LEGAL_TEXT_EN.mentions },
      privacy: { title: "Privacy Policy", body: LEGAL_TEXT_EN.privacy },
      cgv: { title: "Terms & Conditions", body: LEGAL_TEXT_EN.cgv }
    }
  }
};
