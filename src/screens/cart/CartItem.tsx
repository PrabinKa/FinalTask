import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from './Button';
import {
  COLORS,
  horizontalSpace,
  verticalSpace,
  heightPixel,
  fontSize,
} from '../../constants';
import {priceAfterDiscount} from '../../utils';
import {ProductWithQuantity} from '../../types/ProductTypes';
import {useAppDispatch} from '../../redux/hooks/hooks';
import {
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
} from '../../redux/slices/CartSlice';

interface CartItemProps {
  data: ProductWithQuantity[];
}

const CartItem = ({data}: CartItemProps) => {
  const {
    cartProductContainer,
    thumbnailWrapper,
    thumbnailStyles,
    productTitleStyles,
    titleAndRemoveContainer,
    productPriceStyles,
    stockQuantityStyles,
    rowSpaceBetween,
    quantityStyles,
  } = styles;

  const dispatch = useAppDispatch();

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(_, index) => `products${index}`}
      renderItem={({item, index}) => {
        return (
          <View style={cartProductContainer}>
            <View style={thumbnailWrapper}>
              <Image source={{uri: item.thumbnail}} style={thumbnailStyles} />
            </View>
            <View style={{flex: 1, marginLeft: horizontalSpace(10)}}>
              <View style={titleAndRemoveContainer}>
                <View style={{width: '90%'}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={productTitleStyles}>
                    {item.title}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(removeProductFromCart(item));
                  }}>
                  <Ionicons name="close" size={25} color={COLORS.ERROR} />
                </TouchableOpacity>
              </View>
              <Text
                style={stockQuantityStyles}>{`In Stock: ${item.stock}`}</Text>
              <View style={rowSpaceBetween}>
                <Text style={productPriceStyles}>{`$${priceAfterDiscount(
                  item.discountPercentage,
                  item.price,
                ).toFixed(2)}`}</Text>
                <View style={[rowSpaceBetween, {width: '50%'}]}>
                  <Button
                    icon={'remove-outline'}
                    onPress={() => {
                      dispatch(decreaseQuantity(item));
                    }}
                  />
                  <Text style={quantityStyles}>{item.quantity}</Text>
                  <Button
                    icon={'add-sharp'}
                    onPress={() => {
                      dispatch(increaseQuantity(item));
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartProductContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: verticalSpace(10),
    paddingBottom: verticalSpace(10),
    borderBottomColor: COLORS.WHITE,
    borderBottomWidth: 2,
  },
  thumbnailWrapper: {
    height: heightPixel(120),
    width: heightPixel(120),
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalSpace(20),
  },
  thumbnailStyles: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: verticalSpace(20),
  },
  productTitleStyles: {
    fontSize: fontSize(20),
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  titleAndRemoveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPriceStyles: {
    fontSize: fontSize(22),
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '700',
  },
  stockQuantityStyles: {
    fontSize: 18,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '400',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityStyles: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
});
