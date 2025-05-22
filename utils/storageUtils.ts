import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppChatHistoryItem } from '@/services/geminiService';

// Storage keys
const STORAGE_KEYS = {
  CHAT_HISTORY: '@WattBot:chatHistory',
  USER_PREFERENCES: '@WattBot:userPreferences',
  LAST_CONVERSATION: '@WattBot:lastConversation',
};

// Interface for chat messages in the app
export interface ChatMessage {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: Date;
}

/**
 * Save chat history to AsyncStorage
 * @param chatHistory Array of chat messages
 */
export const saveChatHistory = async (chatHistory: ChatMessage[]): Promise<void> => {
  try {
    // Convert Date objects to strings for storage
    const serializedHistory = chatHistory.map(msg => ({
      ...msg,
      timestamp: msg.timestamp.toISOString(),
    }));
    
    await AsyncStorage.setItem(
      STORAGE_KEYS.CHAT_HISTORY,
      JSON.stringify(serializedHistory)
    );
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

/**
 * Load chat history from AsyncStorage
 * @returns Array of chat messages or null if none found
 */
export const loadChatHistory = async (): Promise<ChatMessage[] | null> => {
  try {
    const storedHistory = await AsyncStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    
    if (!storedHistory) {
      return null;
    }
    
    // Parse the stored history and convert string timestamps back to Date objects
    const parsedHistory = JSON.parse(storedHistory);
    return parsedHistory.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  } catch (error) {
    console.error('Error loading chat history:', error);
    return null;
  }
};

/**
 * Save AI chat history (used for Gemini context)
 * @param chatHistory Array of AI chat messages
 */
export const saveAIChatHistory = async (chatHistory: AppChatHistoryItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.LAST_CONVERSATION,
      JSON.stringify(chatHistory)
    );
  } catch (error) {
    console.error('Error saving AI chat history:', error);
  }
};

/**
 * Load AI chat history from AsyncStorage
 * @returns Array of AI chat messages or empty array if none found
 */
export const loadAIChatHistory = async (): Promise<AppChatHistoryItem[]> => {
  try {
    const storedHistory = await AsyncStorage.getItem(STORAGE_KEYS.LAST_CONVERSATION);
    
    if (!storedHistory) {
      return [];
    }
    
    return JSON.parse(storedHistory);
  } catch (error) {
    console.error('Error loading AI chat history:', error);
    return [];
  }
};

/**
 * Clear all chat history
 */
export const clearChatHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.CHAT_HISTORY,
      STORAGE_KEYS.LAST_CONVERSATION,
    ]);
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
};