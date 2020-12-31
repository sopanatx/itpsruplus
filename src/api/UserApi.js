import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';

let totalGrade;
let totalGradeMain;
let totalCredit;
let profileImage;
let studentID;
const apiGrade = async () => {
  const jwtToken = await AsyncStorage.getItem('token');
  const decodeJWT = await jwt_decode(jwtToken);
  const getGradeApi = await Axios.get(
    `https://app.itpsru.in.th/api/grade/${decodeJWT.username}`,
  );
  const TotalGradeCalculate = await JSON.parse(
    JSON.stringify(getGradeApi.data.TotalGradeCalculate),
  );
  studentID = decodeJWT.username;
  totalCredit = TotalGradeCalculate[0].TotalCredit;
  totalGrade = TotalGradeCalculate[0].TotalAverageGrade;
  totalGradeMain = TotalGradeCalculate[0].TotalMainSubjectGrade;
};

const getActivityCalender = async () => {
  const calendar = await Axios.get('https://api.itpsru.in.th/student/calendar');

  return calendar.data;
};

export default async function apiUserData() {
  const jwtToken = await AsyncStorage.getItem('token');
  const decodeJWT = await jwt_decode(jwtToken);
  const doGetUserData = await Axios.get(
    `https://api.itpsru.in.th/user/find/${decodeJWT.aud}`,
  );
  //console.log(doGetUserData.data.getAccountInfo.AccountInfo[0]);
  console.log('USER_DATA_API_REQ: OK!');
  return doGetUserData.data;
}

export {getActivityCalender};
