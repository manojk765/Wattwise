import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useData } from '@/context/DataContext';
import ApplianceForm from '@/components/ApplianceForm';
import Header from '@/components/Header';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';

export default function EditApplianceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { appliances, updateExistingAppliance } = useData();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const appliance = appliances.find(a => a.id === id);

  if (!appliance) {
    return null;
  }

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? colors.backgroundDark : colors.background }
    ]}>
      <Header title="Edit Appliance" />
      <ApplianceForm
        initialData={appliance}
        onSubmit={(data) => updateExistingAppliance(id, data)}
        submitLabel="Update Appliance"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 