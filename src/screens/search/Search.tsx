import React, {useState} from 'react';
import {
  FlatList,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Header, UserInputs, Product} from '../../components';
import {COLORS, verticalSpace} from '../../constants';
import {searchProductFromApi} from '../../services/SearchProducts';
import {ProductInterface} from '../../types/ProductTypes';
import {styles} from './Styles';

const {width: screenWidth} = Dimensions.get('window');

interface SearchProps {
  navigation: any;
}

const Search: React.FC<SearchProps> = ({navigation}) => {
  const {container, columnWrapper, dummyLine} = styles;
  const [searchResults, setSearchResults] = useState<ProductInterface[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [key, setKey] = useState(Math.random().toString());
  const [isLoading, setIsLoading] = useState(false);

  //fetch data from api for search
  const fetchSearchData = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await searchProductFromApi(query);
      const data = await response.json();
      setSearchResults(data.products);
    } catch (error) {
      console.error('Error fetching search data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //debouncing for search
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            {isLoading && (
              <ActivityIndicator size={'large'} color={COLORS.ERROR} />
            )}
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
        <View style={dummyLine} />
      </Header>
    </TouchableWithoutFeedback>
  );
};

export default Search;
