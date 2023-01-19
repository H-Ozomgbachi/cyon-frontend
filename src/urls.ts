export const frontendUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export const backendUrl =
  process.env.NODE_ENV === "development" ? "https://localhost:5001/api/v1" : "";
