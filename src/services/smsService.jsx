import axios from 'axios';

const sendSMS = async (phone, message) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_URL}/api/sendSMS`, {
      phone,
      message,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

export default sendSMS;
