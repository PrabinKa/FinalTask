import {StyleSheet} from 'react-native';
import {
  COLORS,
  heightPixel,
  horizontalSpace,
  fontSize,
  verticalSpace,
} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  logoWrapper: {
    height: heightPixel(280),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImageStyles: {
    height: heightPixel(200),
    width: heightPixel(200),
    tintColor: COLORS.PRIMARY,
  },
  logoStyles: {
    height: heightPixel(100),
    width: heightPixel(100),
    position: 'absolute',
  },
  contentWrapper: {
    paddingHorizontal: horizontalSpace(20),
  },
  forgotPasswordText: {
    color: COLORS.ERROR,
    fontSize: fontSize(18),
    fontWeight: '500',
    textAlign: 'right',
    marginTop: verticalSpace(10),
  },
  pressedItem: {
    opacity: 0.5,
  },
  orLoginText: {
    fontSize: fontSize(18),
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalSpace(60),
  },
  accountTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalSpace(50),
  },
  haveAccountText: {
    fontSize: fontSize(18),
    color: COLORS.TEXT_PRIMARY,
  },
  createAccountText: {
    color: COLORS.SECONDARY,
    fontSize: fontSize(20),
    fontWeight: 'bold',
    marginLeft: 8,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.SECONDARY,
  },
});
