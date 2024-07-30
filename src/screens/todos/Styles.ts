import {StyleSheet, Dimensions} from 'react-native';
import {
  COLORS,
  horizontalSpace,
  verticalSpace,
  heightPixel,
  fontSize,
} from '../../constants';

const {width: screenWidth} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  todoOuterWrapper: {
    width: screenWidth,
    paddingHorizontal: horizontalSpace(15),
  },
  todoContainer: {
    backgroundColor: COLORS.WHITE,
    marginTop: verticalSpace(20),
    marginBottom: verticalSpace(10),
    paddingVertical: verticalSpace(10),
    paddingHorizontal: horizontalSpace(5),
    borderRadius: heightPixel(5),
    elevation: 3,
  },
  todoTitle: {
    fontSize: fontSize(18),
    color: COLORS.SECONDARY,
    fontWeight: '600',
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusStyles: {
    fontSize: fontSize(16),
    fontWeight: '700',
    color: '#888',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
