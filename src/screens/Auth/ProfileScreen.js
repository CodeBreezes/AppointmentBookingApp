import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../../styles/Auth/ProfileScreen.styles';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://placehold.co/100x100/A78BFA/ffffff?text=User' }}
              style={styles.profileImage}
            />
          </View>

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
              style={[styles.input, styles.passwordInput]}
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
