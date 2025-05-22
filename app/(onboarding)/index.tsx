import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Zap, Leaf, Award } from 'lucide-react-native';
import { colors } from '@/constants/colors';

const features = [
  {
    icon: <Zap size={24} color={colors.primary} />,
    title: 'Track Energy',
    description: 'Monitor your energy usage in real-time',
  },
  {
    icon: <Leaf size={24} color={colors.primary} />,
    title: 'Save Money',
    description: 'Get AI-powered tips to reduce consumption',
  },
  {
    icon: <Award size={24} color={colors.primary} />,
    title: 'Earn Rewards',
    description: 'Complete challenges and climb leaderboards',
  },
];

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(76, 175, 80, 0.1)', 'rgba(3, 169, 244, 0.1)']}
        style={styles.gradientBackground}
      />
      
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          style={styles.image}
        />
        <Text style={styles.logo}>WattWise<Text style={styles.plus}>+</Text></Text>
        <Text style={styles.tagline}>Save Energy, Save Earth</Text>
      </View>

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View style={styles.iconContainer}>{feature.icon}</View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/(onboarding)/login" asChild>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/(onboarding)/register" asChild>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>Get Started</Text>
            <ChevronRight size={20} color="white" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 48,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  logo: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text,
  },
  plus: {
    color: colors.primary,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
  },
  featuresContainer: {
    marginBottom: 48,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: colors.background,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  loginButton: {
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginRight: 8,
    marginBottom: 10,
  },
});