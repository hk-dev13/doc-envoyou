# OpenAPI Integration Plan

## Current State
No OpenAPI/Swagger spec detected in `api-envoyou` repository (search returned no framework-specific markers). Spec needs to be authored manually or generated from code (if framework later supports it).

## Phase 1 (Manual Spec Skeleton)
Create `openapi/envoyou-api.yaml` (outside docs) with high-level paths:
- `/auth/token`
- `/stations`
- `/measurements`
- `/regions`
- `/emissions`

## Phase 2 (Docusaurus Integration)
Option A: `redocusaurus` plugin for interactive rendering.
Option B: `docusaurus-plugin-openapi-docs` -> generate MD -> commit.

Chosen Initial: Option A (faster to bootstrap).

## redocusaurus Setup (Planned)

1. Install dependencies:

```bash
npm install --save @docusaurus/plugin-content-docs @docusaurus/preset-classic redocusaurus
```
1. Create `openapi/envoyou-api.yaml`.
1. Add to `docusaurus.config.js`:

    ```js
    presets: [/* existing */],
    plugins: [
    [
        'redocusaurus',
        {
        specs: [
            { id: 'core-api', spec: 'openapi/envoyou-api.yaml', route: '/api-spec/' }
        ],
        theme: { primaryColor: '#0B5CCC' }
        }
    ]
    ]
    ```
1. Add sidebar link under API Reference pointing to `/api-spec/`.

## Phase 3 (Automation)

Add script:
```text
#!/usr/bin/env bash
set -euo pipefail
npx swagger-cli validate openapi/envoyou-api.yaml
cp openapi/envoyou-api.yaml app-envoyou/docs/static/ # if needed
```
Optional GitHub Action: validate spec on PR.

## Phase 4 (Future)
- Generate client SDK (TypeScript) using `openapi-typescript`.
- Autopublish versioned API docs.

---
Last updated: 2025-09-15
