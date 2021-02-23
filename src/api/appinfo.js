import {USER_DATA_API_KEY} from '../constant/API';

export const getVersion = async () => {
  const getversion = await fetch('https://api.itpsru.in.th/appversion', {
    headers: {
      apikey: USER_DATA_API_KEY,
    },
  });
  return await getversion;
};
