import React from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
import { colors } from '@/constants/colors';
import Header from '@/components/Header';
import DailyUsageForm from '@/components/DailyUsageForm';
import UsageChart from '@/components/UsageChart';

export default function UsageScreen() {
  const { theme } = useTheme();
  const { dailyUsage, addDailyUsageEntry, getTodayUsage, getMonthlyUsage } = useData();
  const isDark = theme === 'dark';

  const todayUsage = getTodayUsage();
  const monthlyUsage = getMonthlyUsage();

  const handleAddUsage = async (data: { applianceId: string; hoursUsed: number; wattage: number }) => {
    try {
      await addDailyUsageEntry(data);
      Alert.alert('Success', 'Daily usage added successfully');
    } catch (error) {
      console.error('Error adding usage:', error);
      Alert.alert('Error', 'Failed to add daily usage. Please try again.');
    }
  };

  // Get the last 7 days of usage data
  const last7Days = dailyUsage
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7)
    .reverse();

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? colors.backgroundDark : colors.background }
    ]}>
      <Header title="Daily Usage" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
          <DailyUsageForm onSubmit={handleAddUsage} isDark={isDark} />
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
          <UsageChart
            data={last7Days.map(usage => ({
              time: new Date(usage.date).toLocaleDateString('en-US', { weekday: 'short' }),
              value: usage.kwh
            }))}
            unit="kWh"
            isDark={isDark}
          />
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Today's Usage
              </Text>
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                {todayUsage.kwh.toFixed(1)} kWh
              </Text>
              <Text style={[styles.statSubtext, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                ₹{todayUsage.cost.toFixed(0)}
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Monthly Usage
              </Text>
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                {monthlyUsage.total.toFixed(1)} kWh
              </Text>
              <Text style={[styles.statSubtext, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                ₹{monthlyUsage.cost.toFixed(0)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  card: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
  },
  statSubtext: {
    fontSize: 14,
    marginTop: 4,
  },
}); 