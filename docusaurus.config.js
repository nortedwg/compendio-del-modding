// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Compendio del Modding',
  tagline: 'Para EpsilonWoW',
  favicon: 'img/favicon.png',
  titleDelimiter: '·',

  future: {
    v4: true,
  },

  url: 'https://nortedwg.github.io',
  baseUrl: '/compendio-del-modding/',

  organizationName: 'nortedwg',
  projectName: 'compendio-del-modding',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localeConfigs: {
      es: { label: 'Español' },
      en: { label: 'English' },
    },
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Compendio del Modding',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Guías',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://x.com/norte_m2',
            label: 'Twitter',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Compendio del Modding · Hecho con Docusaurus`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
