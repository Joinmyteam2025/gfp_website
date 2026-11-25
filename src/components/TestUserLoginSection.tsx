import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Button } from "./ui/button";

/**
 * Dev-only test login. Production builds strip this because `import.meta.env.DEV`
 * is statically false. Credentials are read from Vite env, never hardcoded.
 */
export function TestUserLoginSection() {
  const { signIn } = useAuthActions();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!import.meta.env.DEV) return null;

  async function onTestLogin() {
    const email = import.meta.env.VITE_TEST_USER_EMAIL?.trim();
    const password = import.meta.env.VITE_TEST_USER_PASSWORD?.trim();
    if (!email || !password) {
      throw new Error(
        "Missing required environment variable: VITE_TEST_USER_EMAIL and VITE_TEST_USER_PASSWORD",
      );
    }
    setError("");
    setLoading(true);
    try {
      await signIn("test", { email, password, flow: "signIn" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Test login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2 rounded-lg border border-dashed p-3">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={loading}
        onClick={() => {
          onTestLogin().catch(err => {
            setError(err instanceof Error ? err.message : "Test login failed");
          });
        }}
      >
        {loading ? "Signing in…" : "Continue as test user"}
      </Button>
      {error ? <p className="text-xs text-destructive text-center">{error}</p> : null}
    </div>
  );
}
