import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, Loader} from '../../components';
import {COLORS, fontSize, heightPixel, verticalSpace} from '../../constants';
import ImageBanner from './ImageBanner';
import {fetchProducts} from '../../services/FetchProducts';
import ProductContainer from './ProductContainer';
import {AppContext} from '../../context/AppContext';

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({navigation}) => {
  const {container, productListStyles, categoryTextStyles} = styles;
  const [isLoading, setIsLoading] = useState(false);
  const [smartPhoneProducts, setSmartPhoneProducts] = useState();
  const [beautyProducts, setBeautyProducts] = useState();
  const [groceriesProducts, setGroceriesProducts] = useState();
  const {fetchUserDetails} = useContext(AppContext);

  useEffect(() => {
    getAllProducts();
    fetchUserDetails();
  }, []);

  //product lists by category
  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetchProducts();

      if (response) {
        const {smartPhones, beautyProducts, groceries} = response;
        setSmartPhoneProducts(smartPhones.products);
        setBeautyProducts(beautyProducts.products);
        setGroceriesProducts(groceries.products);
      }
    } catch (error) {
      console.log('products fetching error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Header navigation={navigation}>
      <View style={container}>
        <ScrollView>
          <ImageBanner />
          {smartPhoneProducts && (
            <View style={productListStyles}>
              <Text style={categoryTextStyles}>Smart Phones</Text>
              <ProductContainer
                data={smartPhoneProducts}
                navigation={navigation}
              />
            </View>
          )}
          {beautyProducts && (
            <View style={productListStyles}>
              <Text style={categoryTextStyles}>Beauty Products</Text>
              <ProductContainer data={beautyProducts} navigation={navigation} />
            </View>
          )}
          {groceriesProducts && (
            <View style={productListStyles}>
              <Text style={categoryTextStyles}>Groceries</Text>
              <ProductContainer
                data={groceriesProducts}
                navigation={navigation}
              />
            </View>
          )}
          <View style={{height: heightPixel(60)}} />
        </ScrollView>
      </View>
      <Loader isLoading={isLoading} />
    </Header>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.BACKGROUND,
  },
  productListStyles: {
    width: '90%',
    marginVertical: heightPixel(20),
    paddingVertical: verticalSpace(10),
    alignSelf: 'center',
  },
  categoryTextStyles: {
    fontSize: fontSize(22),
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '700',
  },
});
