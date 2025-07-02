// bookingApi.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://appointment.bitprosofttech.com/api';

export const postBooking = async (bookingData) => {
  try {
    const token = await AsyncStorage.getItem('token');  

    const response = await axios.post(`${BASE_URL}/Bookings`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,  
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
