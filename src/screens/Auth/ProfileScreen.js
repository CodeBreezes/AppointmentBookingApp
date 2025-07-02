import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  SafeAreaView, StatusBar, ScrollView
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from '../../styles/Auth/ProfileScreen.styles';
import { registerUser } from '../../api/userApi';
import { useNavigation } from '@react-navigation/native';
import CustomAlertModal from '../../components/CustomAlertModal'; // Reusable modal

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [profileImageUri, setProfileImageUri] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastLame, setLastLame] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    confirmText: 'OK',
    onConfirm: () => setModalVisible(false),
  });

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImageUri(response.assets[0].uri);
      }
    });
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const showModal = (title, message, confirmText = 'OK', onConfirm = () => setModalVisible(false)) => {
    setModalContent({ title, message, confirmText, onConfirm });
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    if (!firstName || !lastLame || !phoneNumber || !email || !password || !confirmPassword) {
      return showModal('Validation Error', 'All fields are required.');
    }

    if (!isValidPhone(phoneNumber)) {
      return showModal('Validation Error', 'Phone number must be 10 digits.');
    }

    if (!isValidEmail(email)) {
      return showModal('Validation Error', 'Please enter a valid email address.');
    }

    if (password.length < 6) {
      return showModal('Validation Error', 'Password must be at least 6 characters.');
    }

    if (password !== confirmPassword) {
      return showModal('Validation Error', 'Passwords do not match.');
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
        showModal(
          '🎉 Registration Successful',
          'Your account has been created successfully.',
          'Book Now',
          () => {
            setModalVisible(false);
            navigation.replace('BookingScreen');
          }
        );
      } else {
        showModal('⚠️ Registration Failed', response?.data?.errorMessage || 'Unexpected error.');
      }
    } catch (error) {
      const message = error?.response?.data?.errorMessage || 'Server error. Please try again.';
      showModal('❌ Error', message);
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
          <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
          <TextInput style={styles.input} placeholder="Last Name" value={lastLame} onChangeText={setLastLame} />
          <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

          <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CustomAlertModal
        visible={modalVisible}
        title={modalContent.title}
        message={modalContent.message}
        confirmText={modalContent.confirmText}
        onClose={() => setModalVisible(false)}
        onConfirm={modalContent.onConfirm}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;