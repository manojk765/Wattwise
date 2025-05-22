import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Lightbulb, Zap, ChevronRight, WashingMachine, Fan, Leaf } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface SavingsTipProps {
  tip: {
    id: string;
    title: string;
    description: string;
    potentialSavings: string;
    category: string;
  };
  isDark?: boolean;
}

const SavingsTip: React.FC<SavingsTipProps> = ({ tip, isDark = false }) => {
  const getIcon = () => {
    switch (tip.category) {
      case 'cooling':
        return <Fan size={24} color={colors.primary} />;
      case 'lighting':
        return <Lightbulb size={24} color={colors.primary} />;
      case 'electronics':
        return <Zap size={24} color={colors.primary} />;
      case 'laundry':
        return <WashingMachine size={24} color={colors.primary} />;
      default:
        return <Leaf size={24} color={colors.primary} />;
    }
  };
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? colors.cardDark : colors.card }
    ]}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: isDark ? colors.textDark : colors.text }]}>
          {tip.title}
        </Text>
        <Text style={[styles.description, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
          {tip.description}
        </Text>
        
        <View style={styles.savingsContainer}>
          <Text style={[styles.savingsLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            Potential Savings:
          </Text>
          <Text style={[styles.savingsValue, { color: colors.success }]}>
            {tip.potentialSavings}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Apply This Tip</Text>
          <ChevronRight size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  savingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  savingsLabel: {
    fontSize: 12,
    marginRight: 4,
  },
  savingsValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
    marginRight: 4,
  },
});

export default SavingsTip;