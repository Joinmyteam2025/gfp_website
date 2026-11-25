import { createAccount, retrieveAccount } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { Scrypt } from "lucia";
import { internalAction } from "./_generated/server";
import { requireEnv } from "./requireEnv";

declare const process: { env: Record<string, string | undefined> };

export const seedTestUser = internalAction({
  args: {},
  returns: v.object({
    success: v.boolean(),
    message: v.string(),
  }),
  handler: async ctx => {
    const email = requireEnv("TEST_USER_EMAIL");
    const password = requireEnv("TEST_USER_PASSWORD");
    const name = process.env.TEST_USER_NAME?.trim() || "Test Agent";

    try {
      await retrieveAccount(ctx, {
        provider: "test",
        account: { id: email },
      });
      return { success: true, message: "Test user already exists" };
    } catch {
      // User doesn't exist, create them
    }

    try {
      const hashedPassword = await new Scrypt().hash(password);
      await createAccount(ctx, {
        provider: "test",
        account: {
          id: email,
          secret: hashedPassword,
        },
        profile: {
          email,
          name,
          emailVerificationTime: Date.now(),
        },
        shouldLinkViaEmail: false,
      });
      return { success: true, message: "Test user created successfully" };
    } catch (error) {
      return {
        success: false,
        message: `Failed to create test user: ${error}`,
      };
    }
  },
});
