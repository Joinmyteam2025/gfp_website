function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const TEST_USER = {
  get email() {
    return requiredEnv("TEST_USER_EMAIL");
  },
  get password() {
    return requiredEnv("TEST_USER_PASSWORD");
  },
  name: "Test Agent",
};
