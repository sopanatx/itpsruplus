import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';

let totalGrade;
let totalGradeMain;
let totalCredit;
let profileImage;
let studentID;
export const getVersion = async () => {
  const getversion = await fetch('https://api.itpsru.in.th/appversionx');
  //console.log(awaitcalendar.json());
  return await getversion;
};
