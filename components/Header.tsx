import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/colors';
import ThemeToggle from './ThemeToggle';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  icon?: React.ReactNode;
  showBack?: boolean;
}

export default function Header({ title, icon, showBack }: HeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.headerTitle}>
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={isDark ? colors.textDark : colors.text} />
          </TouchableOpacity>
        )}
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
  backButton: {
    marginRight: 8,
  },
}); 