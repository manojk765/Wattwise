import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Lightbulb, Brain, ChartBar as BarChart3, Medal, User, Camera, PlusCircle, Settings } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';

interface TabBarIconProps {
  color: string;
  size: number;
}

export default function TabLayout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: isDark ? colors.textSecondaryDark : colors.textSecondary,
        tabBarStyle: {
          backgroundColor: isDark ? colors.cardDark : colors.card,
          borderTopColor: isDark ? colors.borderDark : colors.border,
          height: 80,
          paddingBottom: 20,
          marginTop: 0,
          borderTopWidth: 0.5,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '500',
          paddingBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="usage"
        options={{
          title: 'Usage',
          tabBarIcon: ({ color }) => <BarChart3 size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="appliances"
        options={{
          title: 'Appliances',
          tabBarIcon: ({ color }) => <PlusCircle size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wattbot"
        options={{
          title: 'WattBot',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Brain size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <BarChart3 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Medal size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <User size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan-bill"
        options={{
          title: 'Scan Bill',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Camera size={size} color={color} />
          ),
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}