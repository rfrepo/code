const STORAGE_KEY = "pr-policy-reviewer:session";

/**
 * The agent instance this browser talks to. Without a name every visitor joins the
 * "default" instance and shares its rules and reviews.
 */
export function loadSessionName(
  storage: Pick<Storage, "getItem" | "setItem">,
  createName: () => string = () => crypto.randomUUID()
): string {
  const saved = storage.getItem(STORAGE_KEY);
  if (saved) return saved;
  const name = createName();
  storage.setItem(STORAGE_KEY, name);
  return name;
}
