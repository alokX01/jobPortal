export const pickAllowedFields = (payload = {}, allowedFields = []) => {
  const safePayload = {};

  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      safePayload[field] = payload[field];
    }
  }

  return safePayload;
};

export const toTrimmedString = (value) => {
  if (typeof value !== "string") {
    return value;
  }
  return value.trim();
};

export const splitCommaSeparated = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => `${item}`.trim()).filter(Boolean);
  }

  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};
