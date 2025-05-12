// src/utils/asyncStorageUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const PHONE_KEY = 'user_phone';

export const savePhoneNumber = async (phone) => {
  try {
    await AsyncStorage.setItem(PHONE_KEY, phone);
  } catch (error) {
    console.error('Error saving phone number', error);
  }
};

export const getPhoneNumber = async () => {
  try {
    return await AsyncStorage.getItem(PHONE_KEY);
  } catch (error) {
    console.error('Error getting phone number', error);
    return null;
  }
};

export const clearPhoneNumber = async () => {
  try {
    await AsyncStorage.removeItem(PHONE_KEY);
  } catch (error) {
    console.error('Error clearing phone number', error);
  }
};