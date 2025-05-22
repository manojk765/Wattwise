import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';
import { Appliance } from '@/utils/applianceUtils';

interface ApplianceFormProps {
  initialData?: Partial<Appliance>;
  onSubmit: (data: Omit<Appliance, 'id'>) => Promise<void>;
  submitLabel: string;
}

const categories = [
  'Kitchen',
  'Laundry',
  'Entertainment',
  'Cooling',
  'Lighting',
  'Bathroom',
  'Other',
];

const icons = [
  'refrigerator',
  'washingMachine',
  'tv',
  'fan',
  'lightbulb',
  'droplets',
  'zap',
];

export default function ApplianceForm({ initialData, onSubmit, submitLabel }: ApplianceFormProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    brand: initialData?.brand || '',
    model: initialData?.model || '',
    category: initialData?.category || categories[0],
    wattage: initialData?.wattage?.toString() || '',
    hoursPerDay: initialData?.hoursPerDay?.toString() || '',
    icon: initialData?.icon || icons[0],
    status: initialData?.status || 'active',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    }
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }
    if (!formData.wattage) {
      newErrors.wattage = 'Wattage is required';
    } else if (isNaN(Number(formData.wattage)) || Number(formData.wattage) <= 0) {
      newErrors.wattage = 'Wattage must be a positive number';
    }
    if (!formData.hoursPerDay) {
      newErrors.hoursPerDay = 'Hours per day is required';
    } else if (isNaN(Number(formData.hoursPerDay)) || Number(formData.hoursPerDay) <= 0 || Number(formData.hoursPerDay) > 24) {
      newErrors.hoursPerDay = 'Hours must be between 1 and 24';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await onSubmit({
        ...formData,
        wattage: Number(formData.wattage),
        hoursPerDay: Number(formData.hoursPerDay),
      });
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to save appliance. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
            Name
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDark ? colors.cardDark : colors.card,
                color: isDark ? colors.textDark : colors.text,
              },
              errors.name && styles.inputError,
            ]}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter appliance name"
            placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
            Brand
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDark ? colors.cardDark : colors.card,
                color: isDark ? colors.textDark : colors.text,
              },
              errors.brand && styles.inputError,
            ]}
            value={formData.brand}
            onChangeText={(text) => setFormData({ ...formData, brand: text })}
            placeholder="Enter brand name"
            placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
          />
          {errors.brand && <Text style={styles.errorText}>{errors.brand}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
            Model
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDark ? colors.cardDark : colors.card,
                color: isDark ? colors.textDark : colors.text,
              },
              errors.model && styles.inputError,
            ]}
            value={formData.model}
            onChangeText={(text) => setFormData({ ...formData, model: text })}
            placeholder="Enter model number"
            placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
          />
          {errors.model && <Text style={styles.errorText}>{errors.model}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
            Category
          </Text>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  formData.category === category && styles.categoryButtonActive,
                  { backgroundColor: isDark ? colors.cardDark : colors.card },
                ]}
                onPress={() => setFormData({ ...formData, category })}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    formData.category === category && styles.categoryButtonTextActive,
                    { color: isDark ? colors.textDark : colors.text },
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
            Wattage (W)
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDark ? colors.cardDark : colors.card,
                color: isDark ? colors.textDark : colors.text,
              },
              errors.wattage && styles.inputError,
            ]}
            value={formData.wattage}
            onChangeText={(text) => setFormData({ ...formData, wattage: text })}
            placeholder="Enter wattage"
            keyboardType="numeric"
            placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
          />
          {errors.wattage && <Text style={styles.errorText}>{errors.wattage}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>
            Hours per Day
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDark ? colors.cardDark : colors.card,
                color: isDark ? colors.textDark : colors.text,
              },
              errors.hoursPerDay && styles.inputError,
            ]}
            value={formData.hoursPerDay}
            onChangeText={(text) => setFormData({ ...formData, hoursPerDay: text })}
            placeholder="Enter hours of use per day"
            keyboardType="numeric"
            placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
          />
          {errors.hoursPerDay && <Text style={styles.errorText}>{errors.hoursPerDay}</Text>}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>{submitLabel}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: colors.white,
  },
  submitButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 