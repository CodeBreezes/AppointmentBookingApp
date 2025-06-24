import axios from 'axios'; 

const BASE_URL = 'http://appointment.bitprosofttech.com/api';
export const registerCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/Customers`, customerData);
    return response;
  } catch (error) {
    console.error('API error:', error.message);
    throw error;
  }
};
