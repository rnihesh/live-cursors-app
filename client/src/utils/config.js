// Determine if we're in development mode
const isDevelopment = import.meta.env.MODE === "development";

// Get the base URL based on environment
export const getBaseUrl = () => {
  return isDevelopment ? "ws://localhost:8000" : "wss://nihesh-cursors.onrender.com"; // Backend URL on Render
};
