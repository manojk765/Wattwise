import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  PanelTopOpen, 
  ChevronRight, 
  Zap, 
  Calendar, 
  TrendingDown, 
  Leaf,
  Brain, 
  Camera, 
  CloudOff,
  DollarSign,
  Lightbulb
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import DashboardCard from '@/components/DashboardCard';
import UsageChart from '@/components/UsageChart';
import SavingsTip from '@/components/SavingsTip';
import Header from '@/components/Header';

// Get screen dimensions
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_PADDING = 16;
const CARD_MARGIN = 8;

// Define interfaces for our data
interface UsageData {
  kwh: number;
  cost: number;
  co2: number;
}

interface MonthlyData {
  total: number;
  previousMonth: number;
  percentChange: number;
}

interface TipData {
  id: string;
  title: string;
  description: string;
  potentialSavings: string;
  category: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuth();
  const { getTodayUsage, getMonthlyUsage, getSavingTips } = useData();
  const isDark = theme === 'dark';
  
  const [todayUsage, setTodayUsage] = useState<UsageData>({
    kwh: 0,
    cost: 0,
    co2: 0,
  });
  
  const [monthlyUsage, setMonthlyUsage] = useState<MonthlyData>({
    total: 0,
    previousMonth: 0,
    percentChange: 0,
  });
  
  const [tips, setTips] = useState<TipData[]>([]);
  
  useEffect(() => {
    const today = getTodayUsage();
    const monthly = getMonthlyUsage();
    const savingTips = getSavingTips();
    
    setTodayUsage(today);
    setMonthlyUsage(monthly);
    setTips(savingTips.slice(0, 2)); // Just get 2 tips for the dashboard
  }, []);

  const quickActions = [
    {
      name: 'Add Appliance',
      icon: <Lightbulb size={24} color={colors.primary} />,
      onPress: () => router.push('/appliances/add'),
    },
    {
      name: 'Get Tips',
      icon: <Brain size={24} color={colors.primary} />,
      onPress: () => router.push('/wattbot'),
    },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.backgroundDark : colors.background }
      ]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Header title="Dashboard" icon={<PanelTopOpen size={24} color={colors.primary} />} />
      
      <View style={styles.welcomeSection}>
        <Text style={[styles.greeting, { color: isDark ? colors.textDark : colors.text }]}>
          Hello, {user?.name || 'User'}
        </Text>
        <Text style={[styles.date, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsHeader}>
          <View style={styles.statsTitle}>
            <Zap size={20} color={colors.primary} />
            <Text style={[styles.statsHeading, { color: isDark ? colors.textDark : colors.text }]}>
              Today's Usage
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.viewAllButton} 
            onPress={() => router.push('/analytics')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.viewAllText}>Details</Text>
            <ChevronRight size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsScrollContent}
        >
          <DashboardCard
            title="Energy Used"
            value={todayUsage.kwh.toFixed(1)}
            unit="kWh"
            icon={<Zap size={20} color={colors.primary} />}
            percentChange={-12}
          />
          <DashboardCard
            title="Estimated Cost"
            value={todayUsage.cost.toFixed(0)}
            unit="₹"
            icon={<DollarSign size={20} color={colors.primary} />}
            percentChange={-8}
          />
          <DashboardCard
            title="CO₂ Emissions"
            value={todayUsage.co2.toFixed(1)}
            unit="kg"
            icon={<CloudOff size={20} color={colors.primary} />}
            percentChange={-15}
          />
        </ScrollView>
      </View>

      <View style={styles.chartSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitle}>
            <Calendar size={20} color={colors.primary} />
            <Text style={[styles.sectionHeading, { color: isDark ? colors.textDark : colors.text }]}>
              Monthly Overview
            </Text>
          </View>
          <View style={[
            styles.changeContainer,
            { backgroundColor: monthlyUsage.percentChange < 0 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)' }
          ]}>
            <TrendingDown size={16} color={monthlyUsage.percentChange < 0 ? colors.success : colors.error} />
            <Text
              style={[
                styles.changeText,
                { color: monthlyUsage.percentChange < 0 ? colors.success : colors.error }
              ]}
            >
              {Math.abs(monthlyUsage.percentChange)}% vs last month
            </Text>
          </View>
        </View>
        <UsageChart isDark={isDark} />
      </View>

      <View style={styles.quickActionsSection}>
        <Text style={[styles.sectionHeading, { color: isDark ? colors.textDark : colors.text }]}>
          Quick Actions
        </Text>
        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.actionButton,
                { backgroundColor: isDark ? colors.cardDark : colors.card }
              ]}
              onPress={action.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.actionIcon}>{action.icon}</View>
              <Text style={[styles.actionText, { color: isDark ? colors.textDark : colors.text }]}>
                {action.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.tipsSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitle}>
            <Leaf size={20} color={colors.primary} />
            <Text style={[styles.sectionHeading, { color: isDark ? colors.textDark : colors.text }]}>
              Energy Saving Tips
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.viewAllButton} 
            onPress={() => router.push('/wattbot')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRight size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.tipsList}>
          {tips.map((tip, index) => (
            <SavingsTip key={tip.id} tip={tip} isDark={isDark} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: CARD_PADDING,
    paddingBottom: 120,
  },
  welcomeSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  statsContainer: {
    marginBottom: 32,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsHeading: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  viewAllText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  cardsScrollContent: {
    paddingHorizontal: CARD_MARGIN,
  },
  chartSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    marginBottom: 12,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
  },
  tipsSection: {
    marginBottom: 32,
  },
  tipsList: {
    marginTop: 12,
    gap: 12,
  },
});