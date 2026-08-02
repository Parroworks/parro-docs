import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

export default function ApiReference() {
  useEffect(() => {
    // Load Swagger UI CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui.css';
    document.head.appendChild(link);

    // Load Swagger UI JS then init
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-bundle.js';
    script.onload = () => {
      window.SwaggerUIBundle({
        url: 'https://web-production-a0717.up.railway.app/openapi.json',
        dom_id: '#swagger-ui',
        presets: [
          window.SwaggerUIBundle.presets.apis,
          window.SwaggerUIBundle.SwaggerUIStandalonePreset,
        ],
        layout: 'BaseLayout',
        deepLinking: true,
        defaultModelsExpandDepth: 0,
        displayRequestDuration: true,
        filter: true,
        tryItOutEnabled: false,
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <Layout title="API Reference" description="Interactive API reference for Parro Connect">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div id="swagger-ui" />
      </div>
    </Layout>
  );
}
