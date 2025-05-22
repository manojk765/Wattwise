import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(onboarding)" />
  );
}