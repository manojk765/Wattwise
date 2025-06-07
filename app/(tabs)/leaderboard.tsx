import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Medal, Trophy, Users, ChartBar as BarChart } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import LeaderboardItem from '@/components/LeaderboardItem';
import Header from '@/components/Header';

const tabs = ['Friends', 'City', 'Global'];

export default function LeaderboardScreen() {
  const { theme } = useTheme();
  const { getLeaderboard } = useData();
  const { user } = useAuth();
  const isDark = theme === 'dark';
  
  const [activeTab, setActiveTab] = useState('Friends');
  const leaderboardData = getLeaderboard(activeTab.toLowerCase());
  
  // Find user position
  const userPosition = leaderboardData.findIndex(item => item.id === user?.id) + 1;

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? colors.backgroundDark : colors.background }
    ]}>
      <Header title="Leaderboard" icon={<Trophy size={24} color={colors.primary} />} />
      
      <View style={styles.subtitleContainer}>
        <Text style={[styles.subtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
          Compare your energy savings with others
        </Text>
      </View>
      
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
              { backgroundColor: isDark ? colors.cardDark : colors.card }
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
                { color: isDark ? colors.textDark : colors.text }
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.statsCards}>
        <View style={[
          styles.statsCard,
          { backgroundColor: isDark ? colors.cardDark : colors.card }
        ]}>
          <Users size={24} color={colors.primary} />
          <Text style={[styles.statsValue, { color: isDark ? colors.textDark : colors.text }]}>
            {leaderboardData.length}
          </Text>
          <Text style={[styles.statsLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            Participants
          </Text>
        </View>
        
        <View style={[
          styles.statsCard,
          { backgroundColor: isDark ? colors.cardDark : colors.card }
        ]}>
          <BarChart size={24} color={colors.primary} />
          <Text style={[styles.statsValue, { color: isDark ? colors.textDark : colors.text }]}>
            {user?.points || 0}
          </Text>
          <Text style={[styles.statsLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            Your Points
          </Text>
        </View>
        
        <View style={[
          styles.statsCard,
          { backgroundColor: isDark ? colors.cardDark : colors.card }
        ]}>
          <Medal size={24} color={colors.primary} />
          <Text style={[styles.statsValue, { color: isDark ? colors.textDark : colors.text }]}>
            #{userPosition || '-'}
          </Text>
          <Text style={[styles.statsLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            Your Rank
          </Text>
        </View>
      </View>
      
      <View style={styles.topThreeContainer}>
        <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
          Top Performers
        </Text>
        
        <View style={styles.podiumContainer}>
          {leaderboardData.slice(0, 3).map((item, index) => {
            // Different sizes and positions for 1st, 2nd, and 3rd place
            let containerStyle, imageSize, crownColor;
            
            switch (index) {
              case 0: // 1st place
                containerStyle = styles.firstPlace;
                imageSize = 80;
                crownColor = '#FFD700'; // Gold
                break;
              case 1: // 2nd place
                containerStyle = styles.secondPlace;
                imageSize = 70;
                crownColor = '#C0C0C0'; // Silver
                break;
              case 2: // 3rd place
                containerStyle = styles.thirdPlace;
                imageSize = 60;
                crownColor = '#CD7F32'; // Bronze
                break;
            }
            
            return (
              <View key={`podium-${item.id}`} style={[styles.podiumItem, containerStyle]}>
                <View style={[styles.crownContainer, { backgroundColor: crownColor }]}>
                  <Text style={styles.crownText}>{index + 1}</Text>
                </View>
                <Image
                  source={{ uri: item.avatar }}
                  style={[styles.podiumImage, { width: imageSize, height: imageSize }]}
                />
                <Text style={[styles.podiumName, { color: isDark ? colors.textDark : colors.text }]}>
                  {item.name}
                </Text>
                <Text style={[styles.podiumPoints, { color: colors.primary }]}>
                  {item.points} pts
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      
      <View style={styles.listContainer}>
        <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
          All Rankings
        </Text>
        <FlatList
          data={leaderboardData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <LeaderboardItem 
              user={item} 
              position={index + 1} 
              isCurrentUser={item.id === user?.id}
              isDark={isDark}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.leaderboardList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subtitleContainer: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: `${colors.primary}20`,
  },
  tabText: {
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  statsCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statsCard: {
    width: '31%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statsValue: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 4,
  },
  statsLabel: {
    fontSize: 12,
  },
  topThreeContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 160,
  },
  podiumItem: {
    alignItems: 'center',
    position: 'relative',
  },
  firstPlace: {
    zIndex: 3,
    transform: [{ translateY: -20 }],
  },
  secondPlace: {
    zIndex: 2,
    transform: [{ translateX: -14 }],
  },
  thirdPlace: {
    zIndex: 1,
    transform: [{ translateX: 14 }],
  },
  crownContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
    zIndex: 10,
  },
  crownText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  podiumImage: {
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  podiumPoints: {
    fontSize: 12,
    fontWeight: '700',
  },
  listContainer: {
    flex: 1,
  },
  leaderboardList: {
    paddingBottom: 100,
  },
});