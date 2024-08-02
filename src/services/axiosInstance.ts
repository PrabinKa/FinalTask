import axios from 'axios';
import {retrieveData, decryptData, encryptData, storeData} from '../utils';

const axiosInstance = axios.create({
  baseURL: `https://dummyjson.com/auth/`,
});

axiosInstance.interceptors.request.use(
  async config => {
    try {
      //retrieve access token from asyncstorage
      const accessToken = await retrieveData('access_token');
      if (accessToken) {
        //access token decryption
        const decryptedAccessToken = await decryptData(
          accessToken,
          'access_token',
        );
        config.headers.Authorization = `Bearer ${decryptedAccessToken}`;
      }
    } catch (error) {
      console.error('Error during token decryption', error);
      return Promise.reject(error);
    }

    return config;
  },
  error => {
    console.log('request error', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          //retrieve refresh token from asyncstorage
          const refreshToken = await retrieveData('refresh_token');

          if (refreshToken) {
            //refresh token decryption
            const decryptedRefreshToken = await decryptData(
              refreshToken,
              'refresh_token',
            );

            try {
              const response = await axiosInstance.post('/refresh', {
                refreshToken: decryptedRefreshToken,
              });

              if (response.data && response.data.token) {
                const accessToken = response.data.token;
                const encryptedAccessToken = await encryptData(
                  accessToken,
                  'access_token',
                );
                // Update the access token in AsyncStorage
                await storeData('access_token', encryptedAccessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              }
            } catch (error) {
              console.log('error refresh', error);
            }
          }
          // Retry the original request with the new access token
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
