import axios from 'axios';
import {AsyncStorage} from 'react-native';

export default axios.create({
  baseURL: 'https://test-api.itpsru.in.th',
});

export const authLogin = async (studentId, studentPassword) => {
  const resp = await axios.post(`${API_URL}/auth/login`, {
    studentId: studentId,
    studentPassword: studentPassword,
  });
  await AsyncStorage.setItem('token', resp.data.accessToken);
  const result = resp.status;
  return resp.status;
};
