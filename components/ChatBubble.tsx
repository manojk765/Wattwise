import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface ChatBubbleProps {
  message: {
    id: string;
    message: string;
    isBot: boolean;
    timestamp: Date;
  };
  isDark?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isDark = false }) => {
  const formattedTime = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <View style={[
      styles.container,
      message.isBot ? styles.botContainer : styles.userContainer
    ]}>
      <View style={[
        styles.bubble,
        message.isBot 
          ? [styles.botBubble, { backgroundColor: isDark ? colors.cardDark : colors.card }]
          : [styles.userBubble, { backgroundColor: colors.primary }]
      ]}>
        <Text style={[
          styles.messageText,
          { color: message.isBot 
            ? (isDark ? colors.textDark : colors.text)
            : 'white'
          }
        ]}>
          {message.message}
        </Text>
      </View>
      <Text style={[
        styles.timestamp,
        message.isBot ? styles.botTimestamp : styles.userTimestamp,
        { color: isDark ? colors.textTertiaryDark : colors.textTertiary }
      ]}>
        {formattedTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  botContainer: {
    alignSelf: 'flex-start',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  bubble: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  botBubble: {
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  botTimestamp: {
    marginLeft: 8,
  },
  userTimestamp: {
    alignSelf: 'flex-end',
    marginRight: 8,
  },
});

export default ChatBubble;