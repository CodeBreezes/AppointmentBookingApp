import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL =
  Platform.OS === 'android'
    ? 'http://appointment.bitprosofttech.com/api'
    : 'http://appointment.bitprosofttech.com/api';

export const registerCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/Customers`, customerData);
    return response;
  } catch (error) {
    console.error('API error:', error.message);
    throw error;
  }
};
