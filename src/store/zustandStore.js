// // src/store/zustandStore.js
//  import { create } from 'zustand';

// // Create the store
// const useAuthStore = create((set) => ({
//   phoneNumber: null,
//   products: [],
//   setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
//   setProducts: (products) => set({ products }),
// }));

// export default useAuthStore;


import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PHONE_KEY = 'user_phone';

const useAuthStore = create((set) => ({
  phoneNumber: null,
  products: [],
  wishlist: [],
  
  // Initialize store with phone number from AsyncStorage
  initialize: async () => {
    const phone = await AsyncStorage.getItem(PHONE_KEY);
    if (phone) set({ phoneNumber: phone });
    return phone;
  },
  
  // Set phone number and save to AsyncStorage
  setPhoneNumber: async (phone) => {
    await AsyncStorage.setItem(PHONE_KEY, phone);
    set({ phoneNumber: phone });
  },
  
  // Clear phone number (logout)
  clearPhoneNumber: async () => {
    await AsyncStorage.removeItem(PHONE_KEY);
    set({ phoneNumber: null });
  },
  
  // Set products
  setProducts: (products) => set({ products }),
}));

export default useAuthStore;