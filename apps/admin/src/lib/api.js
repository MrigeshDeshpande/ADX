const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export const API = rawApiUrl.startsWith("http") ? rawApiUrl : `https://${rawApiUrl}`;
