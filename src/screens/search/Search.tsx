import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from '../../components';

interface SearchProps {
  navigation: any;
}

const Search: React.FC<SearchProps> = ({navigation}) => {
  return (
    <Header navigation={navigation}>
      <View>
        <Text>Search</Text>
      </View>
    </Header>
  );
};

export default Search;

const styles = StyleSheet.create({});
