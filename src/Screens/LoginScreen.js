 import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import useAuthStore from '../../src/store/zustandStore';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation=useNavigation()
  const [phoneNumber, setPhoneNumberState] = useState('');
  const [countryCode, setCountryCode] = useState('IN');
  const phoneInputRef = useRef(null);
   const setPhoneNumber = useAuthStore(state => state.setPhoneNumber);

 
  const handleContinue = async () => {
    const checkValid = phoneInputRef.current?.isValidNumber(phoneNumber);
    if (checkValid) {
      try {
        await setPhoneNumber(phoneNumber);
        navigation.navigate('Otp', {
          phoneNumber,
          otpLength: 6
        });
      } catch (error) {
        console.error('Error saving phone number:', error);
      }
    } else {
      console.log('Invalid Phone Number');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2563eb" barStyle="light-content" />

      <View style={styles.content}>
        <Text style={styles.title}>
          Login For The Best Experience
        </Text>
        <Text style={styles.subtitle}>
         Enter Mobile Number
        </Text>

        <View style={styles.phoneInputContainer}>
          <PhoneInput
            ref={phoneInputRef}
            defaultValue={phoneNumber}
            defaultCode={countryCode}
            layout="first"
            onChangeText={(text) => setPhoneNumberState(text)}
            onChangeCountry={(country) => setCountryCode(country.cca2)}
            containerStyle={styles.phoneInputWrapper}
            textContainerStyle={styles.textContainer}
            textInputStyle={styles.textInput}
            codeTextStyle={styles.codeText}
            flagButtonStyle={styles.flagButton} // Updated flagButton style
            withDarkTheme={false}
            withShadow={false}
          />
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By continuing, you agree to StreetMall{' '}
            <Text style={styles.highlightedText}>Terms of Use</Text> and{' '}
            <Text style={styles.highlightedText}>Privacy Policy</Text>
          </Text>
        </View>

       
    <View style={styles.createAccountContainer}>
    <View  style={styles.createAccountContainers} >
          <Text style={styles.createAccountText}>
            Not a user?{' '}
            <Text style={styles.createAccountHighlight}>
              Create an account
            </Text>
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
    </View>
       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',  
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 64,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    color: '#3f77e4',
    fontSize: 15,
    fontWeight: 'medium',
    marginBottom: 16,
  },
  phoneInputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    borderBottomWidth:1
  },
  phoneInputWrapper: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
  },
  textContainer: {
    backgroundColor: 'white',
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
  },
  textInput: {
    height: 50,
  },
  codeText: {
    height: 50,
    lineHeight: 50,
  },
  flagButton: {
    width: 50, 
    padding: 8, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsContainer: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  termsText: {
    color: 'black',
    fontSize: 12,
  },
  highlightedText: {
    color: '#3f77e4',  
  },
  buttonContainer: {
    position: 'absolute',
     left: 16,
    right: 16,
  },
  continueButton: {
    backgroundColor: '#fbbf24',  
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  createAccountContainer: {
    position: 'absolute',
    bottom: 64,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  createAccountContainers: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  createAccountText: {
    color: 'black',
  },
  createAccountHighlight: {
    fontWeight: 'bold',
    color: '#3f77e4',  
    textDecorationColor: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;