import axios from 'axios';

const sendEmail = async (email, subject, message) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_URL}/api/sendEmail`, {
      email,
      subject,
      message,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending Email:', error);
    throw error;
  }
};

export default sendEmail;
