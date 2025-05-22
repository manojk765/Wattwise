import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, FlatList } from 'react-native';
import { useData } from '@/context/DataContext';
import { colors } from '@/constants/colors';

interface DailyUsageFormProps {
  onSubmit: (data: { applianceId: string; hoursUsed: number; wattage: number }) => Promise<void>;
  isDark?: boolean;
}

export default function DailyUsageForm({ onSubmit, isDark = false }: DailyUsageFormProps) {
  const { appliances } = useData();
  const [selectedAppliance, setSelectedAppliance] = useState('');
  const [selectedApplianceLabel, setSelectedApplianceLabel] = useState('');
  const [hoursUsed, setHoursUsed] = useState('');
  const [customWattage, setCustomWattage] = useState('');
  const [isCustomEntry, setIsCustomEntry] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modalVisible, setModalVisible] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (isCustomEntry) {
      if (!customWattage) {
        newErrors.wattage = 'Wattage is required';
      } else if (isNaN(Number(customWattage)) || Number(customWattage) <= 0) {
        newErrors.wattage = 'Wattage must be a positive number';
      }
    } else if (!selectedAppliance) {
      newErrors.appliance = 'Please select an appliance';
    }
    if (!hoursUsed) {
      newErrors.hours = 'Hours used is required';
    } else if (isNaN(Number(hoursUsed)) || Number(hoursUsed) <= 0 || Number(hoursUsed) > 24) {
      newErrors.hours = 'Hours must be between 1 and 24';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (isCustomEntry) {
        await onSubmit({
          applianceId: 'custom',
          hoursUsed: Number(hoursUsed),
          wattage: Number(customWattage)
        });
      } else {
        const appliance = appliances.find(a => a.id === selectedAppliance);
        if (!appliance) {
          Alert.alert('Error', 'Selected appliance not found');
          return;
        }
        await onSubmit({
          applianceId: selectedAppliance,
          hoursUsed: Number(hoursUsed),
          wattage: appliance.wattage
        });
      }
      setSelectedAppliance('');
      setSelectedApplianceLabel('');
      setHoursUsed('');
      setCustomWattage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add daily usage');
    }
  };

  const renderApplianceItem = ({ item }: { item: { id: string; name: string; wattage: number } }) => (
    <TouchableOpacity
      style={[
        styles.applianceItem,
        { backgroundColor: isDark ? colors.backgroundDark : colors.background }
      ]}
      onPress={() => {
        setSelectedAppliance(item.id);
        setSelectedApplianceLabel(`${item.name} (${item.wattage}W)`);
        setModalVisible(false);
      }}
    >
      <Text style={[styles.applianceText, { color: isDark ? colors.textDark : colors.text }]}>
        {item.name} ({item.wattage}W)
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
      <TouchableOpacity
        style={[styles.toggleButton, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}
        onPress={() => setIsCustomEntry(!isCustomEntry)}
      >
        <Text style={[styles.toggleText, { color: isDark ? colors.textDark : colors.text }]}>
          {isCustomEntry ? 'Select Existing Appliance' : 'Enter Custom Usage'}
        </Text>
      </TouchableOpacity>

      {isCustomEntry ? (
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
            Wattage (W)
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? colors.backgroundDark : colors.background,
                color: isDark ? colors.textDark : colors.text,
                borderColor: isDark ? colors.borderDark : colors.border
              },
              errors.wattage && styles.inputError
            ]}
            value={customWattage}
            onChangeText={setCustomWattage}
            placeholder="Enter wattage"
            placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
            keyboardType="numeric"
          />
          {errors.wattage && <Text style={styles.errorText}>{errors.wattage}</Text>}
        </View>
      ) : (
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
            Select Appliance
          </Text>
          <TouchableOpacity
            style={[
              styles.selectButton,
              {
                backgroundColor: isDark ? colors.backgroundDark : colors.background,
                borderColor: isDark ? colors.borderDark : colors.border
              }
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={[styles.selectButtonText, { color: isDark ? colors.textDark : colors.text }]}>
              {selectedApplianceLabel || "Select an appliance"}
            </Text>
          </TouchableOpacity>
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={[
                styles.modalContent,
                { backgroundColor: isDark ? colors.cardDark : colors.card }
              ]}>
                <Text style={[styles.modalTitle, { color: isDark ? colors.textDark : colors.text }]}>
                  Select an Appliance
                </Text>
                <FlatList
                  data={appliances}
                  renderItem={renderApplianceItem}
                  keyExtractor={item => item.id}
                  style={styles.applianceList}
                />
                <TouchableOpacity
                  style={[styles.closeButton, { backgroundColor: colors.primary }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {errors.appliance && <Text style={styles.errorText}>{errors.appliance}</Text>}
        </View>
      )}

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
          Hours Used Today
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? colors.backgroundDark : colors.background,
              color: isDark ? colors.textDark : colors.text,
              borderColor: isDark ? colors.borderDark : colors.border
            },
            errors.hours && styles.inputError
          ]}
          value={hoursUsed}
          onChangeText={setHoursUsed}
          placeholder="Enter hours used"
          placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
          keyboardType="numeric"
        />
        {errors.hours && <Text style={styles.errorText}>{errors.hours}</Text>}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: colors.primary }]}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Add Usage</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
  },
  toggleButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  selectButton: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  selectButtonText: {
    fontSize: 16,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  applianceList: {
    maxHeight: 300,
  },
  applianceItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  applianceText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 