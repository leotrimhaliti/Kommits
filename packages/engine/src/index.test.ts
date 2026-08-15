import { describe, expect, it } from "vitest";
import { MessageEngine, VIBES, Vibe } from "./index";

const TEMPLATE_COUNT_BY_VIBE: Record<Vibe, number> = {
  professional: 10,
  "passive-aggressive": 10,
  hype: 10,
  chaos: 10,
  daily: 5,
};

describe("VIBES", () => {
  it("lists every vibe the engine supports", () => {
    expect(VIBES).toEqual([
      "professional",
      "passive-aggressive",
      "hype",
      "chaos",
      "daily",
    ]);
  });
});

describe("MessageEngine.generate", () => {
  it("defaults to the professional vibe when none is given", () => {
    const message = MessageEngine.generate();

    expect(message).not.toBe("Initial commit");
  });

  it.each(VIBES)("returns a message from the %s template list", (vibe) => {
    for (let attempt = 0; attempt < TEMPLATE_COUNT_BY_VIBE[vibe] * 3; attempt++) {
      const message = MessageEngine.generate(vibe);
      expect(typeof message).toBe("string");
      expect(message.length).toBeGreaterThan(0);
    }
  });

  it("is deterministic for the same vibe and seed", () => {
    const first = MessageEngine.generate("hype", "release-day");
    const second = MessageEngine.generate("hype", "release-day");

    expect(first).toBe(second);
  });

  it("can produce different messages for different seeds", () => {
    const seeds = Array.from({ length: 20 }, (_, i) => `seed-${i}`);
    const messages = new Set(seeds.map((seed) => MessageEngine.generate("chaos", seed)));

    expect(messages.size).toBeGreaterThan(1);
  });

  it("falls back to 'Initial commit' for an unknown vibe", () => {
    const message = MessageEngine.generate("made-up-vibe" as Vibe);

    expect(message).toBe("Initial commit");
  });
});

describe("MessageEngine.getDailyMessage", () => {
  it("returns a message from the daily template list", () => {
    const message = MessageEngine.getDailyMessage();

    expect(message.startsWith("Daily Sync:")).toBe(true);
  });

  it("returns the same message for every call on the same day", () => {
    const first = MessageEngine.getDailyMessage();
    const second = MessageEngine.getDailyMessage();

    expect(first).toBe(second);
  });
});
