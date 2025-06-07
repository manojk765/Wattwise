import React from 'react';
import { Tabs } from 'expo-router';
import { Home, BarChart3, Calendar, Lightbulb, Brain, Medal, User } from 'lucide-react-native';
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
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color }) => <BarChart3 size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="usage"
        options={{
          title: 'Daily Usage',
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="appliances"
        options={{
          title: 'Appliances',
          tabBarIcon: ({ color }) => <Lightbulb size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wattbot"
        options={{
          title: 'WattBot',
          tabBarIcon: ({ color }) => <Brain size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color }) => <Medal size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}