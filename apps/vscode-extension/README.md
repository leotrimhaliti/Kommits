# Kommits VS Code Extension

AI-powered commit message suggestions with personality. Never write boring commit messages again!

## Features

- 🎯 **Auto-Suggestions**: Get intelligent commit message suggestions as you type
- 🎭 **Multiple Vibes**: Choose from different commit message styles
  - `professional` - Standard, maintainable commit messages
  - `passive-aggressive` - For those frustrating days
  - `hype` - Maximum energy commits
  - `chaos` - Embrace the entropy
  - `daily` - Consistent daily sync messages
- ⌨️ **Keyboard Navigation**: Arrow keys to browse, Enter to select
- 📅 **Daily Commit**: Get a deterministic commit message for the day
- ⚙️ **Configurable**: Customize default vibe and auto-suggest behavior

## Installation

### From Source (Development)

1. Clone the repository:
```bash
git clone https://github.com/leotrimhaliti/Kommits.git
cd Kommits/apps/vscode-extension
```

2. Install dependencies:
```bash
npm install
```

3. Compile the extension:
```bash
npm run compile
```

4. Press `F5` in VS Code to launch Extension Development Host

### From Marketplace (Coming Soon)

Search for "Kommits" in the VS Code Extensions marketplace.

## Usage

### Auto-Suggestions

1. Open a Git repository in VS Code
2. Start writing a commit message (Git commit file or SCM input)
3. Suggestions will automatically appear as you type
4. Use arrow keys to navigate, press Enter to select

### Manual Commands

- **Generate Message**: `Ctrl+Shift+P` → "Kommits: Generate Commit Message"
- **Change Vibe**: `Ctrl+Shift+P` → "Kommits: Set Vibe"
- **Daily Commit**: `Ctrl+Shift+P` → "Kommits: Insert Daily Commit"

## Configuration

Open VS Code Settings and search for "Kommits":

- `kommits.defaultVibe`: Set your preferred commit message style (default: `professional`)
- `kommits.autoSuggest`: Enable/disable automatic suggestions (default: `true`)

## Examples

**Professional:**
- "Refactor core logic for better maintainability"
- "Fix potential memory leak in worker"

**Hype:**
- "SHIP IT 🚀"
- "GAME CHANGER 🔥"

**Chaos:**
- "oops"
- "please work"

## Development

### Project Structure

```
vscode-extension/
├── src/
│   └── extension.ts      # Main extension logic
├── package.json          # Extension manifest
├── tsconfig.json         # TypeScript config
└── README.md            # This file
```

### Building

```bash
npm run compile
```

### Testing

Press `F5` in VS Code to launch the Extension Development Host.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT

## Links

- [GitHub Repository](https://github.com/leotrimhaliti/Kommits)
- [Web App](https://kommit.me)
