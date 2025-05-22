import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '@/constants/colors';

interface UsageChartProps {
  data?: any[];
  period?: string;
  unit?: string;
  isDark?: boolean;
}

const UsageChart: React.FC<UsageChartProps> = ({ 
  data = [], 
  period = 'daily',
  unit = 'energy',
  isDark = false 
}) => {
  // If no data provided, use dummy data for demonstration
  const chartData = data.length ? data : [
    { time: 'Mon', value: 5.2 },
    { time: 'Tue', value: 5.8 },
    { time: 'Wed', value: 5.3 },
    { time: 'Thu', value: 6.1 },
    { time: 'Fri', value: 7.4 },
    { time: 'Sat', value: 6.9 },
    { time: 'Sun', value: 6.2 },
  ];
  
  const screenWidth = Dimensions.get('window').width - 64;
  
  const chartConfig = {
    backgroundGradientFrom: isDark ? colors.cardDark : colors.card,
    backgroundGradientTo: isDark ? colors.cardDark : colors.card,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    labelColor: (opacity = 1) => isDark ? `rgba(249, 250, 251, ${opacity})` : `rgba(31, 41, 55, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: colors.primary
    }
  };
  
  const getUnitLabel = () => {
    switch (unit) {
      case 'energy':
        return 'kWh';
      case 'cost':
        return '₹';
      case 'co2':
        return 'kg CO₂';
      default:
        return '';
    }
  };
  
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: chartData.map(item => item.time),
          datasets: [
            {
              data: chartData.map(item => item.value),
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              strokeWidth: 2
            }
          ]
        }}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        yAxisSuffix={` ${getUnitLabel()}`}
        yAxisInterval={1}
        fromZero
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default UsageChart;