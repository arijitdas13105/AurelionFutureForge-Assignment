// src/App.tsx
import { View, Text } from 'react-native'
import React, { useState ,useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './src/Screens/LoginScreen'
import ProductListingScreen from './src/Screens/ProductListingScreen'
import OtpScreen from './src/Screens/OtpScreen'
import { NavigationContainer } from '@react-navigation/native'
import MainTabs from './MainTabs'
import { getPhoneNumber } from './src/utils/asyncStorageUtils'
import useAuthStore from './src/store/zustandStore'

const Stack = createStackNavigator();

const App = () => {
  const [isReady, setIsReady] = useState(false);
  // const { setPhoneNumber } = useAuthStore();

  const phoneNumber = useAuthStore(state => state.phoneNumber);
  const initialize = useAuthStore(state => state.initialize);

  // useEffect(() => {
  //   const checkStoredPhoneNumber = async () => {
  //     const savedPhone = await getPhoneNumber();
  //     if (savedPhone) {
  //       setPhoneNumber(savedPhone); // Set Zustand state
  //       setIsReady(true);
  //     }
  //     setIsReady(true);
  //   };

  //   checkStoredPhoneNumber();
  // }, []);

  // if (!isReady) {
  //   return null; // Or show splash/loading screen
  // }

  useEffect(() => {
    const checkAuth = async () => {
      await initialize();
      setIsReady(true);
    };
    checkAuth();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
      <NavigationContainer>
      <Stack.Navigator>
        {phoneNumber ? (
          // User is logged in - show main app
          <>
            <Stack.Screen 
              name="ProductListing" 
              component={MainTabs} 
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Otp" component={OtpScreen} />
          </>
        ) : (
          // User is not logged in - show auth flow
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen name="Otp" component={OtpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;