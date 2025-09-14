import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

// We rely on Redoc standalone bundle from CDN for quick fallback.
const SPEC_URL = '/openapi/envoyou-api.yaml';
const REDOC_CDN = 'https://cdn.jsdelivr.net/npm/redoc@2.1.4/bundles/redoc.standalone.js';

// Theme palettes for Redoc (dark / light) kept minimal & in sync with custom.css tokens
const REDOC_THEMES = {
  dark: {
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
  },
  light: {
    colors: {
      primary: { main: '#2ECC71' },
      text: { primary: '#1b2733', secondary: '#445461' },
      http: { get: '#15803d', post: '#1d4ed8', put: '#b45309', delete: '#b91c1c' },
      border: { light: '#d8e0e6' }
    },
    typography: {
      fontSize: '14px', lineHeight: '1.55',
      headings: { fontWeight: '600', color: '#1b2733' },
      code: { backgroundColor: '#f3f5f7', color: '#1b2733', fontSize: '13px' },
      links: { color: '#2ECC71', visited: '#27AE60', hover: '#27AE60' }
    },
    rightPanel: { backgroundColor: '#ffffff', textColor: '#1b2733' },
    codeBlock: { backgroundColor: '#f3f5f7' },
    schema: { nestedBackground: '#f5f7fa' }
  }
};

export default function ApiSpecPage() {
  useEffect(() => {
    // Dynamically inject script only once
    function render() {
      if (window.Redoc) {
        const mode = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        window.Redoc.init(
          SPEC_URL,
          { theme: REDOC_THEMES[mode], hideDownloadButton: false, expandResponses: '200,201' },
          document.getElementById('redoc-container')
        );
      }
    }

    if (!document.getElementById('redoc-cdn-script')) {
      const s = document.createElement('script');
      s.id = 'redoc-cdn-script';
      s.src = REDOC_CDN;
      s.onload = () => {
        render();
      };
      document.body.appendChild(s);
    } else if (window.Redoc) {
      render();
    }
    // Observe theme changes to re-render Redoc with correct palette
    const obs = new MutationObserver((muts) => {
      if (muts.some(m => m.attributeName === 'data-theme')) {
        render();
      }
    });
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
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
