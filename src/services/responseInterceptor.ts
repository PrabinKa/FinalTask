import {retrieveData, storeData} from '../utils';
import {axiosInstance} from './urls';

axiosInstance.interceptors.response.use(
  response => {
    // Handle successful responses
    return response;
  },
  async error => {
    // Handle error responses
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh the access token
        const refreshToken = await retrieveData('refresh_token');

        console.log('refresh response', refreshToken);
        const response = await axiosInstance.post('refresh', {
          refreshToken,
        });

        console.log('refresh post', response);

        // Update the access token in AsyncStorage
        await storeData('accessToken', response.data.accessToken);

        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error
        console.error('Error refreshing token:', refreshError);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
