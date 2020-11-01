import axios from 'axios';
import {PUBLIC_API} from '../constant/API';
export default async function getMyGrade(studentID) {
  try {
    const grade = await axios.get(`${PUBLIC_API.grade}/${studentID}`);
    return grade.data.TotalCalculateGrade;
  } catch (e) {
    return {
      error: 500,
      message: `Can't get grade from api gateway`,
    };
  }
}
