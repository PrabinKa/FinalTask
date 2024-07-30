import React, {useState} from 'react';
import {FlatList, StyleSheet, View, Dimensions} from 'react-native';
import {Header, UserInputs, Product} from '../../components';
import {
  COLORS,
  horizontalSpace,
  verticalSpace,
  heightPixel,
} from '../../constants';
import {searchProductFromApi} from '../../services/SearchProducts';
import {ProductInterface} from '../../types/ProductTypes';

const {width: screenWidth} = Dimensions.get('window');

interface SearchProps {
  navigation: any;
}

const Search: React.FC<SearchProps> = ({navigation}) => {
  const {container, columnWrapper} = styles;
  const [searchResults, setSearchResults] = useState<ProductInterface[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [key, setKey] = useState(Math.random().toString());

  const fetchSearchData = async (query: string) => {
    try {
      const response = await searchProductFromApi(query);
      const data = await response.json();
      setSearchResults(data.products);
    } catch (error) {
      console.error('Error fetching search data:', error);
    }
  };

  const handleSearch = (text: string) => {
    // Clear the previous debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new debounce timeout
    const timeout = setTimeout(() => {
      fetchSearchData(text);
    }, 500); // Debounce delay of 500 milliseconds

    setDebounceTimeout(timeout);
  };

  return (
    <Header navigation={navigation}>
      <View style={container}>
        <UserInputs
          icon="search-sharp"
          placeholder="Search products.."
          placeholderTextColor={COLORS.PRIMARY}
          selectionColor={COLORS.PRIMARY}
          containerStyle={{marginTop: verticalSpace(40)}}
          onChangeText={handleSearch}
        />
        <View>
          <FlatList
            key={key}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={searchResults}
            keyExtractor={(item, index) => `${item.id}products${index}`}
            columnWrapperStyle={columnWrapper}
            renderItem={({item}) => {
              return (
                <Product
                  item={item}
                  navigation={navigation}
                  containerStyle={{
                    width: screenWidth / 2.5,
                    marginTop: verticalSpace(20),
                  }}
                />
              );
            }}
          />
        </View>
      </View>
      <View
        style={{
          height: heightPixel(100),
          backgroundColor: COLORS.BACKGROUND,
          zIndex: -1,
        }}
      />
    </Header>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: horizontalSpace(15),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: verticalSpace(10),
  },
  separator: {
    height: 20,
  },
});
