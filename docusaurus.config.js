// @ts-check
const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Parro Connect',
  tagline: 'WhatsApp-first clinic management platform',
  favicon: 'img/favicon.ico',

  url: 'https://docs.parroconnect.com',
  baseUrl: '/',

  organizationName: 'parroworks',
  projectName: 'parro-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Parro Connect',
        logo: {
          alt: 'Parro Connect',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/api',
            label: 'API Reference',
            position: 'left',
          },
          {
            href: 'https://github.com/Sujai06062011/pra-backend-meta',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Getting Started', to: '/' },
              { label: 'Backend', to: '/backend/architecture' },
              { label: 'Frontend', to: '/frontend/overview' },
            ],
          },
          {
            title: 'Repos',
            items: [
              { label: 'Backend', href: 'https://github.com/Sujai06062011/pra-backend-meta' },
              { label: 'Frontend', href: 'https://github.com/Sujai06062011/pra-frontend' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Parro Works. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'bash', 'json', 'sql'],
      },
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
