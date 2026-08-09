/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Backend',
      items: [
        'backend/architecture',
        'backend/whatsapp-flow',
        'backend/lab-ocr',
        'backend/appointments',
        'backend/pharmacy',
        'backend/api-reference',
      ],
    },
    {
      type: 'category',
      label: 'Frontend',
      items: [
        'frontend/overview',
        'frontend/dashboard',
        'frontend/lab-reports',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/whatsapp-providers',
        'integrations/whatsapp-templates',
        'integrations/google-vision',
        'integrations/supabase',
      ],
    },
    {
      type: 'category',
      label: 'Deployment',
      items: [
        'deployment/environment-variables',
        'deployment/railway',
        'deployment/vercel',
      ],
    },
  ],
};

module.exports = sidebars;
