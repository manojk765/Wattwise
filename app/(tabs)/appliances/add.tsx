import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useData } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/colors';
import ApplianceForm from '@/components/ApplianceForm';
import Header from '@/components/Header';

export default function AddApplianceScreen() {
  const { addNewAppliance } = useData();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? colors.backgroundDark : colors.background }
    ]}>
      <Header title="Add Appliance" showBack />
      <ApplianceForm
        onSubmit={addNewAppliance}
        submitLabel="Add Appliance"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 