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
    `https://gazw5fi7d2.execute-api.ap-southeast-1.amazonaws.com/production/api/grade/${decodeJWT.username}`,
  );
  const TotalGradeCalculate = await JSON.parse(
    JSON.stringify(getGradeApi.data.TotalGradeCalculate),
  );
  studentID = decodeJWT.username;
  totalCredit = TotalGradeCalculate[0].TotalCredit;
  totalGrade = TotalGradeCalculate[0].TotalAverageGrade;
  totalGradeMain = TotalGradeCalculate[0].TotalMainSubjectGrade;
};

const apiUserData = async () => {
  const jwtToken = await AsyncStorage.getItem('token');
  const decodeJWT = await jwt_decode(jwtToken);
  const doGetUserData = await Axios.get(
    `https://test-api.itpsru.in.th/user/find/${decodeJWT.aud}`,
  );
  //console.log(doGetUserData.data.getAccountInfo.AccountInfo[0]);
  const AccountInfo = doGetUserData.data.getAccountInfo.AccountInfo[0];
  profileImage = AccountInfo.profileImageUrl;
  console.log({profileImage});
};

apiGrade();
apiUserData();
export {totalGrade, totalGradeMain, totalCredit, profileImage, studentID};
