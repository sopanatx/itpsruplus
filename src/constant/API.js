const PRODUCTION_URL = `https://api.itpsru.in.th`;
const TEST_URL = `https://test-api.itpsru.in.th`;

export const USER_DATA_API_KEY = 'et6wg8uu7qw5b49xjte8mf3uw'; //API Key สำหรับ user data
export const PUBLIC_API_KEY = 'baha9gwd2tk4ebqr6htwbu7pe'; //API Key สำหรับ Query ผลการเรียน
export const APP_KEY = 'demr3exhwje76y8a';

export const PRODUCTION_API = {
  getversion: `${PRODUCTION_URL}/appversion`,
  auth: `${PRODUCTION_URL}/auth/login`,
  register: `${PRODUCTION_URL}/auth/register`,
  calendar: `${PRODUCTION_URL}/student/calendar`,
};

export const PUBLIC_API = {
  grade: 'https://app.itpsru.in.th/api/grade',
};
export const LOCAL_TEST_API = {
  auth: `http://192.168.1.120:7000/auth/login`,
  register: `http://192.168.1.120:7000/auth/login`,
  calendar: `http://192.168.1.120:7000/student/calendar`,
};
