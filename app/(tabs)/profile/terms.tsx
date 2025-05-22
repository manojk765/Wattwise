import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';

export default function TermsScreen() {
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
          Terms & Conditions
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Acceptance of Terms
          </Text>
          <Text style={[styles.text, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            By accessing and using GreenApp, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the application.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            User Responsibilities
          </Text>
          <Text style={[styles.text, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            You agree to:
            {'\n\n'}• Provide accurate information about your energy usage
            {'\n'}• Maintain the security of your account
            {'\n'}• Use the app in compliance with all applicable laws
            {'\n'}• Not misuse or attempt to manipulate the system
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Data Usage and Privacy
          </Text>
          <Text style={[styles.text, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            We collect and process your data in accordance with our Privacy Policy. By using the app, you consent to such processing and warrant that all data provided by you is accurate.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Intellectual Property
          </Text>
          <Text style={[styles.text, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            All content, features, and functionality of GreenApp are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Limitation of Liability
          </Text>
          <Text style={[styles.text, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            We provide the app "as is" without any warranties. We are not liable for any damages arising from the use or inability to use the app, including but not limited to energy savings estimates.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Changes to Terms
          </Text>
          <Text style={[styles.text, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            We reserve the right to modify these terms at any time. We will notify users of any material changes. Continued use of the app after such changes constitutes acceptance of the new terms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Governing Law
          </Text>
          <Text style={[styles.text, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
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