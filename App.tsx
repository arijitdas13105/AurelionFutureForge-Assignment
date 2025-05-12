// // src/App.tsx
// import { View, Text } from 'react-native'
// import React, { useState ,useEffect} from 'react'
// import { createStackNavigator } from '@react-navigation/stack'
// import LoginScreen from './src/Screens/LoginScreen'
// import ProductListingScreen from './src/Screens/ProductListingScreen'
// import OtpScreen from './src/Screens/OtpScreen'
// import { NavigationContainer } from '@react-navigation/native'
// import MainTabs from './MainTabs'
// import { getPhoneNumber,isAuthenticated } from './src/utils/asyncStorageUtils'
// import useAuthStore from './src/store/zustandStore'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Stack = createStackNavigator();

// const App = () => {
//   const [isReady, setIsReady] = useState(false);
//   const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);

//   // const { setPhoneNumber } = useAuthStore();

//   const phoneNumber = useAuthStore(state => state.phoneNumber);
//   const initialize = useAuthStore(state => state.initialize);

  

//   // useEffect(() => {
//   //   const checkAuth = async () => {
//   //     const authStatus = await isAuthenticated();
//   //     if(authStatus){
//   //       initialize();
//   //     }
//   //     setIsAuthenticatedUser(authStatus);
//   //     // await initialize();
//   //     setIsReady(true);
//   //   };
//   //   checkAuth();
//   // }, []);
//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const authStatus = await AsyncStorage.getItem('is_authenticated');
//         setIsAuthenticatedUser(authStatus === 'true');
//        } catch (error) {
//         console.error('Error checking auth status', error);
//       }
//     };

//     checkAuthStatus();
//   }, []);


//   // if (!isReady) {
//   //   return (
//   //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   //       <Text>Loading...</Text>
//   //     </View>
//   //   );
//   // }


//   return (
//       <NavigationContainer>
//       <Stack.Navigator>
//         {isAuthenticatedUser ? (
//           // User is logged in - show main app
//           <>
//             <Stack.Screen 
//               name="ProductListing" 
//               component={MainTabs} 
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen name="Otp" component={OtpScreen} />
//           </>
//         ) : (
//           // User is not logged in - show auth flow
//           <>
//             <Stack.Screen 
//               name="Login" 
//               component={LoginScreen} 
//               options={{ headerShown: false }} 
//             />
//             <Stack.Screen name="Otp" component={OtpScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;




import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useAuthStore from './src/store/zustandStore';

import LoginScreen from './src/Screens/LoginScreen';
import OtpScreen from './src/Screens/OtpScreen';
import MainTabs from './src/Navigation/MainTabs';

const Stack = createStackNavigator();

const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="ProductListing" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Otp" component={OtpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
