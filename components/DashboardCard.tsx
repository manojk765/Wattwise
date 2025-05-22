import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingDown, TrendingUp } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';

interface DashboardCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  percentChange: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  unit, 
  icon, 
  percentChange 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const isPositive = percentChange > 0;
  const changeColor = isPositive ? colors.error : colors.success;
  
  return (
    <View style={[
      styles.card,
      { backgroundColor: isDark ? colors.cardDark : colors.card }
    ]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
          {title}
        </Text>
        <View style={styles.iconContainer}>
          {icon}
        </View>
      </View>
      
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: isDark ? colors.textDark : colors.text }]}>
          {value}
        </Text>
        <Text style={[styles.unit, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
          {unit}
        </Text>
      </View>
      
      <View style={styles.changeContainer}>
        {isPositive ? (
          <TrendingUp size={16} color={changeColor} />
        ) : (
          <TrendingDown size={16} color={changeColor} />
        )}
        <Text style={[styles.changeText, { color: changeColor }]}>
          {Math.abs(percentChange)}%
        </Text>
        <Text style={[styles.periodText, { color: isDark ? colors.textTertiaryDark : colors.textTertiary }]}>
          vs yesterday
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    marginRight: 4,
  },
  unit: {
    fontSize: 12,
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    marginRight: 4,
  },
  periodText: {
    fontSize: 10,
  },
});

export default DashboardCard;