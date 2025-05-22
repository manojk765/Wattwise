import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '@/constants/colors';

interface LeaderboardItemProps {
  user: {
    id: string;
    name: string;
    points: number;
    avatar: string;
  };
  position: number;
  isCurrentUser: boolean;
  isDark?: boolean;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ 
  user, 
  position, 
  isCurrentUser,
  isDark = false 
}) => {
  return (
    <View style={[
      styles.container,
      isCurrentUser && [
        styles.currentUserContainer,
        { backgroundColor: isDark ? `${colors.primary}20` : `${colors.primary}10` }
      ]
    ]}>
      <View style={styles.positionContainer}>
        <Text style={[
          styles.position,
          position <= 3 && styles.topPosition,
          { color: position <= 3 ? colors.primary : (isDark ? colors.textDark : colors.text) }
        ]}>
          #{position}
        </Text>
      </View>
      
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      
      <Text style={[
        styles.name,
        { color: isDark ? colors.textDark : colors.text }
      ]} numberOfLines={1}>
        {user.name}
        {isCurrentUser && ' (You)'}
      </Text>
      
      <View style={[
        styles.pointsContainer,
        { backgroundColor: isDark ? colors.cardDark : colors.card }
      ]}>
        <Text style={[styles.points, { color: colors.primary }]}>
          {user.points}
        </Text>
        <Text style={[styles.pointsLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
          pts
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  currentUserContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  positionContainer: {
    width: 36,
    alignItems: 'center',
  },
  position: {
    fontSize: 14,
    fontWeight: '600',
  },
  topPosition: {
    fontWeight: '700',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginRight: 12,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  points: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 2,
  },
  pointsLabel: {
    fontSize: 12,
  },
});

export default LeaderboardItem;