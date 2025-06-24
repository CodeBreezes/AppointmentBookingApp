import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import styles from '../styles/BookingScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postBooking } from '../api/bookingApi';

const BookingScreen = () => {
  const [name, setName] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);

  const serviceApiUrl = 'http://appointment.bitprosofttech.com/api/Services';

  useEffect(() => {
    axios
      .get(serviceApiUrl)
      .then((response) => setServices(response.data.slice(0, 4)))
      .catch(() => Alert.alert('Error', 'Unable to load services'));

    const fetchCustomerData = async () => {
      const fullName = await AsyncStorage.getItem('customerFullName');
      const id = await AsyncStorage.getItem('customerUniqueId');
      if (fullName) setName(fullName);
      if (id) setCustomerId(id);
    };

    fetchCustomerData();
  }, []);

  const handleBooking = async () => {
    if (!serviceId || !customerId) {
      Alert.alert('Error', 'Please select a service.');
      return;
    }

  const startedDate = date.toISOString().split('T')[0];  
const startedTime = time.toTimeString().split(' ')[0];              

    const payload = {
      serviceId: serviceId,
      customerId: parseInt(customerId),
      startedDate: startedDate,
      startedTime: startedTime,
    };

    try {
      await postBooking(payload);
      Alert.alert('Success', 'Booking submitted successfully!');
    } catch (error) {
      console.error('Booking Error:', error.response?.data || error.message);
      Alert.alert('Error', 'Booking failed. Check console for details.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <View style={styles.card}>
        <Text style={styles.label}>Welcome, {name}</Text>

        <Text style={styles.label}>Select Service</Text>
        <TouchableOpacity
          style={styles.dropdownTouchable}
          onPress={() => setServiceModalVisible(true)}
        >
          <Text style={styles.dropdownText}>
            {serviceId
              ? `${services.find((s) => s.uniqueId === serviceId)?.name} - ₹${services.find((s) => s.uniqueId === serviceId)?.cost}`
              : 'Choose a service'}
          </Text>
        </TouchableOpacity>

        <Modal visible={serviceModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select a Service</Text>
              <FlatList
                data={services}
                keyExtractor={(item) => item.uniqueId.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.serviceCard}
                    onPress={() => {
                      setServiceId(item.uniqueId);
                      setServiceModalVisible(false);
                    }}
                  >
                    <View style={styles.serviceRow}>
                      <Text style={styles.serviceName}>{item.name}</Text>
                      <Text style={styles.serviceCost}>₹{item.cost}</Text>
                    </View>
                    <Text style={styles.serviceDescription}>{item.description}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.modalClose} onPress={() => setServiceModalVisible(false)}>
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>Select Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>📆 {date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            minimumDate={new Date()}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Select Time</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            🕒 {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) setTime(selectedTime);
            }}
          />
        )}

        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookingScreen;
