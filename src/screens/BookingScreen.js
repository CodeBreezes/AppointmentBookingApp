import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, Modal,
  FlatList, Alert, Platform, ActivityIndicator, KeyboardAvoidingView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MainLayout from '../components/MainLayout';
import styles from '../styles/BookingScreen.styles';
import { postBooking } from '../api/bookingApi';

const BookingScreen = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState(null);
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const serviceApiUrl = 'http://appointment.bitprosofttech.com/api/Services';

  useEffect(() => {
    axios.get(serviceApiUrl)
      .then((response) => setServices(response.data.slice(0, 4)))
      .catch(() => Alert.alert('Error', 'Unable to load services'));

    const fetchUserData = async () => {
      const fullName = await AsyncStorage.getItem('customerFullName');
      const id = await AsyncStorage.getItem('userId');
      if (fullName) setName(fullName);
      if (id) setUserId(id);
    };

    fetchUserData();
  }, []);

  const handleBooking = async () => {
    if (!serviceId || !userId || !topic.trim()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const startedDate = date.toISOString().split('T')[0];
    const startedTime =
      time.toTimeString().split(' ')[0] + '.' + String(time.getMilliseconds()).padStart(3, '0');

    const payload = {
      serviceId,
      userId: parseInt(userId),
      startedDate,
      startedTime,
      topic,
      notes,
    };

    try {
      setLoading(true);
      await postBooking(payload);
      Alert.alert('Success', 'Booking submitted successfully!');
      setTopic('');
      setNotes('');
    } catch (error) {
      Alert.alert('Error', 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout title="Book Appointment">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={styles.pageContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.label}>Welcome, {name}</Text>

            {/* Service Picker */}
            <Text style={styles.label}>Select Service</Text>
            <TouchableOpacity
              style={styles.dropdownTouchable}
              onPress={() => setServiceModalVisible(true)}
            >
              <Text style={styles.dropdownText}>
                {serviceId
                  ? `${services.find(s => s.uniqueId === serviceId)?.name} - ₹${services.find(s => s.uniqueId === serviceId)?.cost}`
                  : 'Choose a service'}
              </Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal visible={serviceModalVisible} animationType="slide" transparent>
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

            {/* Topic & Notes */}
            <Text style={styles.label}>Enter the Topic of the booking</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter topic"
              value={topic}
              onChangeText={setTopic}
            />

            <Text style={styles.label}>Additional Notes (mandatory)</Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Additional notes..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />

            {/* Date & Time */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                  <Text style={styles.dateButtonText}>
                    {date ? `📆 ${date.toDateString()}` : 'Select Date'}
                  </Text>
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
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Time</Text>
                <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
                  <Text style={styles.dateButtonText}>
                    {time ? `🕒 ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Select Time'}
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
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.bookButton} onPress={handleBooking} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.bookButtonText}>Confirm Booking</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Fullscreen Loader */}
      {loading && (
        <View style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center'
        }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </MainLayout>
  );
};

export default BookingScreen;
