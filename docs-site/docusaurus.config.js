const {themes} = require('prism-react-renderer');
const redocusaurus = require('redocusaurus');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EnvoyOU API Documentation',
  tagline: 'Comprehensive Environmental Data API Platform',
  favicon: 'img/favicon.ico',
  url: 'https://docs.envoyou.com',
  baseUrl: '/',
  organizationName: 'hk-dev13',
  projectName: 'docs-envoyou',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'en', locales: ['en'] },
  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/hk-dev13/docs-envoyou/tree/main/',
          path: '../docs'
        },
        blog: false,
        theme: { customCss: './docusaurus-theme/css/custom.css' }
      })
    ]
  ],
  plugins: [],
  themeConfig: ({
    image: 'img/envoyou-social-card.jpg',
    navbar: {
      title: 'EnvoyOU API Docs',
      logo: { alt: 'EnvoyOU Logo', src: 'https://cdn.envoyou.com/logo-envoyou/svg/logo-icon.nb.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Documentation' },
        { href: '/api-spec/', label: 'API Spec', position: 'left' },
        { href: 'https://api.envoyou.com/docs', label: 'Interactive API', position: 'left' },
        { href: 'https://app.envoyou.com', label: 'Web App', position: 'right' },
        { href: 'https://github.com/hk-dev13/doc-envoyou', label: 'GitHub', position: 'right' }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Getting Started', to: '/docs/introduction' },
            { label: 'API Reference', to: '/docs/api-reference' },
            { label: 'Interactive API', href: 'https://api.envoyou.com/docs' }
          ]
        },
        {
          title: 'Community',
          items: [
            { label: 'Support', href: 'mailto:support@envoyou.com' },
            { label: 'GitHub', href: 'https://github.com/hk-dev13/doc-envoyou' }
          ]
        },
        {
          title: 'More',
          items: [
            { label: 'Web App', href: 'https://app.envoyou.com' },
            { label: 'Landing Page', href: 'https://envoyou.com' }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} EnvoyOU. Built with Docusaurus.`
    },
    prism: { theme: lightTheme, darkTheme },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false
    }
  })
};

module.exports = config;
