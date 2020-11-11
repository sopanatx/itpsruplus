import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
export default axios.create({
  baseURL: 'https://test-api.itpsru.in.th',
});

export const authLogin = async (studentId, studentPassword) => {
  const resp = await axios.post(`https://test-api.itpsru.in.th/auth/login`, {
    studentId: studentId,
    studentPassword: studentPassword,
  });
  console.log('Authentication:', resp.data);
  console.log('Login Status:', resp.status);
  const result = resp.status;
  const value = await AsyncStorage.setItem('token', resp.data.accessToken);
  return result;
};
