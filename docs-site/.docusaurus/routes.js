import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'e65'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '465'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'c69'),
            routes: [
              {
                path: '/docs/api-reference',
                component: ComponentCreator('/docs/api-reference', 'deb'),
                exact: true
              },
              {
                path: '/docs/api/api-reference',
                component: ComponentCreator('/docs/api/api-reference', 'b64'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/authentication',
                component: ComponentCreator('/docs/api/authentication', 'db7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/openapi-plan',
                component: ComponentCreator('/docs/api/openapi-plan', '08a'),
                exact: true
              },
              {
                path: '/docs/automation-plan',
                component: ComponentCreator('/docs/automation-plan', 'b95'),
                exact: true
              },
              {
                path: '/docs/changelog',
                component: ComponentCreator('/docs/changelog', '048'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/contributing-docs',
                component: ComponentCreator('/docs/contributing-docs', 'd97'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/data-model/overview',
                component: ComponentCreator('/docs/data-model/overview', '614'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/faq',
                component: ComponentCreator('/docs/faq', '0ec'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started',
                component: ComponentCreator('/docs/getting-started', 'db2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/guides/',
                component: ComponentCreator('/docs/guides/', '419'),
                exact: true
              },
              {
                path: '/docs/guides/error-catalog',
                component: ComponentCreator('/docs/guides/error-catalog', '8c6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/guides/error-handling',
                component: ComponentCreator('/docs/guides/error-handling', 'c60'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/guides/observability',
                component: ComponentCreator('/docs/guides/observability', 'a2f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/guides/pagination',
                component: ComponentCreator('/docs/guides/pagination', '38c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/guides/rate-limiting',
                component: ComponentCreator('/docs/guides/rate-limiting', '8a9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/guides/sdks-libraries',
                component: ComponentCreator('/docs/guides/sdks-libraries', '2d9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/guides/supabase-integration',
                component: ComponentCreator('/docs/guides/supabase-integration', 'e02'),
                exact: true
              },
              {
                path: '/docs/guides/user-applications',
                component: ComponentCreator('/docs/guides/user-applications', 'deb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/guides/webhooks',
                component: ComponentCreator('/docs/guides/webhooks', '972'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '784'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/introduction',
                component: ComponentCreator('/docs/introduction', '05a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/markdown-lint-cleanup-plan',
                component: ComponentCreator('/docs/markdown-lint-cleanup-plan', '1cf'),
                exact: true
              },
              {
                path: '/docs/markdown-ops',
                component: ComponentCreator('/docs/markdown-ops', '1d5'),
                exact: true
              },
              {
                path: '/docs/migration-map',
                component: ComponentCreator('/docs/migration-map', 'ea4'),
                exact: true
              },
              {
                path: '/docs/README-Docs',
                component: ComponentCreator('/docs/README-Docs', '6ea'),
                exact: true
              },
              {
                path: '/docs/redirect-plan',
                component: ComponentCreator('/docs/redirect-plan', '0b4'),
                exact: true
              },
              {
                path: '/docs/style-guide',
                component: ComponentCreator('/docs/style-guide', '0fa'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '070'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
