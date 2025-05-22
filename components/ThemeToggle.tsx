import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Moon, Sun } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/colors';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleTheme}
      accessibilityLabel="Toggle theme"
      accessibilityHint="Switches between light and dark mode"
    >
      {isDark ? (
        <Sun size={24} color={colors.primary} />
      ) : (
        <Moon size={24} color={colors.primary} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
}); 