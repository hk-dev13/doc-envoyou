const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Envoyou API Documentation',
  tagline: 'Comprehensive Environmental Data API Platform',
  favicon: 'img/favicon.ico',
  url: 'https://docs.envoyou.com',
  baseUrl: '/',
  organizationName: 'hk-dev13',
  projectName: 'doc-envoyou',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'en', locales: ['en'] },
  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/hk-dev13/doc-envoyou/tree/main/',
          path: '../docs'
        },
        blog: false,
        theme: { customCss: './docusaurus-theme/css/custom.css' }
      })
    ]
  ],
  plugins: [],
  themeConfig: ({
    image: 'img/android-chrome-512x512.png',
    navbar: {
      title: 'Envoyou API Docs',
      logo: { alt: 'Envoyou Logo', src: 'https://cdn.envoyou.com/logo-envoyou/svg/logo-icon.nb.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Documentation' },
        { href: 'https://api.envoyou.com/docs', label: 'Interactive API', position: 'left' },
        { href: 'https://app.envoyou.com', label: 'Web App', position: 'right' },
        { href: 'https://github.com/hk-dev13/doc-envoyou', label: 'GitHub', position: 'right' }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Navigation',
          items: [
            { label: 'Documentation', to: '/docs/introduction' },
            { label: 'Interactive API', href: 'https://api.envoyou.com/docs' },
            { label: 'Web App', href: 'https://app.envoyou.com' },
            { label: 'Landing Page', href: 'https://envoyou.com' }
          ]
        },
        {
          title: 'Legal',
          items: [
            { label: 'Terms of Service', href: 'https://envoyou.com/legal/terms' },
            { label: 'Privacy Policy', href: 'https://envoyou.com/legal/privacy' },
            { label: 'License', href: 'https://github.com/hk-dev13/ENVOYou-page/blob/main/LICENSE' },
            { label: 'Contribute', href: 'https://github.com/hk-dev13/project-permit-api' }
          ]
        },
        {
          title: 'Follow Us',
          items: [
            {
              html: '<a href="https://github.com/hk-dev13" target="_blank" rel="noopener noreferrer"><img src="https://cdn.envoyou.com/icon-sosmed/github.svg" alt="GitHub" style="width: 24px; height: 24px; filter: brightness(0.6);" class="social-icon" /></a>'
            },
            {
              html: '<a href="https://www.linkedin.com/in/husni-kusuma/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><img src="https://cdn.envoyou.com/icon-sosmed/linkedin.svg" alt="LinkedIn" style="width: 24px; height: 24px; filter: brightness(0.6);" class="social-icon" /></a>'
            },
            {
              html: '<a href="https://x.com/EnvoyouAPI" target="_blank" rel="noopener noreferrer" title="X"><img src="https://cdn.envoyou.com/icon-sosmed/twitter.svg" alt="X (Twitter)" style="width: 24px; height: 24px; filter: brightness(0.6);" class="social-icon" /></a>'
            },
            {
              html: '<a href="https://www.instagram.com/envoyou/" target="_blank" rel="noopener noreferrer" title="Instagram"><img src="https://cdn.envoyou.com/icon-sosmed/instagram.svg" alt="Instagram" style="width: 24px; height: 24px; filter: brightness(0.6);" class="social-icon" /></a>'
            }
          ]
        }
      ],
      copyright: `© 2025 Husni Kusuma (hk-dev13). All Rights Reserved.`
    },
    prism: {
      theme: lightTheme,
      darkTheme: darkTheme
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true
    }
  })
};

module.exports = config;
