import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, Content } from '@google/generative-ai';

// Using gemini-1.5-flash model for WattBot
export const GEMINI_MODEL = "gemini-1.5-flash";

// Initialize the Google Generative AI with the API key
let apiKey = 'AIzaSyDt9nQwhVtbHl3yYQDiXhWF4jENA0wg8h8';

// Create a function to set the API key from outside the module if needed
export const setGeminiApiKey = (key: string) => {
  apiKey = key;
};

// Create a function to get the Gemini API client
const getGeminiClient = () => {
  return new GoogleGenerativeAI(apiKey);
};

// Set up the safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Define the system prompt to guide Gemini's responses
const systemPrompt = 
`You are WattBot, an AI energy assistant designed to help users save energy, understand their bills, 
and get personalized tips for their home. You are friendly, helpful, and focused on providing 
practical energy-saving advice. Keep your responses concise but informative, with specific actionable tips.

Here's some context about the user:
- They live in India and use electricity primarily for home appliances
- Common appliances include AC, refrigerator, water heater, washing machine, and electronics
- Electricity is measured in kWh and billed in rupees (₹)
- The user is interested in saving energy and reducing their electricity bill
- In India, electricity tariffs are often tiered (higher rates for higher consumption)
- Average electricity rate in urban India is around ₹8-10 per kWh
- Peak summer temperatures can reach 40-45°C in many parts of India

Energy-saving knowledge to incorporate when relevant:
- ACs: Each degree below 24°C can increase energy consumption by 6%
- Refrigerators: Keeping them 75% full is optimal for efficiency
- Water heaters: Use for 30-45 minutes before bathing rather than keeping on all day
- Fans: Ceiling fans use about 60-80 watts and can reduce AC dependence
- Lighting: LED bulbs use 80% less energy than incandescent and 50% less than CFL
- Peak hours: In most Indian cities, 7-11 PM has highest electricity demand and rates

When providing advice, focus on practical tips that would work in an Indian context. Use specifics when possible, like actual temperature settings, timer recommendations, or estimated savings in rupees.`;

// Define a type for our application's chat history format
export type AppChatHistoryItem = { 
  role: 'user' | 'model';
  content: string;
};

// Convert our app format to Gemini format
const convertToGeminiHistory = (history: AppChatHistoryItem[]): Content[] => {
  return history.map(item => ({
    role: item.role === 'user' ? 'user' : 'model',
    parts: [{ text: item.content }]
  }));
};

/**
 * Generate a response from the Gemini AI model
 * 
 * @param userMessage - The user's message
 * @param chatHistory - Optional array of previous messages in app format
 * @returns A string response from Gemini
 */
export const generateGeminiResponse = async (
  userMessage: string, 
  chatHistory: AppChatHistoryItem[] = []
): Promise<string> => {
  try {
    const genAI = getGeminiClient();
    // For text-only input, use the gemini-pro model which has better free tier quota
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    
    // First let's set up the initial system prompt exchange
    const initialPromptHistory: Content[] = [
      { role: "user", parts: [{ text: "Please behave according to these instructions: " + systemPrompt }] },
      { role: "model", parts: [{ text: "I'll act as WattBot, your AI energy assistant. I'll provide concise, practical energy-saving advice tailored to the Indian context, focusing on home appliances like ACs, refrigerators, and water heaters. I'll keep my responses helpful and actionable, with specific tips to reduce electricity consumption and save money on bills. How can I help you save energy today?" }] }
    ];
    
    // Convert app chat history format to Gemini API format
    const geminiHistory = convertToGeminiHistory(chatHistory);
    
    // Start a chat session with proper history formatting
    const chat = model.startChat({
      safetySettings,
      history: [...initialPromptHistory, ...geminiHistory],
    });

    // Send the user message and get a response
    try {
      console.log('Sending message to Gemini:', userMessage);
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();
      console.log('Received response from Gemini:', text.substring(0, 100) + '...');
      return text;
    } catch (sendError) {
      console.error('Error in Gemini chat.sendMessage:', sendError);
      throw sendError; // Rethrow to be caught by the outer try/catch
    }
  } catch (error) {
    console.error('Error generating response from Gemini:', error);
    
    // Simple error handling without model fallback
    console.error('Error generating response from Gemini:', error);
    
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later or ask me something else about saving energy.";
  }
};

/**
 * Utility function to check if the Gemini API key is valid
 * 
 * @returns A promise that resolves to a boolean indicating if the API key is valid
 */
export const validateGeminiApiKey = async (): Promise<boolean> => {
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    
    // Try a simple request to validate the API key
    const result = await model.generateContent("Hello");
    const response = await result.response;
    return !!response.text();
  } catch (error) {
    console.error('Error validating Gemini API key:', error);
    return false;
  }
};