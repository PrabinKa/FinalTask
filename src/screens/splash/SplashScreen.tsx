import React, {useEffect} from 'react';
import {StyleSheet, Text, SafeAreaView, Image} from 'react-native';
import {COLORS, heightPixel, IMAGE_PATH} from '../../constants';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const {container, imageStyles} = styles;

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={container}>
      <Image source={IMAGE_PATH.LOGO} style={imageStyles} />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    height: heightPixel(120),
    width: heightPixel(120),
  },
});
