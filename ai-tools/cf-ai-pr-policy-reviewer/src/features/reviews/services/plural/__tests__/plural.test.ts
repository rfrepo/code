import { describe, expect, it } from "vitest";
import { plural } from "features/reviews/services/plural/plural";

describe("plural", () => {
  it("should keep the word singular for one", () => {
    expect(plural(1, "rule")).toBe("1 rule");
  });

  it("should add an s for any other count", () => {
    expect(plural(0, "rule")).toBe("0 rules");
    expect(plural(2, "added line")).toBe("2 added lines");
  });
});
