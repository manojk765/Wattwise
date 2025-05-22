import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Modal, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Lock } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';

export default function EditProfileScreen() {
  const { user, updateProfile, changePassword } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  
  const [name, setName] = useState(user?.name || '');
  const [location, setLocation] = useState(user?.location || '');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [modalAnimation] = useState(new Animated.Value(0));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showPasswordChangeModal = () => {
    setShowPasswordModal(true);
    Animated.spring(modalAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7
    }).start();
  };

  const hidePasswordModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      setShowPasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    });
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      Alert.alert('Success', 'Password updated successfully');
      hidePasswordModal();
    } catch (error: any) {
      console.error('Password change error:', error);
      Alert.alert('Error', error.message || 'Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    try {
      await updateProfile({ name, location });
      Alert.alert('Success', 'Profile updated successfully');
      router.back();
    } catch (error) {
      console.error('Profile update error:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
      <Header title="Edit Profile" />
      
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>Name</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? colors.cardDark : colors.card,
              color: isDark ? colors.textDark : colors.text,
              borderColor: isDark ? colors.borderDark : colors.border
            }]}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>Location</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? colors.cardDark : colors.card,
              color: isDark ? colors.textDark : colors.text,
              borderColor: isDark ? colors.borderDark : colors.border
            }]}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter your location"
            placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
          />
        </View>

        <TouchableOpacity 
          style={[styles.passwordButton, { backgroundColor: isDark ? colors.cardDark : colors.card }]}
          onPress={showPasswordChangeModal}
        >
          <Lock size={20} color={colors.primary} />
          <Text style={styles.passwordButtonText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showPasswordModal}
        transparent
        animationType="none"
        onRequestClose={hidePasswordModal}
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
            <Text style={[styles.modalTitle, { color: isDark ? colors.textDark : colors.text }]}>
              Change Password
            </Text>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>Current Password</Text>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: isDark ? colors.backgroundDark : colors.background,
                  color: isDark ? colors.textDark : colors.text,
                  borderColor: isDark ? colors.borderDark : colors.border
                }]}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
                placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>New Password</Text>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: isDark ? colors.backgroundDark : colors.background,
                  color: isDark ? colors.textDark : colors.text,
                  borderColor: isDark ? colors.borderDark : colors.border
                }]}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? colors.textDark : colors.text }]}>Confirm New Password</Text>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: isDark ? colors.backgroundDark : colors.background,
                  color: isDark ? colors.textDark : colors.text,
                  borderColor: isDark ? colors.borderDark : colors.border
                }]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
                secureTextEntry
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={hidePasswordModal}
              >
                <Text style={[styles.modalButtonText, { color: isDark ? colors.textDark : colors.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]} 
                onPress={handlePasswordChange}
                disabled={isLoading}
              >
                <Text style={styles.confirmButtonText}>
                  {isLoading ? 'Updating...' : 'Update Password'}
                </Text>
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
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  passwordButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  saveButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
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
  confirmButton: {
    backgroundColor: colors.primary,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 