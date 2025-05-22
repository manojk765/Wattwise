import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface AchievementBadgeProps {
  title: string;
  description: string;
  progress: number;
  icon: React.ReactNode;
  color: string;
  isDark?: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  description,
  progress,
  icon,
  color,
  isDark = false
}) => {
  const isComplete = progress >= 1;
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? colors.cardDark : colors.card }
    ]}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        {icon}
      </View>
      
      <Text style={[styles.title, { color: isDark ? colors.textDark : colors.text }]}>
        {title}
      </Text>
      
      <Text style={[styles.description, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
        {description}
      </Text>
      
      <View style={[styles.progressContainer, { backgroundColor: isDark ? colors.borderDark : colors.border }]}>
        <View 
          style={[
            styles.progressBar, 
            { 
              width: `${Math.min(progress * 100, 100)}%`,
              backgroundColor: color
            }
          ]} 
        />
      </View>
      
      <Text style={[
        styles.progressText,
        { color: isComplete ? color : (isDark ? colors.textSecondaryDark : colors.textSecondary) }
      ]}>
        {isComplete 
          ? 'Completed!' 
          : `${Math.round(progress * 100)}% Complete`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default AchievementBadge;