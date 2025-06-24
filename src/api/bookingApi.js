import axios from 'axios';

const BASE_URL = 'http://appointment.bitprosofttech.com/api';

 debugger;
export const postBooking = async (bookingData) => {
  try
   {
    debugger;
    const response = await axios.post(`${BASE_URL}/Bookings`, bookingData);
    return response;
  } 
  catch (error) {
    console.error('API error:', error.message);
    throw error;
  }
};