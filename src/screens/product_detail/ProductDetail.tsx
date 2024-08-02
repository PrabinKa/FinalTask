import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  ToastAndroid,
} from 'react-native';
import {COLORS, heightPixel, verticalSpace, STRINGS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Paginator from './Paginator';
import {PlainButton, ErrorModal} from '../../components';
import {useAppSelector} from '../../redux/hooks/hooks';
import {useAppDispatch} from '../../redux/hooks/hooks';
import {addToCart} from '../../redux/slices/CartSlice';
import {priceAfterDiscount} from '../../utils';
import {styles} from './Styles';

interface ProductDetailProps {
  route: any;
  navigation: any;
}

const {width: screenWidth} = Dimensions.get('window');

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

  //add to cart
  const addToCartHandler = () => {
    //checks product is already added to cart or not
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
              `images${Number.parseInt(`${Math.random() * 100}${index}`)}`
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
            {STRINGS.ADD_TO_CART}
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
