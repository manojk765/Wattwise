import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface ConsumptionBreakdownProps {
  isDark?: boolean;
}

const ConsumptionBreakdown: React.FC<ConsumptionBreakdownProps> = ({ isDark = false }) => {
  const data = [
    { name: 'Air Conditioner', percentage: 38, color: '#4CAF50' },
    { name: 'Refrigerator', percentage: 15, color: '#2196F3' },
    { name: 'Water Heater', percentage: 12, color: '#FF9800' },
    { name: 'Washing Machine', percentage: 8, color: '#9C27B0' },
    { name: 'Lighting', percentage: 7, color: '#F44336' },
    { name: 'TV & Electronics', percentage: 12, color: '#00BCD4' },
    { name: 'Others', percentage: 8, color: '#9E9E9E' },
  ];
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? colors.cardDark : colors.card }
    ]}>
      <View style={styles.barContainer}>
        {data.map((item, index) => (
          <View
            key={index}
            style={[
              styles.barSegment,
              { 
                width: `${item.percentage}%`,
                backgroundColor: item.color,
                borderTopLeftRadius: index === 0 ? 8 : 0,
                borderBottomLeftRadius: index === 0 ? 8 : 0,
                borderTopRightRadius: index === data.length - 1 ? 8 : 0,
                borderBottomRightRadius: index === data.length - 1 ? 8 : 0,
              }
            ]}
          />
        ))}
      </View>
      
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={[styles.legendName, { color: isDark ? colors.textDark : colors.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.legendPercentage, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
              {item.percentage}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
  },
  barContainer: {
    flexDirection: 'row',
    height: 24,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  barSegment: {
    height: '100%',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendName: {
    fontSize: 12,
    flex: 1,
  },
  legendPercentage: {
    fontSize: 12,
    fontWeight: '600',
    width: 32,
    textAlign: 'right',
  },
});

export default ConsumptionBreakdown;