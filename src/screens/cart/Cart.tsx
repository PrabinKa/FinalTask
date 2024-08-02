import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useAppSelector} from '../../redux/hooks/hooks';
import {COLORS, verticalSpace, heightPixel, STRINGS} from '../../constants';
import CartItem from './CartItem';
import ItemsNotAdded from './ItemsNotAdded';
import {PlainButton, ErrorModal, Header} from '../../components';
import {styles} from './Styles';

interface CartProps {
  navigation: any;
}

const Cart: React.FC<CartProps> = ({navigation}) => {
  const {container, totalPriceWrapper, totalPriceText, totalPriceValue} =
    styles;

  const {cartProducts, error} = useAppSelector(state => state.cart);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true);
  }, [error]);

  //error modal toggler
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  //calculate total price of all products added to the cart
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (const product of cartProducts) {
      const discountedPrice =
        product.price * (1 - product.discountPercentage / 100);
      const totalProductPrice = discountedPrice * product.quantity;
      totalPrice += totalProductPrice;
    }

    return totalPrice.toFixed(2);
  };

  return (
    <Header navigation={navigation}>
      <View style={container}>
        {cartProducts.length !== 0 && (
          <>
            <View style={{height: '75%'}}>
              <CartItem data={cartProducts} />
            </View>
            <View style={totalPriceWrapper}>
              <Text style={totalPriceText}>Total Price:</Text>
              <Text style={totalPriceValue}>{`$${calculateTotalPrice()}`}</Text>
            </View>
            <PlainButton
              onPress={() => {}}
              containerStyle={{
                height: heightPixel(50),
                width: '50%',
                marginVertical: verticalSpace(10),
                borderRadius: verticalSpace(10),
                alignSelf: 'center',
              }}
              textStyle={{
                color: COLORS.WHITE,
              }}>
              {STRINGS.CHECKOUT}
            </PlainButton>
          </>
        )}
        {error && (
          <ErrorModal
            message={error}
            isVisible={modalVisible}
            onClose={toggleModal}
          />
        )}
        {cartProducts.length == 0 && <ItemsNotAdded />}
      </View>
    </Header>
  );
};

export default Cart;
