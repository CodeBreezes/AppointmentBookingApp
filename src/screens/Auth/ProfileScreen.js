import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image, // Import Image component for displaying the selected image
  SafeAreaView,
  StatusBar,
  Alert, // Import Alert for user feedback
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker functions
import styles from '../../styles/Auth/ProfileScreen.styles';

const ProfileScreen = () => {
  const [profileImageUri, setProfileImageUri] = useState(null);

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode, response.errorMessage);
        Alert.alert('Error', 'Failed to pick image: ' + response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImageUri = response.assets[0].uri;
        setProfileImageUri(selectedImageUri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#6A5ACD" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={handleImageUpload}
          >
            {profileImageUri ? (
              <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
            ) : (
              <AntDesign name="user" size={60} color="white" />
            )}
          </TouchableOpacity>

          <Text style={styles.profilePictureText}>Profile Picture</Text>
          <Text style={styles.uploadImageText}>Upload a personal image</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="#888" />
          <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="#888" />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
          />
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
            />
            <TouchableOpacity style={styles.passwordEyeIcon}>
              <AntDesign name="eyeo" size={20} color="#888" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;