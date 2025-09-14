import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

// We rely on Redoc standalone bundle from CDN for quick fallback.
const SPEC_URL = '/openapi/envoyou-api.yaml';
const REDOC_CDN = 'https://cdn.jsdelivr.net/npm/redoc@2.1.4/bundles/redoc.standalone.js';

// Dark theme palette only (light mode removed)
const REDOC_THEME = {
  colors: {
    primary: { main: '#2ECC71' },
    text: { primary: '#e2e8f0', secondary: '#b6c2cc' },
    http: { get: '#2ECC71', post: '#0B5CCC', put: '#f59e0b', delete: '#ef4444' },
    border: { light: '#1e2b35' }
  },
  typography: {
    fontSize: '14px', lineHeight: '1.55',
    headings: { fontWeight: '600', color: '#ffffff' },
    code: { backgroundColor: '#111b24', color: '#f8fafc', fontSize: '13px' },
    links: { color: '#2ECC71', visited: '#27AE60', hover: '#27AE60' }
  },
  rightPanel: { backgroundColor: '#0f1720', textColor: '#e2e8f0' },
  codeBlock: { backgroundColor: '#111b24' },
  schema: { nestedBackground: '#0f1720' }
};

export default function ApiSpecPage() {
  useEffect(() => {
    function render() {
      if (window.Redoc) {
        const mountEl = document.getElementById('redoc-container');
        if (mountEl) {
          mountEl.innerHTML = '<p style="padding:2rem;text-align:center;">Loading OpenAPI spec...</p>';
          window.Redoc.init(
            SPEC_URL,
            { theme: REDOC_THEME, hideDownloadButton: false, expandResponses: '200,201' },
            mountEl
          );
        }
      }
    }

    if (!document.getElementById('redoc-cdn-script')) {
      const s = document.createElement('script');
      s.id = 'redoc-cdn-script';
      s.src = REDOC_CDN;
      s.onload = () => { render(); };
      document.body.appendChild(s);
    } else if (window.Redoc) {
      render();
    }

    return () => {};
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
