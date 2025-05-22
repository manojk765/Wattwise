import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/colors';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  title: string;
  icon?: React.ReactNode;
}

export default function Header({ title, icon }: HeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={styles.header}>
      <View style={styles.headerTitle}>
        {icon}
        <Text style={[styles.title, { color: isDark ? colors.textDark : colors.text }]}>
          {title}
        </Text>
      </View>
      <ThemeToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 20,
    marginBottom: 5,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginLeft: 8,
  },
}); 