import { describe, expect, it } from "vitest";
import { loadSessionName } from "features/chat/services/session-name/sessionName";

const memoryStorage = (): Pick<Storage, "getItem" | "setItem"> => {
  const items = new Map<string, string>();
  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => void items.set(key, value)
  };
};

describe("loadSessionName", () => {
  it("should create a name on first use and keep it", () => {
    const storage = memoryStorage();
    expect(loadSessionName(storage, () => "abc")).toBe("abc");
    expect(loadSessionName(storage, () => "other")).toBe("abc");
  });

  it("should give separate browsers separate names", () => {
    expect(loadSessionName(memoryStorage(), () => "one")).toBe("one");
    expect(loadSessionName(memoryStorage(), () => "two")).toBe("two");
  });
});
