import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';
import { FileText, ArrowLeft, Check, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';

export default function ScanBillScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  
  // For now, we'll simulate this flow without using the actual camera
  const [hasPermission, setHasPermission] = useState<boolean>(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulate taking a picture
  const takePicture = async () => {
    setIsCapturing(true);
    
    // Simulate delay
    setTimeout(() => {
      // Sample image URL (would be an actual camera capture in a real app)
      setCapturedImage('https://placehold.co/400x600/png');
      setIsCapturing(false);
    }, 1500);
  };

  const processBill = async () => {
    if (!capturedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate bill analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      Alert.alert(
        'Bill Analysis Complete',
        'Your electricity bill has been analyzed successfully. Total amount: ₹940, Units consumed: 115 kWh.',
        [
          { 
            text: 'View Details', 
            onPress: () => router.push('/analytics')
          },
          {
            text: 'Done',
            onPress: () => router.push('/'),
            style: 'cancel'
          }
        ]
      );
    }, 3000);
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
      <Header title="Scan Bill" icon={<FileText size={24} color={colors.primary} />} />
      
      {!capturedImage ? (
        <View style={styles.cameraContainer}>
          <View style={styles.cameraGuide}>
            {/* Simulated camera view */}
            <View style={[styles.camera, { backgroundColor: '#000' }]}>
              <Text style={styles.cameraPlaceholderText}>Camera Preview</Text>
            </View>
            <View style={styles.guideOverlay}>
              <View style={styles.guideBox} />
            </View>
            <View style={styles.cameraInstructions}>
              <Text style={styles.instructionText}>
                Position your bill within the frame
              </Text>
            </View>
          </View>
          
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={takePicture}
              disabled={isCapturing}
            >
              {isCapturing ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <View style={styles.captureIcon} />
              )}
            </TouchableOpacity>
            
            <View style={styles.placeholder} />
          </View>
        </View>
      ) : (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: capturedImage }}
            style={styles.preview}
            resizeMode="contain"
          />
          
          {isAnalyzing ? (
            <View style={styles.analyzingOverlay}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.analyzingText}>Analyzing bill...</Text>
            </View>
          ) : (
            <View style={styles.previewControls}>
              <TouchableOpacity 
                style={[styles.previewButton, styles.rejectButton]}
                onPress={retakePicture}
              >
                <X size={24} color="white" />
                <Text style={styles.previewButtonText}>Retake</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.previewButton, styles.acceptButton]}
                onPress={processBill}
              >
                <Check size={24} color="white" />
                <Text style={styles.previewButtonText}>Process</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  cameraGuide: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholderText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.7,
  },
  guideOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  guideBox: {
    width: '80%',
    height: '60%',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
  },
  cameraInstructions: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionText: {
    color: 'white',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    backgroundColor: 'black',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  captureIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'white',
  },
  placeholder: {
    width: 48,
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
  },
  preview: {
    flex: 1,
    borderRadius: 8,
    margin: 16,
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  rejectButton: {
    backgroundColor: colors.error,
  },
  acceptButton: {
    backgroundColor: colors.success,
  },
  previewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  analyzingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
}); 