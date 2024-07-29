import React, {useEffect, useState} from 'react';
import {Image, Linking, Text, View} from 'react-native';
import {Header, PlainButton} from '../../components';
import {
  COLORS,
  heightPixel,
  horizontalSpace,
  IMAGE_PATH,
  verticalSpace,
} from '../../constants';
import TouchableInputs from './TouchableInputs';
import {styles} from './Styles';
import {Loader} from '../../components';
import axios from 'axios';
import {decryptData, retrieveData, storeData} from '../../utils';

const axiosInstance = axios.create({
  baseURL: `https://dummyjson.com/auth/`,
});

interface AccountProps {
  navigation: any;
}

const Account: React.FC<AccountProps> = ({navigation}) => {
  const {
    container,
    backgroundStyles,
    usernameStyles,
    profileImageWrapper,
    profileImage,
    contentWrapper,
  } = styles;
  const [isLoading, setIsloading] = useState(false);

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
        console.log('req inc token', decryptedAccessToken);
        config.headers.Authorization = `Bearer ${decryptedAccessToken}`;
      }

      return config;
    },
    error => {
      console.log('req', error);
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    response => {
      // Handle successful responses
      return response;
    },
    async error => {
      // Handle error responses
      const originalRequest = error.config;

      console.log('original request', error);

      // // Check if the error is due to an expired token
      // if (error.response.status === 401 && !originalRequest._retry) {
      //   originalRequest._retry = true;

      //   try {
      //     // Refresh the access token
      //     const refreshToken = await retrieveData('refresh_token');
      //     if (refreshToken) {
      //       const decryptedRefreshToken = await decryptData(
      //         'refresh_token',
      //         refreshToken,
      //       );
      //       console.log('refresh response', decryptedRefreshToken);
      //       try {
      //         const response = await axiosInstance.post('refresh', {
      //           decryptedRefreshToken,
      //         });
      //         // Update the access token in AsyncStorage
      //         await storeData('accessToken', response.data.accessToken);
      //       } catch (error) {
      //         console.log('error refresh', error);
      //       }
      //     }

      //     // Retry the original request with the new access token
      //     return axiosInstance(originalRequest);
      //   } catch (refreshError) {
      //     // Handle refresh token error
      //     console.error('Error refreshing token:', refreshError);
      //     return Promise.reject(error);
      //   }
      // }

      return Promise.reject(error);
    },
  );

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsloading(true);
      try {
        const response = await axiosInstance.get('/me');
        console.log('res', response.data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      } finally {
        setIsloading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <Header navigation={navigation}>
      <View style={container}>
        <View style={backgroundStyles} />
        <Text style={usernameStyles}>Prabin Karki</Text>
        <View style={profileImageWrapper}>
          <Image source={IMAGE_PATH.PROFILE} style={profileImage} />
        </View>
        <View style={contentWrapper}>
          <TouchableInputs
            icon={'person-outline'}
            value="Prabin Karki"
            onPress={() => {}}
          />
          <TouchableInputs
            icon={'mail-outline'}
            value="PrabinKarki4296@gmail.com"
            onPress={() => {}}
          />
          <TouchableInputs
            icon={'phone-portrait-outline'}
            value="9811920427"
            onPress={() => {
              Linking.openURL('tel:9811920427');
            }}
          />
          <TouchableInputs
            icon={'eye-off-outline'}
            value="xxxxxxxxxxxx"
            onPress={() => {}}
          />

          <PlainButton
            containerStyle={{
              marginHorizontal: horizontalSpace(15),
              height: heightPixel(50),
              marginVertical: verticalSpace(50),
              borderRadius: verticalSpace(10),
            }}
            textStyle={{
              color: COLORS.WHITE,
            }}>
            Edit profile
          </PlainButton>
        </View>
      </View>
      <Loader isLoading={isLoading} />
    </Header>
  );
};

export default Account;
