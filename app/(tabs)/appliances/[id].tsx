import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Edit, Trash, Power, Calendar, Zap, DollarSign, Leaf } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
import Header from '@/components/Header';
import UsageChart from '@/components/UsageChart';
import { calculateApplianceMetrics } from '@/utils/applianceUtils';

export default function ApplianceDetailsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { appliances, updateExistingAppliance, removeAppliance } = useData();
  const isDark = theme === 'dark';
  
  // Find the appliance by ID
  const appliance = appliances.find(a => a.id === id);
  
  // Handle case where appliance is not found
  useEffect(() => {
    if (!appliance) {
      Alert.alert('Error', 'Appliance not found', [
        {
          text: 'OK',
          onPress: () => router.back()
        }
      ]);
    }
  }, [appliance, router]);
  
  if (!appliance) {
    return null;
  }

  const metrics = calculateApplianceMetrics(appliance.wattage, appliance.hoursPerDay);
  
  const handleDelete = () => {
    Alert.alert(
      'Delete Appliance',
      `Are you sure you want to delete ${appliance.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeAppliance(appliance.id);
              router.back();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete appliance. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleEdit = () => {
    router.push(`/appliances/edit/${appliance.id}`);
  };

  const handleToggleStatus = async () => {
    try {
      await updateExistingAppliance(appliance.id, {
        status: appliance.status === 'active' ? 'inactive' : 'active'
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to update appliance status. Please try again.');
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
      {/* <Header 
        title={appliance.name}
        icon={<ArrowLeft size={24} color={isDark ? colors.textDark : colors.text} />}
        onPress={() => router.back()}
      /> */}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: isDark ? colors.textDark : colors.text }]}>
                {appliance.name}
              </Text>
              <Text style={[styles.subtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                {appliance.brand} {appliance.model}
              </Text>
            </View>
            
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: isDark ? colors.cardDark : colors.card }]}
                onPress={handleEdit}
              >
                <Edit size={20} color={colors.primary} />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: isDark ? colors.cardDark : colors.card }]}
                onPress={handleDelete}
              >
                <Trash size={20} color={colors.error} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Zap size={24} color={colors.primary} />
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                {metrics.monthlyKwh.toFixed(1)} kWh
              </Text>
              <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Monthly Usage
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <DollarSign size={24} color={colors.primary} />
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                ₹{metrics.monthlyCost.toFixed(0)}
              </Text>
              <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Monthly Cost
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Leaf size={24} color={colors.primary} />
              <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>
                {metrics.monthlyCO2.toFixed(1)} kg
              </Text>
              <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Monthly CO₂
              </Text>
            </View>
          </View>
        </View>
        
        <View style={[styles.card, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Usage Details
          </Text>
          
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Power Rating
              </Text>
              <Text style={[styles.detailValue, { color: isDark ? colors.textDark : colors.text }]}>
                {appliance.wattage} W
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Daily Usage
              </Text>
              <Text style={[styles.detailValue, { color: isDark ? colors.textDark : colors.text }]}>
                {appliance.hoursPerDay} hours
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Category
              </Text>
              <Text style={[styles.detailValue, { color: isDark ? colors.textDark : colors.text }]}>
                {appliance.category}
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Status
              </Text>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  { 
                    backgroundColor: appliance.status === 'active' 
                      ? colors.success 
                      : colors.error 
                  }
                ]}
                onPress={handleToggleStatus}
              >
                <Text style={styles.statusText}>
                  {appliance.status === 'active' ? 'Active' : 'Inactive'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={[styles.card, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Usage History
          </Text>
          <UsageChart
            data={[
              { time: 'Mon', value: metrics.dailyKwh },
              { time: 'Tue', value: metrics.dailyKwh * 0.9 },
              { time: 'Wed', value: metrics.dailyKwh * 1.1 },
              { time: 'Thu', value: metrics.dailyKwh * 0.95 },
              { time: 'Fri', value: metrics.dailyKwh * 1.05 },
              { time: 'Sat', value: metrics.dailyKwh * 1.2 },
              { time: 'Sun', value: metrics.dailyKwh * 1.15 },
            ]}
            unit="kWh"
            isDark={isDark}
          />
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
    padding: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  details: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  statusButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
}); 