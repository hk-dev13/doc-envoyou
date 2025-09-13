// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Introduction',
      items: [ 'introduction', 'getting-started' ]
    },
    {
      type: 'category',
      label: 'Authentication',
      items: [ 'api/authentication' ]
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [ 'api/api-reference' ]
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/error-handling',
        'guides/error-catalog',
        'guides/rate-limiting',
        'guides/observability',
        'guides/pagination',
        'guides/webhooks',
        'guides/sdks-libraries',
        'guides/user-applications'
      ]
    },
    {
      type: 'category',
      label: 'Data Model',
      items: [ 'data-model/overview' ]
    },
    {
      type: 'category',
      label: 'Resources',
      items: [ 'faq', 'changelog', 'style-guide', 'contributing-docs' ]
    }
  ]
};
export default sidebars;
