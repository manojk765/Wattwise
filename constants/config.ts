// Application configuration and environment variables

// Gemini API key - never expose this in client-side code in a production app
// In a real app, this should be stored in a secure environment variable
export const GEMINI_API_KEY =process.env.GEMINI_API_KEY;

// Application configuration
export const APP_CONFIG = {
  // Feature flags
  features: {
    enableGeminiAI: true, // Toggle Gemini AI integration
    useLocalFallback: true, // Use local responses if Gemini API fails
  },
  
  // AI Model configuration
  aiModels: {
    gemini: {
      modelName: 'gemini-1.5-pro',
      temperature: 0.7, // Higher values make output more random, lower more deterministic
      maxOutputTokens: 500, // Limit response length
    },
  },
};