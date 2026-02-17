export const cleanEnvValue = (value) => {
  if (typeof value !== "string") return value;

  const trimmed = value.trim();
  // If someone saved env like "value" in dashboard, remove wrapper quotes.
  return trimmed.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
};

export const isProduction = () => cleanEnvValue(process.env.NODE_ENV) === "production";
