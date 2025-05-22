import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';

export default function PrivacyScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
      <View style={[styles.header, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={isDark ? colors.textDark : colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? colors.textDark : colors.text }]}>
          Privacy Policy
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Information We Collect
          </Text>
          <Text style={[styles.text, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            We collect information that you provide directly to us, including:
            {'\n\n'}• Account information (name, email, password)
            {'\n'}• Energy usage data
            {'\n'}• Device information
            {'\n'}• Usage patterns and preferences
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            How We Use Your Information
          </Text>
          <Text style={[styles.text, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            We use the collected information to:
            {'\n\n'}• Provide and maintain our services
            {'\n'}• Analyze energy usage patterns
            {'\n'}• Improve our services
            {'\n'}• Send you important updates
            {'\n'}• Provide customer support
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Data Protection
          </Text>
          <Text style={[styles.text, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            We implement appropriate security measures to protect your personal information. Your data is encrypted and stored securely.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Your Rights
          </Text>
          <Text style={[styles.text, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            You have the right to:
            {'\n\n'}• Access your personal data
            {'\n'}• Correct inaccurate data
            {'\n'}• Request deletion of your data
            {'\n'}• Opt-out of marketing communications
            {'\n'}• Export your data
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Contact Us
          </Text>
          <Text style={[styles.text, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            If you have any questions about this Privacy Policy, please contact us at support@greenapp.com
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 