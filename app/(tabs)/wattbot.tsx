import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Send, Bot, ArrowDown, Sparkles, AlertCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
import { APP_CONFIG } from '@/constants/config';
import { validateGeminiApiKey } from '@/services/geminiService';
import ChatBubble from '@/components/ChatBubble';
import Header from '@/components/Header';
import { loadChatHistory, saveChatHistory, loadAIChatHistory, saveAIChatHistory, clearChatHistory } from '@/utils/storageUtils';

interface ChatMessage {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: Date;
}

export default function WattBotScreen() {
  const { theme } = useTheme();
  const { getWattBotResponse } = useData();
  const isDark = theme === 'dark';
  const flatListRef = useRef<FlatList<ChatMessage>>(null);
  
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isGeminiAvailable, setIsGeminiAvailable] = useState<boolean>(false);
  const [usingGemini, setUsingGemini] = useState(false);
  
  // Load chat history and validate Gemini API on component mount
  useEffect(() => {
    const initializeWattBot = async () => {
      // Check Gemini API availability
      if (APP_CONFIG.features.enableGeminiAI) {
        try {
          const isValid = await validateGeminiApiKey();
          setIsGeminiAvailable(isValid);
        } catch (error) {
          console.error('Error validating Gemini API:', error);
          setIsGeminiAvailable(false);
        }
      }
      
      // Load saved chat history
      try {
        const savedHistory = await loadChatHistory();
        if (savedHistory && savedHistory.length > 0) {
          setChatHistory(savedHistory);
        } else {
          // Set default welcome message if no history exists
          setChatHistory([
            {
              id: '1',
              message: "Hi there! 👋 I'm WattBot, your AI energy assistant. How can I help you save energy today?",
              isBot: true,
              timestamp: new Date(),
            }
          ]);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
        // Set default welcome message if loading fails
        setChatHistory([
          {
            id: '1',
            message: "Hi there! 👋 I'm WattBot, your AI energy assistant. How can I help you save energy today?",
            isBot: true,
            timestamp: new Date(),
          }
        ]);
      }
    };
    
    initializeWattBot();
  }, []);
  
  // Save chat history whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      saveChatHistory(chatHistory);
    }
  }, [chatHistory]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      isBot: false,
      timestamp: new Date(),
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    setUsingGemini(APP_CONFIG.features.enableGeminiAI && isGeminiAvailable);
    
    try {
      const response = await getWattBotResponse(message.trim());
      
      const botResponse = {
        id: (Date.now() + 1).toString(),
        message: response,
        isBot: true,
        timestamp: new Date(),
      };
      
      // Update chat history in state (which will trigger saving via useEffect)
      setChatHistory(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting WattBot response:', error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        message: "I'm sorry, I encountered an error processing your request. Please try again later.",
        isBot: true,
        timestamp: new Date(),
      };
      
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setUsingGemini(false);
    }
  };
  
  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <View style={[
        styles.container,
        { backgroundColor: isDark ? colors.backgroundDark : colors.background }
      ]}>
        <Header title="WattBot" icon={<Bot size={24} color={colors.primary} />} />
        
        <View style={styles.subtitleContainer}>
          <View style={styles.geminiContainer}>
            <Text style={[styles.subtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
              Your AI Energy Assistant
            </Text>
            <View style={styles.actionsRow}>
              {APP_CONFIG.features.enableGeminiAI && (
                <View style={styles.geminiPill}>
                  <Sparkles size={14} color={colors.primary} />
                  <Text style={styles.geminiText}>Powered by Gemini AI</Text>
                </View>
              )}
              
              {chatHistory.length > 1 && (
                <TouchableOpacity 
                  style={styles.clearButton}
                  onPress={() => {
                    Alert.alert(
                      'Clear Chat History',
                      'Are you sure you want to clear your entire conversation with WattBot?',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        { 
                          text: 'Clear', 
                          style: 'destructive',
                          onPress: async () => {
                            await clearChatHistory();
                            setChatHistory([
                              {
                                id: Date.now().toString(),
                                message: "Hi there! 👋 I'm WattBot, your AI energy assistant. How can I help you save energy today?",
                                isBot: true,
                                timestamp: new Date(),
                              }
                            ]);
                          }
                        }
                      ]
                    );
                  }}
                >
                  <Text style={styles.clearButtonText}>Clear Chat</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={chatHistory}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ChatBubble message={item} isDark={isDark} />
            )}
            contentContainerStyle={styles.chatList}
            onContentSizeChange={scrollToBottom}
            onLayout={scrollToBottom}
          />
          
          {chatHistory.length > 2 && (
            <TouchableOpacity
              style={[
                styles.scrollButton,
                { backgroundColor: isDark ? colors.cardDark : colors.card }
              ]}
              onPress={scrollToBottom}
            >
              <ArrowDown size={20} color={colors.primary} />
            </TouchableOpacity>
          )}
          
          {isTyping && (
            <View style={[styles.typingIndicator,
              { backgroundColor: isDark ? colors.cardDark : colors.card }
            ]}>
              <ActivityIndicator size="small" color={colors.primary} />
              <View style={styles.typingContent}>
                <Text style={[styles.typingText, { color: isDark ? colors.textDark : colors.text }]}>
                  WattBot is thinking...
                </Text>
                {usingGemini && (
                  <View style={styles.geminiIndicator}>
                    <Sparkles size={12} color={colors.primary} />
                    <Text style={styles.geminiIndicatorText}>Using Gemini AI</Text>
                  </View>
                )}
              </View>
            </View>
          )}
          
          {APP_CONFIG.features.enableGeminiAI && !isGeminiAvailable && (
            <View style={[styles.apiErrorIndicator, 
              { backgroundColor: isDark ? colors.cardDark : colors.card }
            ]}>
              <AlertCircle size={14} color="#e57373" />
              <Text style={styles.apiErrorText}>
                Gemini AI connection unavailable. Using built-in responses.
              </Text>
            </View>
          )}
        </View>
        
        <View style={[
          styles.inputContainer,
          { backgroundColor: isDark ? colors.cardDark : colors.card }
        ]}>
          <TextInput
            style={[
              styles.input,
              { color: isDark ? colors.textDark : colors.text }
            ]}
            placeholder="Ask WattBot anything about energy..."
            placeholderTextColor={isDark ? colors.textTertiaryDark : colors.textTertiary}
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: message.trim() ? colors.primary : isDark ? colors.borderDark : colors.border }
            ]}
            onPress={sendMessage}
            disabled={!message.trim() || isTyping}
          >
            <Send size={20} color={message.trim() ? 'white' : isDark ? colors.textTertiaryDark : colors.textTertiary} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  geminiContainer: {
    alignItems: 'center',
    gap: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  clearButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  clearButtonText: {
    fontSize: 12,
    color: '#757575',
  },
  geminiPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4fe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  geminiText: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: 'Inter-Medium',
  },
  chatContainer: {
    flex: 1, 
    position: 'relative',
  },
  chatList: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  scrollButton: {
    position: 'absolute',
    bottom: 16,
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    maxWidth: '80%',
  },
  typingContent: {
    marginLeft: 8,
    flexDirection: 'column',
  },
  typingText: {
    fontSize: 14,
  },
  geminiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  geminiIndicatorText: {
    fontSize: 12,
    marginLeft: 4,
    color: colors.primary,
  },
  apiErrorIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  apiErrorText: {
    fontSize: 12,
    marginLeft: 6,
    color: '#e57373',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 30,
    marginTop: 12,
    marginHorizontal: 24,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});