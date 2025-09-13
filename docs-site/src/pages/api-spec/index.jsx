import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

// We rely on Redoc standalone bundle from CDN for quick fallback.
const SPEC_URL = '/openapi/envoyou-api.yaml';
const REDOC_CDN = 'https://cdn.jsdelivr.net/npm/redoc@2.1.4/bundles/redoc.standalone.js';

export default function ApiSpecPage() {
  useEffect(() => {
    // Dynamically inject script only once
    if (!document.getElementById('redoc-cdn-script')) {
      const s = document.createElement('script');
      s.id = 'redoc-cdn-script';
      s.src = REDOC_CDN;
      s.onload = () => {
        if (window.Redoc) {
          window.Redoc.init(SPEC_URL, {
            theme: {
              colors: { primary: { main: '#0B5CCC' } },
              rightPanel: { backgroundColor: '#f8f9fb' }
            },
            hideDownloadButton: false,
            expandResponses: '200,201'
          }, document.getElementById('redoc-container'));
        }
      };
      document.body.appendChild(s);
    } else if (window.Redoc) {
      window.Redoc.init(SPEC_URL, {}, document.getElementById('redoc-container'));
    }
  }, []);

  return (
    <Layout title="API Spec" description="EnvoyOU OpenAPI Specification">
      <div style={{height: 'calc(100vh - 120px)', width: '100%', overflow: 'auto'}}>
        <div id="redoc-container" style={{height: '100%', padding: '0 0 2rem'}}>
          <p style={{padding: '2rem', textAlign: 'center'}}>Loading OpenAPI spec...</p>
        </div>
      </div>
    </Layout>
  );
}
