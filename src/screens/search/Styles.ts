import {StyleSheet} from 'react-native';
import {
  COLORS,
  horizontalSpace,
  verticalSpace,
  heightPixel,
} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: horizontalSpace(15),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: verticalSpace(10),
  },
  dummyLine: {
    height: heightPixel(100),
    backgroundColor: COLORS.BACKGROUND,
    zIndex: -1,
  },
});
