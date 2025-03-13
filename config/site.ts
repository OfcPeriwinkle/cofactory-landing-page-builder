export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'CoFactory Landing Page Builder',
  description: 'Make horific websites regardless of your design experience.',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
  ],
  navMenuItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
  ],
  links: {
    github: 'https://github.com/OfcPeriwinkle/cofactory-landing-page-builder',
    dashboard: '/dashboard',
  },
};
