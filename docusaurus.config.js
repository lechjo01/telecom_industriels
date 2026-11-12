// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Systèmes industriels connectés',
  tagline: 'Introduction aux protocoles des réseaux locaux industriels',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://lechjo01.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/telecom_industriels/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lechjo01', // Usually your GitHub org/user name.
  projectName: 'telecom_industriels', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Présentation',
        logo: {
          alt: 'Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Notes de cours',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Ressources',
            items: [
              {
                label: 'eCampus',
                href: 'https://ecampus.heh.be/login/index.php',
              },
              {
                label: 'ressources HEH du cours',
                href: 'https://hehbe-my.sharepoint.com/:f:/g/personal/jonathan_lechien_heh_be/IgAaYbowsmIaSa67wd6Ctw7yAcUYJS9QLMpYdCm-vh3-R_k?e=FyRaZP',
              },
            ],
          },
          {
            title: 'Licence',
            items: [
              {
                label: 'MIT Licence',
                href: 'https://opensource.org/licenses/MIT',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} HEH, DST. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['Bash', 'Java'],
      },
    }),
};

export default config;
