import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateDummyUsageData, generateDummyLeaderboardData } from '@/utils/dummyData';
import { useAuth } from './AuthContext';
import { 
  Appliance, 
  DailyUsage,
  getUserAppliances, 
  addAppliance, 
  updateAppliance, 
  deleteAppliance,
  calculateApplianceMetrics,
  addDailyUsage,
  getUserDailyUsage
} from '@/utils/applianceUtils';
import { generateGeminiResponse, AppChatHistoryItem } from '@/services/geminiService';
import { loadAIChatHistory, saveAIChatHistory } from '@/utils/storageUtils';

interface AddDailyUsageInput {
  applianceId: string;
  hoursUsed: number;
  wattage: number;
}

interface DataContextType {
  appliances: Appliance[];
  dailyUsage: DailyUsage[];
  addNewAppliance: (appliance: Omit<Appliance, 'id'>) => Promise<void>;
  updateExistingAppliance: (id: string, updates: Partial<Appliance>) => Promise<void>;
  removeAppliance: (id: string) => Promise<void>;
  addDailyUsageEntry: (usage: AddDailyUsageInput) => Promise<void>;
  getTodayUsage: () => any;
  getMonthlyUsage: () => any;
  getSavingTips: () => any[];
  getUsageData: (period: string, unit: string) => any[];
  getWattBotResponse: (message: string) => Promise<string>;
  getLeaderboard: (scope: string) => any[];
}

