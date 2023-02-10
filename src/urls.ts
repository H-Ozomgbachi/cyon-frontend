export const frontendUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export const backendUrl =
  process.env.NODE_ENV === "development"
    ? "https://localhost:7271/api/v1"
    : "https://intranet.thehaulagehub.com/api/v1";
