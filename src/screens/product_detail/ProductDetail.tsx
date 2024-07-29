import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  ToastAndroid,
} from 'react-native';
import {
  COLORS,
  fontSize,
  heightPixel,
  horizontalSpace,
  verticalSpace,
  widthPixel,
} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Paginator from './Paginator';
import {PlainButton, ErrorModal} from '../../components';
import {useAppSelector} from '../../redux/hooks/hooks';
import {useAppDispatch} from '../../redux/hooks/hooks';
import {addToCart} from '../../redux/slices/CartSlice';
import {priceAfterDiscount} from '../../utils';

interface ProductDetailProps {
  route: any;
  navigation: any;
}

const {height, width: screenWidth} = Dimensions.get('window');

const ProductDetail: React.FC<ProductDetailProps> = ({route, navigation}) => {
  const item = route.params;
  const dispatch = useAppDispatch();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const {productDetails} = useAppSelector(state => state.product);
  const {cartProducts} = useAppSelector(state => state.cart);
  const [outOfStock, setOutOfStock] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const {
    container,
    buttonStyles,
    paginatorWrapper,
    detailsContainer,
    productTitle,
    ratingStockWrapper,
    ratingContainer,
    ratingStyles,
    stockStatusWrapper,
    stockStatusStyles,
    descriptionStyles,
    bottomContainer,
    originalPriceStyles,
    finalPriceStyles,
  } = styles;

  const toggleMessageModal = () => {
    setShowMessage(!showMessage);
  };

  const addToCartHandler = () => {
    const isAddedToCart = cartProducts.some(cart => {
      return cart.title === item.title;
    });

    if (isAddedToCart) {
      setShowMessage(true);
      setOutOfStock(`${item.title} is already in your Cart.`);
    } else {
      if (item.stock >= 1) {
        const decreseStock = item.stock - 1;
        const newItem = {...item, stock: decreseStock, quantity: 1};
        dispatch(addToCart(newItem));
        ToastAndroid.show('Added to cart successfully !', ToastAndroid.SHORT);
      }

      if (item.stock <= 0) {
        setShowMessage(true);
        setOutOfStock(`${item.title} is out of stock.`);
      }
    }
  };

  return (
    <SafeAreaView style={container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          style={buttonStyles}>
          <Ionicons
            name="chevron-back-sharp"
            size={40}
            color={COLORS.TEXT_PRIMARY}
          />
        </TouchableOpacity>
        {productDetails && (
          <Animated.FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            data={productDetails.images}
            keyExtractor={(_, index) =>
              `images${Number.parseInt(`${Math.random() * 100}`)}`
            }
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {x: scrollX},
                  },
                },
              ],
              {useNativeDriver: false},
            )}
            renderItem={({item, index}) => {
              // console.log('imageUri', productDetails);
              return (
                <View
                  style={{
                    height: heightPixel(350),
                    width: screenWidth,
                    backgroundColor: COLORS.BACKGROUND,
                    paddingVertical: verticalSpace(20),
                  }}>
                  <Image
                    source={{uri: item}}
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              );
            }}
          />
        )}
        <View style={paginatorWrapper}>
          <Paginator data={item.images} scrollX={scrollX} />
        </View>
      </View>
      <View style={detailsContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={productTitle}>
          {productDetails.title}
        </Text>
        <View style={ratingStockWrapper}>
          <View style={ratingContainer}>
            <Ionicons name="star" size={20} color={'#FFCB00'} />
            <Text style={ratingStyles}>{productDetails.rating}</Text>
          </View>
          <View style={stockStatusWrapper}>
            <Text style={stockStatusStyles}>
              {productDetails.availabilityStatus}
            </Text>
          </View>
        </View>
        <Text
          style={[
            ratingStyles,
            {marginTop: verticalSpace(20)},
          ]}>{`Stock: ${item.stock}`}</Text>
        <Text style={descriptionStyles}>{productDetails.description}</Text>
        <View style={bottomContainer}>
          <View>
            <Text
              style={originalPriceStyles}>{`$${productDetails.price}`}</Text>
            <Text style={finalPriceStyles}>{`$${priceAfterDiscount(
              item.discountPercentage,
              item.price,
            ).toFixed(2)}`}</Text>
          </View>
          <PlainButton
            onPress={() => {
              addToCartHandler();
            }}
            containerStyle={{
              height: heightPixel(50),
              width: '50%',
              marginVertical: verticalSpace(30),
              borderRadius: verticalSpace(10),
            }}
            textStyle={{
              color: COLORS.WHITE,
            }}>
            Add to Cart
          </PlainButton>
        </View>
      </View>
      <ErrorModal
        message={outOfStock}
        isVisible={showMessage}
        onClose={toggleMessageModal}
      />
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
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
