import {decryptData, retrieveData} from '../utils';
import {axiosInstance} from './urls';

axiosInstance.interceptors.request.use(
  async config => {
    // Retrieve the access token from AsyncStorage
    const accessToken = await retrieveData('access_token');

    // Attach the access token to the request headers
    if (accessToken) {
      const decryptedAccessToken = await decryptData(
        'access_token',
        accessToken,
      );
      config.headers.Authorization = `Bearer ${decryptedAccessToken}`;
    }

    return config;
  },
  error => {
    console.log('req', error);
    return Promise.reject(error);
  },
);
