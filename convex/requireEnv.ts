declare const process: { env: Record<string, string | undefined> };

/** Read a required secret or config value. Never falls back to a hardcoded secret. */
export function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
