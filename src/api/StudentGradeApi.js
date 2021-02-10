import axios from 'axios';
import {PUBLIC_API, PUBLIC_API_KEY} from '../constant/API';
import EncryptedStorage from 'react-native-encrypted-storage';

const getAvailableSemester = async () => {
  const jwtToken = await EncryptedStorage.getItem('accessToken');

  const response = await axios.get(
    'https://api.itpsru.in.th/student/semester_list',
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        API_KEY: PUBLIC_API_KEY,
      },
    },
  );
  console.log('List -->', response.data);
  return response.data;
};

async function getMyGrade(studentID, semester) {
  try {
    const grade = await axios.post(
      `${PUBLIC_API.grade}/`,
      {studentId, semester},
      {
        headers: {
          API_KEY: PUBLIC_API_KEY,
        },
      },
    );
    return grade.data.TotalCalculateGrade;
  } catch (e) {
    return {
      error: 500,
      message: `Can't get grade from api gateway`,
    };
  }
}

async function getAllGrade() {
  const jwtToken = await EncryptedStorage.getItem('accessToken');
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  const response = await fetch(
    'https://api.itpsru.in.th/student/grade',
    requestOptions,
  );
  return await response.json();
}

async function getGradeBySemester(semester) {
  console.log('Semester -->', semester);
  const jwtToken = await EncryptedStorage.getItem('accessToken');

  const response = await axios.post(
    'https://api.itpsru.in.th/student/grade',
    {semester: semester},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken,
      },
    },
  );

  return response.data;
}

export {getMyGrade, getAllGrade, getAvailableSemester, getGradeBySemester};
