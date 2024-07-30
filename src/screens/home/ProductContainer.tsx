import React from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import {verticalSpace, horizontalSpace} from '../../constants';
import {ProductInterface} from '../../types/ProductTypes';
import {Product} from '../../components';

const {width: screenWidth} = Dimensions.get('window');

interface ProductContainerProps {
  data: ProductInterface[];
  navigation: any;
}

const ProductContainer: React.FC<ProductContainerProps> = ({
  data,
  navigation,
}) => {
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
      renderItem={({item}) => {
        return (
          <Product
            item={item}
            navigation={navigation}
            containerStyle={{width: screenWidth / 2.2}}
          />
        );
      }}
    />
  );
};

export default ProductContainer;