const DataContext = createContext<DataContextType>({
  appliances: [],
  dailyUsage: [],
  addNewAppliance: async () => {},
  updateExistingAppliance: async () => {},
  removeAppliance: async () => {},
  addDailyUsageEntry: async () => {},
  getTodayUsage: () => ({}),
  getMonthlyUsage: () => ({}),
  getSavingTips: () => [],
  getUsageData: () => [],
  getWattBotResponse: async () => '',
  getLeaderboard: () => [],
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [dailyUsage, setDailyUsage] = useState<DailyUsage[]>([]);

  // Load user's appliances and daily usage when user changes
  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      setAppliances([]);
      setDailyUsage([]);
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    try {
      console.log('Loading data for user ID:', user.id);
      const [userAppliances, userDailyUsage] = await Promise.all([
        getUserAppliances(user.id),
        getUserDailyUsage(user.id, getStartOfMonth(), getEndOfMonth())
      ]);
      console.log('Fetched appliances:', userAppliances);
      setAppliances(userAppliances);
      setDailyUsage(userDailyUsage);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const addNewAppliance = async (appliance: Omit<Appliance, 'id'>) => {
    if (!user) throw new Error('User not authenticated');
    try {
      const newAppliance = await addAppliance(appliance, user.id);
      setAppliances(prev => [...prev, newAppliance]);
    } catch (error) {
      console.error('Error adding appliance:', error);
      throw error;
    }
  };

  const updateExistingAppliance = async (id: string, updates: Partial<Appliance>) => {
    try {
      await updateAppliance(id, updates);
      setAppliances(prev => 
        prev.map(app => app.id === id ? { ...app, ...updates } : app)
      );
    } catch (error) {
      console.error('Error updating appliance:', error);
      throw error;
    }
  };

  const removeAppliance = async (id: string) => {
    try {
      await deleteAppliance(id);
      setAppliances(prev => prev.filter(app => app.id !== id));
    } catch (error) {
      console.error('Error removing appliance:', error);
      throw error;
    }
  };

  const addDailyUsageEntry = async (usage: { applianceId: string; hoursUsed: number; wattage: number }) => {
    if (!user) throw new Error('User not authenticated');
    try {
      const newUsage = await addDailyUsage({
        ...usage,
        userId: user.id,
        date: new Date().toISOString().split('T')[0]
      });
      setDailyUsage(prev => [newUsage, ...prev]);
    } catch (error) {
      console.error('Error adding daily usage:', error);
      throw error;
    }
  };

  const getTodayUsage = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayUsage = dailyUsage.filter(usage => usage.date === today);
    
    return todayUsage.reduce((total, usage) => ({
      kwh: total.kwh + usage.kwh,
      cost: total.cost + usage.cost,
      co2: total.co2 + usage.co2,
    }), { kwh: 0, cost: 0, co2: 0 });
  };

  const getMonthlyUsage = () => {
    const monthlyUsage = dailyUsage.reduce((total, usage) => ({
      kwh: total.kwh + usage.kwh,
      cost: total.cost + usage.cost,
      co2: total.co2 + usage.co2,
    }), { kwh: 0, cost: 0, co2: 0 });

    const previousMonth = monthlyUsage.kwh * 1.1; // Example: 10% higher than current
    const percentChange = -10;

    return {
      total: monthlyUsage.kwh,
      cost: monthlyUsage.cost,
      co2: monthlyUsage.co2,
      previousMonth,
      percentChange,
    };
  };
  
  const getSavingTips = () => {
    return [
      {
        id: '1',
        title: 'Optimize AC Temperature',
        description: 'Increase your AC temperature by 1°C to save up to 6% on your cooling energy costs.',
        potentialSavings: '₹150/month',
        category: 'cooling',
      },
      {
        id: '2',
        title: 'Unplug Idle Electronics',
        description: 'Unplug electronics when not in use to eliminate phantom energy usage.',
        potentialSavings: '₹80/month',
        category: 'electronics',
      },
      {
        id: '3',
        title: 'Switch to LED Lighting',
        description: 'Replace all regular bulbs with LED alternatives to save up to 80% on lighting costs.',
        potentialSavings: '₹120/month',
        category: 'lighting',
      },
      {
        id: '4',
        title: 'Wash Full Loads Only',
        description: 'Only run your washing machine with full loads and use cold water when possible.',
        potentialSavings: '₹90/month',
        category: 'laundry',
      },
      {
        id: '5',
        title: 'Use Smart Power Strips',
        description: 'Group electronics on smart power strips to easily turn everything off when not in use.',
        potentialSavings: '₹70/month',
        category: 'electronics',
      },
    ];
  };
  
  const getUsageData = (period: string, unit: string) => {
    return generateDummyUsageData(period, unit);
  };
  
  const getWattBotResponse = async (message: string): Promise<string> => {
    try {
      // Load chat history from storage
      const chatHistory = await loadAIChatHistory();
      
      // Convert chat history to Gemini format
      const geminiHistory: AppChatHistoryItem[] = chatHistory.map(msg => ({
        role: msg.isBot ? 'model' : 'user',
        content: msg.message
      }));
      
      // Get response from Gemini
      const response = await generateGeminiResponse(message, geminiHistory);
      
      // Save the new exchange to chat history
      const newHistory = [
        ...chatHistory,
        { id: Date.now().toString(), message, isBot: false, timestamp: new Date() },
        { id: (Date.now() + 1).toString(), message: response, isBot: true, timestamp: new Date() }
      ];
      await saveAIChatHistory(newHistory);
      
      return response;
    } catch (error) {
      console.error('Error getting WattBot response:', error);
      
      // Fallback responses if Gemini fails
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('save') && lowerMessage.includes('energy')) {
        return "Here are 3 personalized tips to save energy:\n\n1. Your refrigerator uses about 15% of your total consumption. Make sure it's not set too cold (optimal is 3-4°C).\n\n2. Based on your usage patterns, shifting your laundry to off-peak hours could save you ₹120 per month.\n\n3. Your evening energy spike is mostly from lighting. Consider smart LED bulbs that you can control remotely.";
      }
      
      if (lowerMessage.includes('bill') && (lowerMessage.includes('high') || lowerMessage.includes('reduce'))) {
        return "I analyzed your recent bill of ₹940 and found it's 12% higher than seasonal average. The increase appears to be from your AC usage, which increased 30% during the recent heat wave. Try setting your AC to 24°C instead of 22°C, which could save up to ₹180 next month.";
      }
      
      if (lowerMessage.includes('appliance') && lowerMessage.includes('consuming')) {
        return "Based on your home's data, your top energy consumers are:\n\n1. Air Conditioner: 38% (₹357/month)\n2. Refrigerator: 15% (₹141/month)\n3. Water Heater: 12% (₹113/month)\n\nYour AC is using more energy than typical for its size. Consider having it serviced, as it might need refrigerant or have a dirty filter.";
      }
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! I'm WattBot, your AI energy assistant. I can help you save energy, understand your bills, get personalized tips, track your appliances, and more. What would you like help with today?";
      }
      
      return "I'm looking at your energy data and have some insights. Your usage is currently 8.4 kWh today, which is 12% lower than your daily average. Great job! Is there something specific about your energy usage you'd like to know?";
    }
  };
  
  const getLeaderboard = (scope: string) => {
    return generateDummyLeaderboardData(scope);
  };
  
  return (
    <DataContext.Provider 
      value={{ 
        appliances,
        dailyUsage,
        addNewAppliance,
        updateExistingAppliance,
        removeAppliance,
        addDailyUsageEntry,
        getTodayUsage, 
        getMonthlyUsage, 
        getSavingTips, 
        getUsageData,
        getWattBotResponse,
        getLeaderboard,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Helper functions
const getStartOfMonth = () => {
  const date = new Date();
  date.setDate(1);
  return date.toISOString().split('T')[0];
};

const getEndOfMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date.toISOString().split('T')[0];
};