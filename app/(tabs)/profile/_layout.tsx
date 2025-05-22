import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/colors';

export default function ProfileLayout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: isDark ? colors.backgroundDark : colors.background,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="support" />
      <Stack.Screen name="terms" />
    </Stack>
  );
} 