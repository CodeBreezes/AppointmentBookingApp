import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  SafeAreaView, StatusBar, Alert, ScrollView
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from '../../styles/Auth/ProfileScreen.styles';
import { registerUser } from '../../api/userApi';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [profileImageUri, setProfileImageUri] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastLame, setLastLame] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImageUri(response.assets[0].uri);
      }
    });
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = async () => {
    // Validations
    if (!firstName || !lastLame || !phoneNumber || !email || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    if (!isValidPhone(phoneNumber)) {
      Alert.alert('Validation Error', 'Phone number must be 10 digits.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    const payload = {
      firstName,
      lastLame,
      phoneNumber,
      email,
      password,
      confirmPassword,
      roles: ['Customer'],
      errorMessage: '',
      successMessage: '',
      notificationMessage: '',
    };

    try {
      const response = await registerUser(payload);

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Registration successful!', [
          {
            text: 'Continue',
            onPress: () => navigation.replace('BookingScreen'), // Redirect
          },
        ]);
      } else {
        Alert.alert('Error', response?.data?.errorMessage || 'Something went wrong.');
      }
    } catch (error) {
      const message = error?.response?.data?.errorMessage || 'Server error.';
      Alert.alert('Error', message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#6A5ACD" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.profileImageContainer} onPress={handleImageUpload}>
            {profileImageUri
              ? <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
              : <AntDesign name="user" size={60} color="white" />}
          </TouchableOpacity>
          <Text style={styles.profilePictureText}>Profile Picture</Text>
          <Text style={styles.uploadImageText}>Upload a personal image</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#888"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#888"
            value={lastLame}
            onChangeText={setLastLame}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
