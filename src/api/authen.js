import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import jwt_decode from 'jwt-decode';
export default axios.create({
  baseURL: 'https://api.itpsru.in.th',
});

export const setCredential = async (accessToken) => {
  const decodeJWT = await jwt_decode(accessToken);
  console.log({decodeJWT});
  await EncryptedStorage.setItem('studentID', decodeJWT.username);
  await EncryptedStorage.setItem('studentName', decodeJWT.studentName);
};
