import {StyleSheet, Dimensions} from 'react-native';
import {
  COLORS,
  verticalSpace,
  horizontalSpace,
  heightPixel,
  fontSize,
} from '../../constants';

const {width: screenWidth} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  buttonStyles: {
    position: 'absolute',
    top: verticalSpace(20),
    left: horizontalSpace(15),
    height: heightPixel(50),
    width: heightPixel(50),
    backgroundColor: COLORS.WHITE,
    elevation: 2,
    borderRadius: heightPixel(30),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  paginatorWrapper: {
    position: 'absolute',
    bottom: -verticalSpace(55),
    right: '45%',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: horizontalSpace(15),
    elevation: 10,
  },
  productTitle: {
    fontSize: fontSize(28),
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '800',
    marginVertical: verticalSpace(20),
  },
  ratingStockWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    height: heightPixel(40),
    width: heightPixel(90),
    flexDirection: 'row',
    padding: 5,
    borderColor: COLORS.BACKGROUND,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: heightPixel(25),
  },
  ratingStyles: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: fontSize(18),
    fontWeight: '800',
  },
  stockStatusWrapper: {
    padding: 5,
    backgroundColor: COLORS.ERROR,
    borderRadius: 10,
    marginLeft: horizontalSpace(20),
  },
  stockStatusStyles: {
    color: COLORS.WHITE,
    fontSize: fontSize(20),
    fontWeight: '500',
  },
  descriptionStyles: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: fontSize(18),
    fontWeight: '500',
    marginTop: verticalSpace(20),
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: heightPixel(100),
    width: screenWidth,
    backgroundColor: COLORS.BACKGROUND,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  originalPriceStyles: {
    fontSize: fontSize(18),
    color: '#888',
    fontWeight: '700',
  },
  finalPriceStyles: {
    fontSize: fontSize(28),
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '700',
  },
});
