import seedrandom from 'seedrandom';

export type Vibe = 'professional' | 'passive-aggressive' | 'hype' | 'chaos' | 'daily';

export const VIBES: Vibe[] = ['professional', 'passive-aggressive', 'hype', 'chaos', 'daily'];

const TEMPLATES: Record<Vibe, string[]> = {
    professional: [
        "Refactor core logic for better maintainability",
        "Update dependencies to latest versions",
        "Fix potential memory leak in worker",
        "Optimize database query performance",
        "Add unit tests for new feature",
        "Improve error handling in API",
        "Documentation updates",
        "Remove unused code",
        "Standardize code formatting",
        "Implement requested changes from review"
    ],
    'passive-aggressive': [
        "Fix the bug that wasn't mine",
        "Here, I fixed it for you",
        "I don't know why this works but it does",
        "Reverting the changes that broke everything",
        "This is the last time I touch this file",
        "Commit before I lose my mind",
        "Whatever, it compiles",
        "Addressing the tech debt we ignored",
        "Make the linter happy",
        "Another day, another hack"
    ],
    hype: [
        "SHIP IT 🚀",
        "GAME CHANGER 🔥",
        "TO THE MOON 🌕",
        "ABSOLUTE BANGER OF A COMMIT",
        "LEGENDARY FIX 🏆",
        "MAXIMUM VELOCITY 🏎️",
        "CRUSHING BUGS LIKE A BOSS",
        "DEPLOYING AWESOMENESS",
        "LFG!!!!!",
        "10X ENGINEER MODE ACTIVATED"
    ],
    chaos: [
        "oops",
        "yolo",
        "stuff",
        "fixed thing",
        "wip",
        "temp fix",
        "remove console.log",
        "asdf",
        "please work",
        "final final v2"
    ],
    daily: [
        "Daily Sync: Progress on core features",
        "Daily Sync: Bug fixes and stability improvements",
        "Daily Sync: Refactoring and optimization",
        "Daily Sync: Documentation and cleanup",
        "Daily Sync: Preparing for release"
    ]
};

export class MessageEngine {
    static generate(vibe: Vibe = 'professional', seed?: string): string {
        const templates = TEMPLATES[vibe];
        if (!templates || templates.length === 0) {
            return "Initial commit";
        }

        const rng = seed ? seedrandom(seed) : Math.random;
        const index = Math.floor(rng() * templates.length);
        return templates[index];
    }

    static getDailyMessage(): string {
        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        return this.generate('daily', date);
    }
}
