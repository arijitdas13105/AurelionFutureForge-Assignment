 
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductListingScreen from '../Screens/ProductListingScreen';
import { View, Text } from 'react-native';
import Profile from '../Screens/ProfileScreen';
import Wishlist from '../Screens/WishlistScreen';
 
const Tab = createBottomTabNavigator();

// const Wishlist = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Wishlist</Text></View>;
const MyCart = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>My Cart</Text></View>;
 
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Wishlist') iconName = 'heart-outline';
          else if (route.name === 'MyCart') iconName = 'cart-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={ProductListingScreen} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="MyCart" component={MyCart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainTabs;
