
export type Language = 'en' | 'fr' | 'ar';

export interface NavContent {
  home: string;
  painPoints: string;
  services: string;
  contact: string;
  cta: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface ServiceItem {
  title: string;
  price: string;
  desc: string;
  list: string[];
  cta: string;
}

export interface ContentSchema {
  dir: 'ltr' | 'rtl';
  nav: NavContent;
  hero: HeroContent;
  painPoints: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
      icon: string;
    }[];
  };
  serv: {
    title: string;
    subtitle: string;
    managed: ServiceItem;
    selfHosted: ServiceItem;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    msg: string;
    send: string;
    success: string;
  };
  footer: {
    desc: string;
    rights: string;
    links: {
      mentions: string;
      privacy: string;
      cgv: string;
    };
  };
  legalContent: {
    back: string;
    mentions: { title: string; body: string };
    privacy: { title: string; body: string };
    cgv: { title: string; body: string };
  };
}
