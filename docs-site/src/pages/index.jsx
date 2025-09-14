import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout title="Envoyou Docs" description="Envoyou API & Platform Documentation">
      <main style={{maxWidth: 820, margin: '0 auto', padding: '3rem 1.25rem'}}>
        <h1>Envoyou Documentation</h1>
        <p>Welcome to the Envoyou documentation portal. Jump into the core resources below:</p>
        <ul>
          <li><Link to="/docs/introduction">Platform Introduction</Link></li>
          <li><Link to="/api-spec/">OpenAPI Specification</Link></li>
          <li><Link to="/docs/guides/user-applications">Application Patterns</Link></li>
        </ul>
        <p>Looking for real-time interactive testing? Visit <a href="https://api.envoyou.com/docs" target="_blank" rel="noreferrer">Interactive API Console</a>.</p>
      </main>
    </Layout>
  );
}
