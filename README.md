# Kommits

A commit message generator with personality.

## Features

- **Multiple Vibes**: Generate commit messages in different styles
  - `professional` - Standard, maintainable commit messages
  - `passive-aggressive` - For those frustrating days
  - `hype` - Maximum energy commits
  - `chaos` - Embrace the entropy
  - `daily` - Consistent daily sync messages

- **Web Interface**: Interactive UI to generate and copy commit messages
- **Shared Engine**: Reusable TypeScript library for message generation

## Project Structure

```
commitlol/
├── apps/web/          # Next.js web application
└── packages/engine/   # Core message generation library
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build all packages
npm run build
```

## Usage

Visit the web app and select your preferred vibe to generate commit messages. Copy and use them in your git workflow.

## Tech Stack

- **Next.js** - Web framework
- **TypeScript** - Type safety
- **npm workspaces** - Monorepo management
