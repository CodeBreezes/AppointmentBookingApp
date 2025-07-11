import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Modal,
} from 'react-native';
import styles from '../../styles/Auth/LoginScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../../api/loginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlertModal from '../../components/CustomAlertModal';
import CustomHeader from '../../components/CustomHeader';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    onConfirm: null,
  });

  const [loading, setLoading] = useState(false); // <-- state for full-screen loader

  const handleLogin = async () => {
    if (!username || !password) {
      showModal('Validation Error', 'Please enter both username and password.');
      return;
    }

    setLoading(true); // show loader

    try {
      const payload = {
        loginName: username,
        password,
      };

      const response = await loginUser(payload);

      if (
        response?.status === 200 &&
        response?.data?.isLoginSuccess &&
        response?.data?.token
      ) {
        const { token, fName, lName, email, userId } = response.data;

        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userId', userId.toString());
        await AsyncStorage.setItem('customerFullName', `${fName} ${lName}`);
        await AsyncStorage.setItem('email', email);

        showModal('Login Success', 'You are now logged in!', () =>
          navigation.replace('Dashboard')
        );
      } else {
        showModal(
          'Login Failed',
          response?.data?.errorMessages || 'Invalid login response.'
        );
      }
    } catch (error) {
      const message =
        error?.response?.data?.errorMessages || 'Server error. Please try again.';
      showModal('Login Error', message);
    } finally {
      setLoading(false); // hide loader
    }
  };

  const showModal = (title, message, onConfirm) => {
    setModalContent({
      title,
      message,
      onConfirm: () => {
        setModalVisible(false);
        if (onConfirm) onConfirm();
      },
    });
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Log In" hideMenu />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username or Mobile"
              placeholderTextColor="#999"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOG IN</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.registerLink}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Full Screen Loader */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={loaderStyles.overlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={loaderStyles.text}>Logging in...</Text>
        </View>
      </Modal>

      <CustomAlertModal
        visible={modalVisible}
        title={modalContent.title}
        message={modalContent.message}
        onClose={() => setModalVisible(false)}
        onConfirm={modalContent.onConfirm}
      />
    </SafeAreaView>
  );
};

const loaderStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
