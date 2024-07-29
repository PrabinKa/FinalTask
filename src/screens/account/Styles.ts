import {StyleSheet} from 'react-native';
import {COLORS, heightPixel, fontSize, verticalSpace} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.BACKGROUND,
  },
  backgroundStyles: {
    position: 'absolute',
    top: -heightPixel(550),
    width: '130%',
    height: heightPixel(700),
    alignSelf: 'center',
    padding: 20,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: heightPixel(350),
  },
  usernameStyles: {
    color: COLORS.WHITE,
    fontSize: fontSize(30),
    letterSpacing: 1.5,
    alignSelf: 'center',
    marginTop: verticalSpace(20),
  },
  profileImageWrapper: {
    position: 'absolute',
    top: heightPixel(90),
    height: heightPixel(100),
    width: heightPixel(100),
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    borderRadius: heightPixel(50),
    padding: 1,
    alignSelf: 'center',
  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: heightPixel(50),
  },
  contentWrapper: {
    paddingTop: verticalSpace(15),
    marginTop: heightPixel(150),
  },
});
