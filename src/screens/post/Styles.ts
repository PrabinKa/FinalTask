import {StyleSheet, Dimensions} from 'react-native';
import {
  COLORS,
  horizontalSpace,
  verticalSpace,
  fontSize,
} from '../../constants';

const {width: screenWidth} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  postContainer: {
    width: screenWidth,
    paddingHorizontal: horizontalSpace(15),
  },
  postWrapper: {
    backgroundColor: COLORS.WHITE,
    marginTop: verticalSpace(20),
    marginBottom: verticalSpace(10),
    paddingVertical: verticalSpace(10),
    paddingHorizontal: horizontalSpace(5),
    borderRadius: 5,
    elevation: 1,
  },
  postTitle: {
    fontSize: fontSize(18),
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  postDescription: {
    fontSize: fontSize(16),
    fontWeight: '500',
    color: COLORS.TEXT_PRIMARY,
  },
  reactionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalSpace(10),
    paddingTop: verticalSpace(5),
    borderTopColor: '#888',
    borderTopWidth: 0.5,
  },
  reactionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsStyles: {
    fontSize: fontSize(15),
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  viewsTextStyles: {
    fontSize: fontSize(14),
    color: '#888',
    fontWeight: 'bold',
    marginLeft: 3,
  },
});
