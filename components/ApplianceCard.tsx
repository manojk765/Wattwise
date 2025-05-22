import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Lightbulb, Zap, Edit, Fan, Refrigerator, WashingMachine, Tv, Droplet, Clock, DollarSign, Trash } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import DeleteModal from './DeleteModal';
import { calculateApplianceMetrics } from '@/utils/applianceUtils';

interface ApplianceCardProps {
  appliance: {
    id: string;
    name: string;
    brand: string;
    model: string;
    category: string;
    wattage: number;
    hoursPerDay: number;
    icon: string;
    status: string;
  };
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDark?: boolean;
}

const ApplianceCard: React.FC<ApplianceCardProps> = ({ 
  appliance, 
  onPress, 
  onEdit, 
  onDelete,
  isDark = false 
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const metrics = calculateApplianceMetrics(appliance.wattage, appliance.hoursPerDay);

  const getIcon = () => {
    switch (appliance.icon) {
      case 'airVent':
      case 'fan':
        return <Fan size={24} color={colors.primary} />;
      case 'refrigerator':
        return <Refrigerator size={24} color={colors.primary} />;
      case 'washingMachine':
        return <WashingMachine size={24} color={colors.primary} />;
      case 'tv':
        return <Tv size={24} color={colors.primary} />;
      case 'droplets':
      case 'water':
        return <Droplet size={24} color={colors.primary} />;
      default:
        return <Lightbulb size={24} color={colors.primary} />;
    }
  };
  
  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: isDark ? colors.cardDark : colors.card }
        ]}
        onPress={onPress}
      >
        <View style={styles.iconContainer}>
          {getIcon()}
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.nameContainer}>
            <Text style={[styles.name, { color: isDark ? colors.textDark : colors.text }]}>
              {appliance.name}
            </Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: appliance.status === 'active' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: appliance.status === 'active' ? colors.success : colors.warning }
              ]}>
                {appliance.status === 'active' ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>
          
          <Text style={[styles.details, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            {appliance.brand} {appliance.model}
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Zap size={16} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                {appliance.wattage}W
              </Text>
            </View>
            
            <View style={styles.stat}>
              <Clock size={16} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                {appliance.hoursPerDay}h/day
              </Text>
            </View>
            
            <View style={styles.stat}>
              <DollarSign size={16} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                ₹{metrics.monthlyCost.toFixed(0)}/mo
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: isDark ? colors.cardDark : colors.card }]}
            onPress={onEdit}
          >
            <Edit size={20} color={colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: isDark ? colors.cardDark : colors.card }]}
            onPress={() => setShowDeleteModal(true)}
          >
            <Trash size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <DeleteModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          setShowDeleteModal(false);
          onDelete();
        }}
        title={appliance.name}
        isDark={isDark}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
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
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  details: {
    fontSize: 14,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  actionsContainer: {
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
});

export default ApplianceCard;