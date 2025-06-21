import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Auth/SignupScreen.styles';
import axios from 'axios';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const apiUrl =
    Platform.OS === 'android'
      ? 'http://appointment.bitprosofttech.com/api/Customers'
      : 'http://appointment.bitprosofttech.com/api/Customers';

  const handleRegister = async () => {
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      Alert.alert('Validation Error', 'Please fill out all fields');
      return;
    }

    const payload = {
      firstName,
      lastName,
      phoneNumber,
      email,
      createdDate: new Date().toISOString(),
      lastUpdatedDate: new Date().toISOString(),
    };

    try {
      const response = await axios.post(apiUrl, payload);
debugger;
      if (response.status === 201 || response.status === 200) {
        Alert.alert('Success', 'Registered successfully!');
        navigation.navigate('Home'); 
      } else {
        Alert.alert('Error', 'Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error.message);
      Alert.alert('API Error', 'Could not connect to server');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#aaa"
          style={styles.inputBox}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#aaa"
          style={styles.inputBox}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          style={styles.inputBox}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          style={styles.inputBox}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.inputBox}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}> Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
