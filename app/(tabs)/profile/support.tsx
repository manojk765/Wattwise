import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';

export default function SupportScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const faqs = [
    {
      question: 'How do I track my energy usage?',
      answer: 'You can track your energy usage through the dashboard. Add your appliances and their usage patterns to get detailed insights.'
    },
    {
      question: 'How accurate are the energy savings estimates?',
      answer: 'Our estimates are based on industry standards and your actual usage data. The more accurate information you provide, the better our estimates will be.'
    },
    {
      question: 'Can I connect multiple devices?',
      answer: 'Yes, you can add multiple devices and track their energy consumption individually. This helps in identifying which devices consume the most energy.'
    },
    {
      question: 'How do I update my profile information?',
      answer: 'You can update your profile information by going to the Profile section and clicking on the edit button next to the information you want to change.'
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
      <View style={[styles.header, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={isDark ? colors.textDark : colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? colors.textDark : colors.text }]}>
          Help & Support
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contactSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Contact Us
          </Text>
          <View style={styles.contactOptions}>
            <TouchableOpacity 
              style={[styles.contactButton, { backgroundColor: isDark ? colors.cardDark : colors.card }]}
              onPress={() => router.push('/chat')}
            >
              <MessageCircle size={24} color={colors.primary} />
              <Text style={[styles.contactButtonText, { color: isDark ? colors.textDark : colors.text }]}>
                Chat with WattBot
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.contactButton, { backgroundColor: isDark ? colors.cardDark : colors.card }]}
              onPress={() => router.push('/email-support')}
            >
              <Mail size={24} color={colors.primary} />
              <Text style={[styles.contactButtonText, { color: isDark ? colors.textDark : colors.text }]}>
                Email Support
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.faqSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Frequently Asked Questions
          </Text>
          {faqs.map((faq, index) => (
            <View 
              key={index} 
              style={[
                styles.faqItem, 
                { backgroundColor: isDark ? colors.cardDark : colors.card }
              ]}
            >
              <Text style={[styles.question, { color: isDark ? colors.textDark : colors.text }]}>
                {faq.question}
              </Text>
              <Text style={[styles.answer, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                {faq.answer}
              </Text>
            </View>
          ))}
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
  contactSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  contactOptions: {
    gap: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  faqSection: {
    marginBottom: 24,
  },
  faqItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 