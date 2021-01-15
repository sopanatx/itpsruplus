import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import jwt_decode from 'jwt-decode';
export default axios.create({
  baseURL: 'https://api.itpsru.in.th',
});

export const authLogin = async (studentId, studentPassword) => {
  const resp = await axios.post(`https://api.itpsru.in.th/auth/login`, {
    studentId: studentId,
    studentPassword: studentPassword,
  });
  console.log('Authentication:', resp.data);
  console.log('Login Status:', resp.status);
  const result = resp.status;
  const value = await AsyncStorage.setItem('token', resp.data.accessToken);
  const decodeJWT = await jwt_decode(resp.data.accessToken);
  await AsyncStorage.setItem('studentID', decodeJWT.username);
  await AsyncStorage.setItem('studentName', decodeJWT.studentName);

  return result;
};
