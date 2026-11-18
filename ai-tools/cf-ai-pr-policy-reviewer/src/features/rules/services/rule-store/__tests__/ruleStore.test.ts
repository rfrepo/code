import { describe, expect, it } from "vitest";
import { createTestSql } from "shared/testing/sqliteSql";
import { createRuleStore } from "features/rules/services/rule-store/ruleStore";

describe("createRuleStore", () => {
  it("should store a rule with an id and list it", () => {
    const store = createRuleStore(createTestSql());
    expect(store.add("No console.log in src/")).toEqual({
      ok: true,
      rule: { id: 1, text: "No console.log in src/" }
    });
    expect(store.list()).toEqual([{ id: 1, text: "No console.log in src/" }]);
  });

  it("should keep rules for a new store on the same database", () => {
    const sql = createTestSql();
    createRuleStore(sql).add("Every API route has a test");
    expect(createRuleStore(sql).list()).toEqual([
      { id: 1, text: "Every API route has a test" }
    ]);
  });

  it("should store nothing for a duplicate and say why", () => {
    const store = createRuleStore(createTestSql());
    store.add("No console.log in src/");
    expect(store.add("no console.log in src/ ")).toEqual({
      ok: false,
      reason: "That rule already exists as rule 1."
    });
    expect(store.list()).toHaveLength(1);
  });

  it("should remove a rule and report whether it existed", () => {
    const store = createRuleStore(createTestSql());
    store.add("A");
    store.add("B");
    expect(store.remove(1)).toBe(true);
    expect(store.remove(9)).toBe(false);
    expect(store.list()).toEqual([{ id: 2, text: "B" }]);
  });

  it("should keep a proposed check unused until it is approved", () => {
    const store = createRuleStore(createTestSql());
    store.add("No console.log in src/");
    const check = { paths: "src/**", pattern: "console\\.log\\(" };
    expect(store.proposeCheck(1, check)).toBe(true);
    expect(store.list()[0].check).toEqual({ ...check, approved: false });
    expect(store.approveCheck(1)).toBe(true);
    expect(store.list()[0].check).toEqual({ ...check, approved: true });
  });

  it("should drop a check, and refuse to approve or drop a check that does not exist", () => {
    const store = createRuleStore(createTestSql());
    store.add("A");
    expect(store.approveCheck(1)).toBe(false);
    store.proposeCheck(1, { paths: "src/**", pattern: "x" });
    expect(store.dropCheck(1)).toBe(true);
    expect(store.list()).toEqual([{ id: 1, text: "A" }]);
    expect(store.dropCheck(1)).toBe(false);
  });
});
