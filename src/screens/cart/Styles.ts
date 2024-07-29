import { StyleSheet } from "react-native";
import { COLORS, fontSize, verticalSpace, horizontalSpace } from "../../constants";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.BACKGROUND,
    },
    titleStyles: {
      fontSize: fontSize(24),
      color: COLORS.TEXT_PRIMARY,
      fontWeight: '600',
      alignSelf: 'center',
      marginVertical: verticalSpace(15),
    },
    totalPriceWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: verticalSpace(20),
      paddingHorizontal: horizontalSpace(15),
    },
    totalPriceText: {
      fontSize: fontSize(20),
      fontWeight: '600',
      color: '#888',
    },
    totalPriceValue: {
      fontSize: fontSize(24),
      fontWeight: '700',
      color: COLORS.TEXT_PRIMARY,
    },
  });