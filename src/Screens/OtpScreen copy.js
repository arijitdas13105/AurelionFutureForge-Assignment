// src/Screens/OtpScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import useAuthStore from '../store/zustandStore';
import { savePhoneNumber } from '../utils/asyncStorageUtils';

const { width, height } = Dimensions.get('window');


const OtpScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { phoneNumber } = route.params;
  const { setPhoneNumber } = useAuthStore(); // Zustand store
  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(''));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);
  const phoneNumberFromStore = useAuthStore(state => state.phoneNumber);

  // Timer and resend logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle input change
  const handleChange = (text, index) => {
    // Validate input (only numbers)
    if (text === '' || /^[0-9]$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      // Move focus to next input
      if (text && index < otpLength - 1) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      // Move focus to previous input
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Verify OTP
  const handleContinue = async() => {
    const enteredOtp = otp.join('');
    // Validate OTP length
    if (enteredOtp.length !== otpLength) {
      Alert.alert('Invalid OTP', 'Please enter a 6-digit OTP');
      return;
    }
    // Simulate verification (replace with actual verification logic)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Navigate to next screen or handle successful verification
      navigation.navigate('ProductListing');
    }, 1500);
  };

  // Resend OTP
  const handleResendOTP = () => {
    if (canResend) {
      setLoading(true);
      // Simulate OTP resend (replace with actual resend logic)
      setTimeout(() => {
        setLoading(false);
        setOtp(new Array(otpLength).fill(''));
        setTimer(60);
        setCanResend(false);
        inputs.current[0]?.focus();
        Alert.alert('OTP Resent', 'A new OTP has been sent to your number');
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.contentContainer}>
            <View style={styles.headerSection}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>🔐</Text>
              </View>
              <Text style={styles.title}>Verify Your Number</Text>
              <Text style={styles.subTitle}>
                We've sent a 6-digit verification code to{' '}
                <Text style={styles.phoneText}>{phoneNumber}</Text>
              </Text>
            </View>
            <View style={styles.otpContainer}>
              {otp.map((value, index) => (
                <View key={index} style={styles.digitContainer}>
                  <TextInput
                    ref={(ref) => (inputs.current[index] = ref)}
                    style={styles.digitInput}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={value}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    selectTextOnFocus
                  />
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={[
                styles.verifyButton,
                (otp.join('').length !== otpLength || loading) &&
                  styles.verifyButtonDisabled,
              ]}
              onPress={handleContinue}
              disabled={otp.join('').length !== otpLength || loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Verify & Continue</Text>
              )}
            </TouchableOpacity>
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>
                {canResend
                  ? "Didn't receive the code?"
                  : `Resend code in ${formatTime(timer)}`}
              </Text>
              {canResend && (
                <TouchableOpacity
                  onPress={handleResendOTP}
                  disabled={loading}
                  style={styles.resendButton}
                >
                  <Text style={styles.resendText}>
                    {loading ? 'Sending...' : 'Resend OTP'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: height * 0.05,
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  iconText: {
    fontSize: 36,
  },
  title: {
    fontSize: 26,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
    width: '90%',
  },
  phoneText: {
    fontWeight: 'bold',
    color: '#2563eb',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  digitContainer: {
    width: width / 8,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F5F5F7',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  digitInput: {
    width: '100%',
    height: '100%',
    fontSize: 22,
    textAlign: 'center',
    color: '#333',
  },
  verifyButton: {
    height: 58,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 24,
  },
  verifyButtonDisabled: {
    backgroundColor: '#A0A0A0',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  timerText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(73, 109, 255, 0.1)',
    borderRadius: 20,
  },
  resendText: {
    fontSize: 15,
    color: '#2563eb',
    fontWeight: 'bold',
  },
});

export default OtpScreen;