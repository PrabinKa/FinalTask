import React, {useRef, useState, useContext} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Pressable,
  TextInput as TextInputType,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ToastAndroid,
} from 'react-native';

import {
  COLORS,
  heightPixel,
  IMAGE_PATH,
  verticalSpace,
  STRINGS,
} from '../../constants';
import {
  UserInputs,
  ButtonWithIcon,
  PlainButton,
  Loader,
  ErrorModal,
} from '../../components';

import {styles} from './Styles';
import {login} from '../../services/LoginService';
import {AppContext} from '../../context/AppContext';
import {encryptData, storeData} from '../../utils';

const LoginScreen = () => {
  const {
    container,
    logoWrapper,
    backgroundImageStyles,
    logoStyles,
    contentWrapper,
    forgotPasswordText,
    pressedItem,
    orLoginText,
    buttonsWrapper,
    accountTextWrapper,
    haveAccountText,
    createAccountText,
  } = styles;

  const usernameRef = useRef<TextInputType>(null);
  const passwordRef = useRef<TextInputType>(null);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {tokenHandler} = useContext(AppContext);

  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: '',
  });

  const handlePasswordSecureText = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const closeErrorModal = () => {
    setIsErrorVisible(!isErrorVisible);
  };

  const loginHandler = async () => {
    const {username, password} = loginCredentials;

    setIsLoading(true);

    try {
      await login(username, password).then(async response => {
        if (response.data) {
          const {token, refreshToken} = response.data;
          tokenHandler(token);

          const encryptedRefreshToken = encryptData(
            refreshToken,
            'refresh_token',
          );

          await storeData('refresh_token', encryptedRefreshToken);

          ToastAndroid.show('Logged in successfully !', ToastAndroid.SHORT);
        }
      });
    } catch (error: any) {
      const {message} = error.response.data;

      setIsErrorVisible(true);
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={logoWrapper}>
            <Image
              source={IMAGE_PATH.BACKGROUND}
              style={backgroundImageStyles}
            />
            <Image source={IMAGE_PATH.LOGO} style={logoStyles} />
          </View>
          <View style={contentWrapper}>
            <UserInputs
              inputRef={usernameRef}
              icon="person-outline"
              blurOnSubmit={false}
              placeholder="User name"
              returnKeyType="next"
              placeholderTextColor={COLORS.PRIMARY}
              selectionColor={COLORS.PRIMARY}
              containerStyle={{marginTop: verticalSpace(40)}}
              onChangeText={text =>
                setLoginCredentials({...loginCredentials, username: text})
              }
              onSubmitEditing={() => {
                if (passwordRef.current) {
                  passwordRef.current.focus();
                }
              }}
            />
            <UserInputs
              inputRef={passwordRef}
              icon="lock-closed"
              blurOnSubmit={false}
              placeholder="Password"
              secureIcon={'eye-off-outline'}
              onPress={handlePasswordSecureText}
              secureTextEntry={secureTextEntry}
              returnKeyType="done"
              placeholderTextColor={COLORS.PRIMARY}
              selectionColor={COLORS.PRIMARY}
              containerStyle={{marginTop: verticalSpace(20)}}
              onChangeText={text =>
                setLoginCredentials({...loginCredentials, password: text})
              }
            />
            <Pressable style={({pressed}) => pressed && pressedItem}>
              <Text style={forgotPasswordText}>{STRINGS.FORGOT}</Text>
            </Pressable>
            <PlainButton
              containerStyle={{
                height: heightPixel(50),
                marginVertical: verticalSpace(30),
                borderRadius: verticalSpace(10),
              }}
              textStyle={{
                color: COLORS.WHITE,
              }}
              onPress={() => {
                loginHandler();
              }}>
              {STRINGS.SIGN_IN}
            </PlainButton>
            <Text style={orLoginText}>{STRINGS.OR_LOGIN}</Text>
            <View style={buttonsWrapper}>
              <ButtonWithIcon
                // onPress={onGoogleButtonPressed}
                icon={IMAGE_PATH.GOOGLE}
                containerStyle={{
                  backgroundColor: `${COLORS.PRIMARY}30`,
                  flex: 1,
                  marginRight: 10,
                  borderRadius: 10,
                }}
                textStyle={{color: COLORS.TEXT_PRIMARY}}>
                {STRINGS.GOOGLE}
              </ButtonWithIcon>
              <ButtonWithIcon
                icon={IMAGE_PATH.FACEBOOK}
                containerStyle={{
                  backgroundColor: `${COLORS.PRIMARY}30`,
                  flex: 1,
                  marginLeft: 10,
                  borderRadius: 10,
                }}
                textStyle={{color: COLORS.TEXT_PRIMARY}}>
                {STRINGS.FACEBOOK}
              </ButtonWithIcon>
            </View>
            <View style={accountTextWrapper}>
              <Text style={haveAccountText}>{STRINGS.HAVE_ACOOUNT}</Text>
              <Pressable
                onPress={() => {}}
                style={({pressed}) => pressed && pressedItem}>
                <Text style={createAccountText}>{STRINGS.CREATE_ACCOUNT}</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Loader isLoading={isLoading} />
      <ErrorModal
        isVisible={isErrorVisible}
        message={errorMessage}
        onClose={closeErrorModal}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
