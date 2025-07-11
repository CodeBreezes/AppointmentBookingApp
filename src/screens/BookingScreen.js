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
import Icon from 'react-native-vector-icons/Feather';

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
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [selectedServiceDescription, setSelectedServiceDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const serviceApiUrl = 'http://appointment.bitprosofttech.com/api/Services';

  const serviceDescriptions = {
    1: `📌 1-to-1 Live Counseling Session

Find clarity, direction, and personal growth through private video sessions with Rashid.

🔹 Topics Covered:
• Life transitions & cultural identity
• Relationships & workplace issues
• Self-development strategies

✅ Benefits:
✔ Gain perspective on challenges
✔ Build confidence & actionable plans
✔ Culturally aware support

🎯 Tags:
• Deep Dive Session
• Confidential space via Zoom
• Holistic life redesign`,

    2: `📌 Share Your Story

Your voice matters. Let Rashid feature your journey — anonymously or credited — across platforms.

🛠️ How It Works:
• Submit story (credit optional)
• Professional editing
• Shared on Instagram, TikTok, Podcast

🎁 Why Share?
✔ Therapeutic for you
✔ Inspires others
✔ Builds your personal platform

🎯 Tags:
• Video story (Reels)
• Coaching Bonus (Free 30-min session)
• Subtitles in Arabic
• HD video sent post-publishing`,

    3: `📌 Book a Talk

Inspire your audience with Rashid’s real-world stories and bold ideas.

🎤 Available For:
✔ University lectures
✔ Corporate events
✔ Mental health panels

💡 Topics:
• Storytelling & mindset
• Self-doubt & creativity
• Motivation & growth

🎯 Tags:
• Custom speech
• Pre-event consultation
• Post-event networking
• Impactful delivery`,

    4: `📌 Brand Collaborations

Partner with Rashid to craft authentic, viral, creative content.

📣 Ideal For:
✔ Lifestyle & wellness brands
✔ Events, launches & cafés
✔ Tech, fashion, NGOs

🚀 Includes:
• Reels, reviews, storytelling
• Cross-promotion
• Affiliate/revenue share

🎯 Tags:
• Co-branded content
• Performance report
• Authentic, value-driven content`
  };

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
    const startedTime = time.toTimeString().split(' ')[0] + '.' + String(time.getMilliseconds()).padStart(3, '0');

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

            {/* Service Selection Modal */}
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
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedServiceDescription(serviceDescriptions[item.uniqueId]);
                              setDescriptionModalVisible(true);
                            }}
                          >
                            <Icon name="eye" size={20} color="#7442ff" />
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity style={styles.modalClose} onPress={() => setServiceModalVisible(false)}>
                    <Text style={styles.modalCloseText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* Description Modal */}
            <Modal visible={descriptionModalVisible} animationType="slide" transparent>
              <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, { maxHeight: '85%' }]}>
                  <Text style={styles.modalTitle}>Service Description</Text>
                  <ScrollView style={{ marginBottom: 20 }} showsVerticalScrollIndicator>
                    <Text style={styles.descriptionText}>
                      {selectedServiceDescription}
                    </Text>
                  </ScrollView>
                  <TouchableOpacity
                    style={styles.modalClose}
                    onPress={() => setDescriptionModalVisible(false)}
                  >
                    <Text style={styles.modalCloseText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* Topic & Notes */}
            <Text style={styles.label}>Enter Topic</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter topic"
              value={topic}
              onChangeText={setTopic}
            />

            <Text style={styles.label}>Additional Notes</Text>
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

      {/* Loader Overlay */}
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
