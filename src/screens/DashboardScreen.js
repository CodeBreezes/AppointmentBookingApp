import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import MainLayout from '../components/MainLayout';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <MainLayout title="Dashboard">
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('MyBookings')}
        >
          <AntDesign name="calendar" size={30} color="#7442FF" />
          <Text style={styles.boxTitle}>My Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Profile')}
        >
          <AntDesign name="user" size={30} color="#7442FF" />
          <Text style={styles.boxTitle}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <MaterialIcons name="build" size={30} color="#7442FF" />
          <Text style={styles.boxTitle}>Service Center</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <AntDesign name="infocirlceo" size={30} color="#7442FF" />
          <Text style={styles.boxTitle}>Help & Info</Text>
        </TouchableOpacity>
      </ScrollView>
    </MainLayout>
  );
};

const boxSize = Dimensions.get('window').width / 2 - 30;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  box: {
    width: boxSize,
    height: boxSize,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  boxTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default DashboardScreen;
