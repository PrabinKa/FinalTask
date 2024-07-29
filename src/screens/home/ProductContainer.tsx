import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {
  heightPixel,
  verticalSpace,
  fontSize,
  horizontalSpace,
  COLORS,
} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProductInterface, ProductListInterface} from '../../types/ProductTypes';
import {setProductDetails} from '../../redux/slices/ProductSlice';
import {useAppDispatch} from '../../redux/hooks/hooks';

const {width: screenWidth} = Dimensions.get('window');

interface ProductContainerProps {
  data: ProductListInterface;
  navigation: any;
}

const ProductContainer: React.FC<ProductContainerProps> = ({
  data,
  navigation,
}) => {
  const {
    productImageWrapper,
    productDetailsWrapper,
    productImageStyles,
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
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(_, index) => `smart_phone${index}`}
      ItemSeparatorComponent={() => (
        <View style={{width: horizontalSpace(20)}} />
      )}
      contentContainerStyle={{marginVertical: verticalSpace(10)}}
      renderItem={({item, index}) => {
        // console.log('item', item);
        return (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onPressHandler(item)}
            style={{
              width: screenWidth / 2.2,
            }}>
            <View style={productImageWrapper}>
              <Image
                source={{uri: item.thumbnail}}
                style={productImageStyles}
              />
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
      }}
    />
  );
};

export default ProductContainer;

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
