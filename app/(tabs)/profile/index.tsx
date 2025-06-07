import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView, Alert, Platform, Modal, Animated } from 'react-native';
import { User, Moon, LogOut, ChevronRight, Award, Bell, Shield, CircleHelp as HelpCircle, FileText, Home, Leaf, Zap, Edit, AlertCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import AchievementBadge from '@/components/AchievementBadge';
import Header from '@/components/Header';

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();
  const isDark = theme === 'dark';
  
  const [notifications, setNotifications] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [modalAnimation] = useState(new Animated.Value(0));

  const showLogoutAlert = () => {
    setShowLogoutModal(true);
    Animated.spring(modalAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7
    }).start();
  };

  const hideLogoutModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      setShowLogoutModal(false);
    });
  };

  const handleLogout = async () => {
    try {
      hideLogoutModal();
      await logout();
      router.replace('/(onboarding)');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
        <Header title="Profile" />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            Please log in to view your profile
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
      <Header title="Profile" />
      
      <View style={[styles.profileHeader, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
        <View style={styles.profileInfo}>
          <View style={[styles.avatarContainer, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            <User size={40} color={isDark ? colors.textDark : colors.text} />
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.name, { color: isDark ? colors.textDark : colors.text }]}>{user.name}</Text>
            <Text style={[styles.location, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>{user.location}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.editProfileButton, { backgroundColor: isDark ? colors.cardDark : colors.card }]} 
        onPress={handleEditProfile}
      >
        <Edit size={20} color={colors.primary} />
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={[styles.statsContainer, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
        <View style={styles.statItem}>
          <Award size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>{user.points}</Text>
          <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>Points</Text>
        </View>
        <View style={styles.statItem}>
          <Zap size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>{user.kwhSaved}</Text>
          <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>kWh Saved</Text>
        </View>
        <View style={styles.statItem}>
          <Leaf size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: isDark ? colors.textDark : colors.text }]}>{user.co2Reduced}</Text>
          <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>CO₂ Reduced</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>Settings</Text>
        
        <TouchableOpacity style={[styles.settingItem, { borderBottomColor: isDark ? colors.borderDark : colors.border }]}>
          <View style={styles.settingLeft}>
            <Bell size={24} color={isDark ? colors.textDark : colors.text} />
            <Text style={[styles.settingText, { color: isDark ? colors.textDark : colors.text }]}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: isDark ? colors.borderDark : colors.border, true: colors.primary }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, { borderBottomColor: isDark ? colors.borderDark : colors.border }]}>
          <View style={styles.settingLeft}>
            <Moon size={24} color={isDark ? colors.textDark : colors.text} />
            <Text style={[styles.settingText, { color: isDark ? colors.textDark : colors.text }]}>Dark Mode</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: isDark ? colors.borderDark : colors.border, true: colors.primary }}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.settingItem, { borderBottomColor: isDark ? colors.borderDark : colors.border }]}
          onPress={() => router.push('/profile/privacy')}
        >
          <View style={styles.settingLeft}>
            <Shield size={24} color={isDark ? colors.textDark : colors.text} />
            <Text style={[styles.settingText, { color: isDark ? colors.textDark : colors.text }]}>Privacy</Text>
          </View>
          <ChevronRight size={24} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.settingItem, { borderBottomColor: isDark ? colors.borderDark : colors.border }]}
          onPress={() => router.push('/profile/support')}
        >
          <View style={styles.settingLeft}>
            <HelpCircle size={24} color={isDark ? colors.textDark : colors.text} />
            <Text style={[styles.settingText, { color: isDark ? colors.textDark : colors.text }]}>Help & Support</Text>
          </View>
          <ChevronRight size={24} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.settingItem, { borderBottomColor: isDark ? colors.borderDark : colors.border }]}
          onPress={() => router.push('/profile/terms')}
        >
          <View style={styles.settingLeft}>
            <FileText size={24} color={isDark ? colors.textDark : colors.text} />
            <Text style={[styles.settingText, { color: isDark ? colors.textDark : colors.text }]}>Terms & Conditions</Text>
          </View>
          <ChevronRight size={24} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: isDark ? colors.cardDark : colors.card }]} 
        onPress={showLogoutAlert}
        activeOpacity={0.7}
      >
        <LogOut size={24} color={colors.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Modal
        visible={showLogoutModal}
        transparent
        animationType="none"
        onRequestClose={hideLogoutModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContent,
              { 
                backgroundColor: isDark ? colors.cardDark : colors.card,
                transform: [{
                  scale: modalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1]
                  })
                }],
                opacity: modalAnimation
              }
            ]}
          >
            <View style={styles.modalIconContainer}>
              <AlertCircle size={40} color={colors.error} />
            </View>
            <Text style={[styles.modalTitle, { color: isDark ? colors.textDark : colors.text }]}>
              Log Out
            </Text>
            <Text style={[styles.modalMessage, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={hideLogoutModal}
              >
                <Text style={[styles.modalButtonText, { color: isDark ? colors.textDark : colors.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmLogoutButton]} 
                onPress={() => {
                  hideLogoutModal();
                  handleLogout();
                }}
              >
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  editProfileText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    borderBottomWidth: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    color: colors.error,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  confirmLogoutButton: {
    backgroundColor: colors.error,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});