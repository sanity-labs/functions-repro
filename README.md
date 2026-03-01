# Functions Deploy Repro

Minimal reproduction for `npx sanity blueprints deploy` timing out during "Processing function assets".

Uses the same `skill` schema and delta GROQ filter as `sanity-labs/internal-skills` against project `vj3v4j95` (dataset `production`).

## Steps to reproduce

```bash
git clone git@github.com:sanity-labs/functions-repro.git
cd functions-repro
npm install

# Create the blueprint config (skip `init` — it conflicts with existing sanity.blueprint.ts)
mkdir -p .sanity
cat > .sanity/blueprint.config.json << 'EOF'
{
  "blueprintConfigVersion": "v2025-05-08",
  "projectId": "vj3v4j95",
  "stackId": "ST-yqcbmgmutk",
  "organizationId": "oSyH1iET5"
}
EOF

# Deploy
npx sanity blueprints deploy
```

## Expected

Deploy completes. Publishing a `skill` document triggers the function and logs the skill name.

## Actual

Deploy hangs at "Processing function assets" and times out after 60 seconds.

With `DEBUG=*`, the timeout occurs during the `@architect/hydrate` step that installs dependencies in the Vite/Rollup output directory. The build uses `external: [/node_modules/]` (dependencies are not bundled), then relies on hydration to install them — that hydration step is what times out.

## Environment

- Node 22
- macOS / Linux
- `@sanity/blueprints` 0.12.2
- `@sanity/functions` 1.2.0
