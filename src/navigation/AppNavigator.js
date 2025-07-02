import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen'; // ✅ Correct import
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ProfileScreen from '../screens/Auth/ProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} options={{title: 'Book Your Appointment', 
    headerStyle: {
      backgroundColor: '#7442ff',   
    },
    headerTintColor: '#fff',       
    headerTitleStyle: {
      fontWeight: 'bold',
    },

  }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
