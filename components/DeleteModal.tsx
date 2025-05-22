import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Trash, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isDark?: boolean;
}

export default function DeleteModal({ visible, onClose, onConfirm, title, isDark = false }: DeleteModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[
          styles.modalContainer,
          { backgroundColor: isDark ? colors.cardDark : colors.card }
        ]}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Trash size={24} color={colors.error} />
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={isDark ? colors.textDark : colors.text} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.title, { color: isDark ? colors.textDark : colors.text }]}>
            Delete Appliance
          </Text>
          
          <Text style={[styles.message, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            Are you sure you want to delete {title}? This action cannot be undone.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: isDark ? colors.textDark : colors.text }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={onConfirm}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: Dimensions.get('window').width - 48,
    borderRadius: 20,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 