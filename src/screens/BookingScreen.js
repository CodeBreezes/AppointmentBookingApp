import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/BookingScreen.styles';

const BookingScreen = () => {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleBooking = () => {
    if (!name || !service) {
      alert('Please fill in all fields.');
      return;
    }
   const formattedDate = date.toDateString();
const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

alert(`Booking Confirmed!\n\nName: ${name}\nDate: ${formattedDate}\nTime: ${formattedTime}`);
 };

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Select Service</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={service}
            onValueChange={(value) => setService(value)}
            style={styles.picker}
            dropdownIconColor="#7442ff"
          >
            <Picker.Item label="Select service..." value="" />
            <Picker.Item label="Facial" value="Facial" />
            <Picker.Item label="Hair Cut" value="Hair Cut" />
            <Picker.Item label="Massage" value="Massage" />
            <Picker.Item label="Makeup" value="Makeup" />
          </Picker>
        </View>

        <Text style={styles.label}>Select Date</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateButtonText}>
            📆 {date.toDateString()}
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
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}

        <Text style={styles.label}>Select Time</Text>
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={styles.dateButton}
        >
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
              if (selectedTime) {
                setTime(selectedTime);
              }
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
