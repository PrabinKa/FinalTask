import React, {useEffect, useContext, useState} from 'react';
import {Image, Linking, Text, View, Alert} from 'react-native';
import {Header, PlainButton} from '../../components';
import {
  COLORS,
  heightPixel,
  horizontalSpace,
  IMAGE_PATH,
  verticalSpace,
  STRINGS,
} from '../../constants';
import TouchableInputs from './TouchableInputs';
import {styles} from './Styles';
import {Loader, ErrorModal} from '../../components';
import {AppContext} from '../../context/AppContext';
import axiosInstance from '../../services/axiosInstance';
import {useAppDispatch, useAppSelector} from '../../redux/hooks/hooks';
import {
  userDetailsLoading,
  getUserDetails,
  userDetailsRejected,
} from '../../redux/slices/UserSlice';

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
  const dispatch = useAppDispatch();
  const {isLoading, user, error} = useAppSelector(state => state.user);
  const {tokenHandler} = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchUserDetails();

    if (error) {
      setIsVisible(true);
    }
  }, []);

  //redirects to login screen when error occurs in fetching user details
  const onCloseHandler = () => {
    setIsVisible(!isVisible);
    tokenHandler('');
  };

  const fetchUserDetails = async () => {
    dispatch(userDetailsLoading(true));
    try {
      const response = await axiosInstance.get('/me');

      if (response.data) {
        dispatch(getUserDetails(response.data));
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
      dispatch(
        userDetailsRejected(
          `Error fetching user's details! Retry by logging in again.`,
        ),
      );
    } finally {
      dispatch(userDetailsLoading(false));
    }
  };

  //logout func
  const logoutHandler = () => {
    Alert.alert('Logout !', 'Are you sure, you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => tokenHandler('')},
    ]);
  };

  return (
    <Header navigation={navigation}>
      <View style={container}>
        <View style={backgroundStyles} />
        <Text style={usernameStyles}>
          {user ? `${user.firstName} ${user.lastName}` : `User Name`}
        </Text>
        <View style={profileImageWrapper}>
          {user ? (
            <Image source={{uri: user.image}} style={profileImage} />
          ) : (
            <Image source={IMAGE_PATH.PROFILE} style={profileImage} />
          )}
        </View>
        <View style={contentWrapper}>
          <TouchableInputs
            icon={'person-outline'}
            value={user ? `${user.firstName} ${user.lastName}` : `User Name`}
          />
          <TouchableInputs
            icon={'mail-outline'}
            value={user ? `${user.email}` : `dummyUser@gmail.com`}
            onPress={() => {
              Linking.openURL(`mailto:${user.email}`);
            }}
          />
          <TouchableInputs
            icon={'phone-portrait-outline'}
            value={user ? `${user.phone}` : `123456789`}
            onPress={() => {
              Linking.openURL(`tel:${user.phone}`);
            }}
          />
          <TouchableInputs icon={'eye-off-outline'} value="xxxxxxxxxxxx" />

          <PlainButton
            onPress={logoutHandler}
            containerStyle={{
              marginHorizontal: horizontalSpace(15),
              height: heightPixel(50),
              marginVertical: verticalSpace(50),
              borderRadius: verticalSpace(10),
            }}
            textStyle={{
              color: COLORS.WHITE,
            }}>
            {STRINGS.LOGOUT}
          </PlainButton>
        </View>
      </View>
      <Loader isLoading={isLoading} />
      <ErrorModal
        isVisible={isVisible}
        message={error}
        onClose={onCloseHandler}
      />
    </Header>
  );
};

export default Account;
