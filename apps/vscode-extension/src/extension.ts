import * as vscode from 'vscode';
import { MessageEngine, Vibe, VIBES } from '@kommits/engine';

/**
 * Current selected vibe for commit message generation
 */
let currentVibe: Vibe = 'professional';

/**
 * Activation function - called when extension is activated
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('Kommits extension is now active!');

    // Load saved vibe from configuration
    const config = vscode.workspace.getConfiguration('kommits');
    currentVibe = config.get('defaultVibe', 'professional') as Vibe;

    // Register completion provider for commit messages
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', pattern: '**/COMMIT_EDITMSG' },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                // Only provide suggestions if auto-suggest is enabled
                const autoSuggest = vscode.workspace.getConfiguration('kommits').get('autoSuggest', true);
                if (!autoSuggest) {
                    return undefined;
                }

                // Generate 5 commit message suggestions
                const suggestions: vscode.CompletionItem[] = [];
                for (let i = 0; i < 5; i++) {
                    const message = MessageEngine.generate(currentVibe);
                    const item = new vscode.CompletionItem(message, vscode.CompletionItemKind.Text);
                    item.insertText = message;
                    item.detail = `Kommits (${currentVibe})`;
                    item.documentation = new vscode.MarkdownString(`**Vibe:** ${currentVibe}\n\nPress Enter to use this commit message.`);
                    suggestions.push(item);
                }

                return suggestions;
            }
        }
    );

    // Command: Generate commit message manually
    const generateCommand = vscode.commands.registerCommand('kommits.generateMessage', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }

        // Generate a commit message
        const message = MessageEngine.generate(currentVibe);

        // Insert at cursor position
        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, message);
        });

        vscode.window.showInformationMessage(`Inserted commit message (${currentVibe})`);
    });

    // Command: Set vibe/mood
    const setVibeCommand = vscode.commands.registerCommand('kommits.setVibe', async () => {
        const selected = await vscode.window.showQuickPick(VIBES, {
            placeHolder: 'Select commit message vibe',
            title: 'Kommits - Choose Your Vibe'
        });

        if (selected) {
            currentVibe = selected as Vibe;
            vscode.window.showInformationMessage(`Vibe set to: ${currentVibe}`);
        }
    });

    // Command: Insert daily commit message
    const dailyCommitCommand = vscode.commands.registerCommand('kommits.dailyCommit', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }

        // Get the daily deterministic message
        const message = MessageEngine.getDailyMessage();

        // Insert at cursor position
        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, message);
        });

        vscode.window.showInformationMessage('Inserted daily commit message');
    });

    // Add all disposables to context
    context.subscriptions.push(
        completionProvider,
        generateCommand,
        setVibeCommand,
        dailyCommitCommand
    );
}

/**
 * Deactivation function - called when extension is deactivated
 */
export function deactivate() {
    console.log('Kommits extension deactivated');
}
