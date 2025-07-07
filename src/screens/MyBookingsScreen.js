import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import MainLayout from '../components/MainLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SERVICE_NAMES = {
  1: 'Oil Change',
  2: 'Tire Replacement',
  3: 'Car Wash',
  4: 'Engine Check',
};

const MyBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');

      const response = await axios.get('http://appointment.bitprosofttech.com/api/Bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filtered = response.data.filter((booking) => booking.userId.toString() === userId);
      setBookings(filtered);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hour), parseInt(minute));
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderBooking = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}>🛠️ Service: {SERVICE_NAMES[item.serviceId] || 'Unknown Service'}</Text>
      <Text style={styles.text}>📅 Date: {formatDate(item.startedDate)}</Text>
      <Text style={styles.text}>⏰ Time: {formatTime(item.startedTime)}</Text>
    </View>
  );

  return (
    <MainLayout title="My Bookings">
      {loading ? (
        <ActivityIndicator size="large" color="#7442FF" style={{ marginTop: 50 }} />
      ) : bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.uniqueId.toString()}
          renderItem={renderBooking}
          contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        <Text style={styles.noDataText}>No bookings found.</Text>
      )}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  noDataText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
});

export default MyBookingsScreen;
