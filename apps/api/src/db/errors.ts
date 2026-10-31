const SQLSTATE = {
  exclusionViolation: "23P01",
  checkViolation: "23514",
} as const;

// Drizzle wraps driver errors in DrizzleQueryError; the Postgres error is in `cause`.
function sqlState(err: unknown): string | undefined {
  const pgError = err instanceof Error && err.cause ? err.cause : err;
  const code = (pgError as { code?: unknown } | null)?.code;
  return typeof code === "string" ? code : undefined;
}

export const isSlotTaken = (err: unknown) => sqlState(err) === SQLSTATE.exclusionViolation;
export const isInvalidRange = (err: unknown) => sqlState(err) === SQLSTATE.checkViolation;
