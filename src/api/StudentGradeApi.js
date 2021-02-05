import axios from 'axios';
import {PUBLIC_API, PUBLIC_API_KEY} from '../constant/API';
import EncryptedStorage from 'react-native-encrypted-storage';

const getAvailableSemester = async (studentId) => {
  const response = await axios.post(
    'https://app.itpsru.in.th/api/available_semester',
    {
      studentId: studentId,
    },
    {
      headers: {
        API_KEY: PUBLIC_API_KEY,
      },
    },
  );
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

async function getAllGrade(studentId, semester) {
  const response = await getAvailableSemester(studentId);
  console.log('SEMESTER', response);
  console.log(studentId, semester);
  try {
    const grade = await axios.post(
      `${PUBLIC_API.grade}/`,
      {studentId: studentId, semester: semester},
      {
        headers: {
          API_KEY: PUBLIC_API_KEY,
        },
      },
    );
    console.log(grade.data.semesterInfo.availableSemesterData);
    return grade.data.data;
  } catch (e) {
    return {
      error: 500,
      message: `Can't get grade from api gateway`,
    };
  }
}
export {getMyGrade, getAllGrade, getAvailableSemester};
