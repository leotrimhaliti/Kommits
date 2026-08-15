# Kommits

A commit message generator with personality — pick a vibe, get a message, ship it.

[![CI](https://github.com/leotrimhaliti/Kommits/actions/workflows/ci.yml/badge.svg)](https://github.com/leotrimhaliti/Kommits/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Live app:** [kommits.netlify.app](https://kommits.netlify.app/)

## What it does

Writing a decent commit message at the end of a long session is annoying. Kommits gives you five
"vibes" — professional, passive-aggressive, hype, chaos, and daily — and generates a message that
fits. Click to copy, paste into your commit, done.

There's also a **Daily Commit** mode: everyone gets the same message for the day, seeded off the
current date, as a small shared joke for whoever's shipping something small and needs an excuse.

## How it's built

This is an npm workspaces monorepo with the generation logic pulled out into its own package so it
can be reused by more than one frontend:

```
Kommits/
├── apps/
│   ├── web/                # Next.js app — the live site
│   └── vscode-extension/   # VS Code extension using the same engine
└── packages/
    └── engine/              # Framework-agnostic message generation logic
```

`packages/engine` is a pure TypeScript package with no UI dependencies. It exposes a
`MessageEngine` with a `generate(vibe, seed?)` method — pass a seed and you get a deterministic
result, which is what makes the Daily Commit mode reproducible for everyone on the same day. Both
`apps/web` and `apps/vscode-extension` depend on it as a workspace package, so the message logic
only lives in one place.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript
- **Tailwind CSS 4** + Radix UI primitives for the web app
- **Vitest** for the engine's unit tests
- **npm workspaces** for the monorepo
- **Docker** (multi-stage build, standalone Next.js output) for containerized deploys
- **GitHub Actions** for CI (install → test → lint → build on every push/PR)

## Getting started

```bash
# Install dependencies for every workspace
npm install

# Run the web app in dev mode
npm run dev --workspace=apps/web

# Build everything (engine first, then the apps that depend on it)
npm run build

# Run the engine's test suite
npm run test --workspace=packages/engine
```

## Running with Docker

The `Dockerfile` builds `apps/web` from the monorepo root so the `packages/engine` workspace
dependency resolves correctly:

```bash
docker build -t kommits-web .
docker run -p 3000:3000 kommits-web
```

## VS Code extension

`apps/vscode-extension` surfaces the same engine directly in the editor — generate a message, set
a default vibe, or insert the daily commit without leaving VS Code.

## License

[MIT](LICENSE)
