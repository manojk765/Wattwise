import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
import { colors } from '@/constants/colors';
import Header from '@/components/Header';
import UsageChart from '@/components/UsageChart';
import { Zap, DollarSign, Leaf, TrendingDown, TrendingUp } from 'lucide-react-native';

export default function AnalyticsScreen() {
  const { theme } = useTheme();
  const { dailyUsage, getMonthlyUsage } = useData();
  const isDark = theme === 'dark';
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  const monthlyUsage = getMonthlyUsage();
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - (timeRange === 'week' ? 7 : 30));

  const filteredUsage = dailyUsage.filter(usage => {
    const usageDate = new Date(usage.date);
    return usageDate >= startDate && usageDate <= today;
  });

  const totalUsage = filteredUsage.reduce((total, usage) => ({
    kwh: total.kwh + usage.kwh,
    cost: total.cost + usage.cost,
    co2: total.co2 + usage.co2,
  }), { kwh: 0, cost: 0, co2: 0 });

  const averageDailyUsage = {
    kwh: totalUsage.kwh / filteredUsage.length || 0,
    cost: totalUsage.cost / filteredUsage.length || 0,
    co2: totalUsage.co2 / filteredUsage.length || 0,
  };

  const getTrendIcon = (value: number) => {
    return value < 0 ? (
      <TrendingDown size={20} color={colors.success} />
    ) : (
      <TrendingUp size={20} color={colors.error} />
    );
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? colors.backgroundDark : colors.background }
    ]}>
      <Header title="Analytics" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.timeRangeContainer}>
          <TouchableOpacity
            style={[
              styles.timeRangeButton,
              timeRange === 'week' && styles.timeRangeButtonActive,
              { backgroundColor: isDark ? colors.cardDark : colors.card }
            ]}
            onPress={() => setTimeRange('week')}
          >
            <Text style={[
              styles.timeRangeText,
              timeRange === 'week' && styles.timeRangeTextActive,
              { color: isDark ? colors.textDark : colors.text }
            ]}>
              Week
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.timeRangeButton,
              timeRange === 'month' && styles.timeRangeButtonActive,
              { backgroundColor: isDark ? colors.cardDark : colors.card }
            ]}
            onPress={() => setTimeRange('month')}
          >
            <Text style={[
              styles.timeRangeText,
              timeRange === 'month' && styles.timeRangeTextActive,
              { color: isDark ? colors.textDark : colors.text }
            ]}>
              Month
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Overview
          </Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: `${colors.primary}20` }]}>
                <Zap size={24} color={colors.primary} />
              </View>
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                {totalUsage.kwh.toFixed(1)} kWh
              </Text>
              <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Total Usage
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: `${colors.primary}20` }]}>
                <DollarSign size={24} color={colors.primary} />
              </View>
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                ₹{totalUsage.cost.toFixed(0)}
              </Text>
              <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Total Cost
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: `${colors.primary}20` }]}>
                <Leaf size={24} color={colors.primary} />
              </View>
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                {totalUsage.co2.toFixed(1)} kg
              </Text>
              <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Total CO₂
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Daily Average
          </Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                {averageDailyUsage.kwh.toFixed(1)} kWh
              </Text>
              <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Energy
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                ₹{averageDailyUsage.cost.toFixed(0)}
              </Text>
              <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Cost
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                {averageDailyUsage.co2.toFixed(1)} kg
              </Text>
              <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                CO₂
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Usage Trend
          </Text>
          <UsageChart
            data={filteredUsage.map(usage => ({
              time: new Date(usage.date).toLocaleDateString('en-US', { weekday: 'short' }),
              value: usage.kwh
            }))}
            unit="kWh"
            isDark={isDark}
          />
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Monthly Comparison
          </Text>
          <View style={styles.comparisonContainer}>
            <View style={styles.comparisonItem}>
              <Text style={[styles.comparisonLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                This Month
              </Text>
              <Text style={[styles.comparisonValue, { color: isDark ? colors.textDark : colors.text }]}>
                {monthlyUsage.total.toFixed(1)} kWh
              </Text>
            </View>
            
            <View style={styles.comparisonItem}>
              <Text style={[styles.comparisonLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Last Month
              </Text>
              <Text style={[styles.comparisonValue, { color: isDark ? colors.textDark : colors.text }]}>
                {monthlyUsage.previousMonth.toFixed(1)} kWh
              </Text>
            </View>
            
            <View style={styles.comparisonItem}>
              <Text style={[styles.comparisonLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Change
              </Text>
              <View style={styles.trendContainer}>
                {getTrendIcon(monthlyUsage.percentChange)}
                <Text style={[
                  styles.trendValue,
                  { color: monthlyUsage.percentChange < 0 ? colors.success : colors.error }
                ]}>
                  {Math.abs(monthlyUsage.percentChange)}%
                </Text>
              </View>
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
  timeRangeContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  timeRangeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeRangeButtonActive: {
    backgroundColor: `${colors.primary}20`,
    borderColor: colors.primary,
  },
  timeRangeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  timeRangeTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  comparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comparisonItem: {
    alignItems: 'center',
  },
  comparisonLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  comparisonValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});