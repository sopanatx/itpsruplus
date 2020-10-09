import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
export default axios.create({
  baseURL: 'https://test-api.itpsru.in.th',
});

export const authLogin = async (studentId, studentPassword) => {
  const resp = await axios.post(`https://test-api.itpsru.in.th/auth/login`, {
    studentId: studentId,
    studentPassword: studentPassword,
  });
  console.log('Authen:', resp.data);
  console.log('Status:', resp.status);
  const result = resp.status;
  const value = await AsyncStorage.setItem('token', resp.data.accessToken);
  return result;
};

export const isAuthen = async () => {
  const value = await AsyncStorage.getItem('token');
  if (value) {
    console.log('Authen Message : Found Authentication Token:', value);
    return true;
  } else {
    console.log('Authen Message : This Device is not authenticated!');
    return false;
  }
};
