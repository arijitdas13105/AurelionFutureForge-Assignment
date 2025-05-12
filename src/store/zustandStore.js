 


import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PHONE_KEY = 'user_phone';

const useAuthStore = create((set,get) => ({
  phoneNumber: null,
  products: [],
  wishlist: [],
  isAuthenticated: false,

  initialize: async () => {
    const phone = await AsyncStorage.getItem(PHONE_KEY);
    const auth = await AsyncStorage.getItem('is_authenticated');
    if (phone) set({ phoneNumber: phone });
    // return phone;
    set({ isAuthenticated: auth === 'true' });
  },

  setPhoneNumber: async (phone) => {
    await AsyncStorage.setItem(PHONE_KEY, phone);
    set({ phoneNumber: phone });
  },

  clearPhoneNumber: async () => {
    await AsyncStorage.removeItem(PHONE_KEY);
    await AsyncStorage.removeItem('is_authenticated');
    // set({ phoneNumber: null });
    set({ phoneNumber: null, isAuthenticated: false });
  },

  setProducts: (products) => set({ products }),
  
  toggleWishlist: (id) => {
    const { wishlist } = get();
    if (wishlist.includes(id)) {
      set({ wishlist: wishlist.filter((item) => item !== id) });
    } else {
      set({ wishlist: [...wishlist, id] });
    }
  },

}));

export default useAuthStore;
