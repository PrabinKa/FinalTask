import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  COLORS,
  heightPixel,
  verticalSpace,
  horizontalSpace,
  fontSize,
} from '../../constants';
import {ProductInterface} from '../../types/ProductTypes';
import {useAppDispatch} from '../../redux/hooks/hooks';
import {setProductDetails} from '../../redux/slices/ProductSlice';

interface ProductProps {
  item: ProductInterface;
  navigation: any;
  containerStyle: StyleProp<ViewStyle>;
}

const Product: React.FC<ProductProps> = ({
  item,
  navigation,
  containerStyle,
}) => {
  const {
    productImageWrapper,
    productImageStyles,
    productDetailsWrapper,
    ratingContainer,
    ratingStyles,
    productNameStyles,
    productPriceStyles,
  } = styles;

  const dispatch = useAppDispatch();

  const onPressHandler = (item: ProductInterface) => {
    dispatch(setProductDetails(item));
    navigation.navigate('ProductDetail', item);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPressHandler(item)}
      style={containerStyle}>
      <View style={productImageWrapper}>
        <Image source={{uri: item.thumbnail}} style={productImageStyles} />
      </View>
      <View style={productDetailsWrapper}>
        <View style={ratingContainer}>
          <Ionicons name="star" size={16} color={'#FFCB00'} />
          <Text style={ratingStyles}>{item.rating}</Text>
        </View>
        <Text style={productNameStyles}>{item.title}</Text>
        <Text
          style={
            productPriceStyles
          }>{`$${item.price} (${item.discountPercentage}% off)`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Product;

const styles = StyleSheet.create({
  productImageWrapper: {
    height: heightPixel(120),
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  productImageStyles: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  productDetailsWrapper: {
    marginVertical: verticalSpace(10),
    paddingHorizontal: horizontalSpace(5),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStyles: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: fontSize(14),
    fontWeight: 'bold',
    marginLeft: 5,
  },
  productNameStyles: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: fontSize(18),
    fontWeight: 'bold',
  },
  productPriceStyles: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: fontSize(18),
    fontWeight: '500',
  },
});
