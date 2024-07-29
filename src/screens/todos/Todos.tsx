import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from '../../components';

interface TodosProps {
  navigation: any;
}

const Todos: React.FC<TodosProps> = ({navigation}) => {
  return (
    <Header navigation={navigation}>
      <View>
        <Text>Todos</Text>
      </View>
    </Header>
  );
};

export default Todos;

const styles = StyleSheet.create({});
