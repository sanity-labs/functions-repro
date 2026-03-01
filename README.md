# Functions Deploy Repro

Minimal reproduction for `npx sanity blueprints deploy` timing out during "Processing function assets".

Uses the same `skill` schema and delta GROQ filter as `sanity-labs/internal-skills` so you can test the trigger via Sanity MCP against project `vj3v4j95` (dataset `production`).

## Steps to reproduce

1. Clone this repo
2. `npm install`
3. `npx sanity blueprints init . --blueprint-type ts --project-id vj3v4j95 --stack-name repro`
4. `npx sanity blueprints deploy`

## Expected

Deploy completes. Publishing a skill in the Studio (or via MCP) triggers the function and logs the skill name.

## Actual

Deploy hangs at "Processing function assets" and times out after 60 seconds.

With `DEBUG=*`, the timeout occurs during the `@architect/hydrate` step that installs dependencies in the Vite/Rollup output directory. The build uses `external: [/node_modules/]` (dependencies are not bundled), then relies on hydration to install them — that hydration step is what times out.

## Testing the trigger (after deploy works)

Publish any skill document in project `vj3v4j95`:
- Via Studio: https://skills-studio.sanity.studio/
- Via MCP: patch a skill's `content` field and publish

The function should log the skill name and reference count.

## Environment

- Node 22
- macOS / Linux
- `@sanity/blueprints` 0.12.2
- `@sanity/functions` 1.2.0
