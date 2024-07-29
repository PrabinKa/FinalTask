import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from '../../components';

interface PostProps {
  navigation: any;
}

const Post: React.FC<PostProps> = ({navigation}) => {
  return (
    <Header navigation={navigation}>
      <View>
        <Text>Post</Text>
      </View>
    </Header>
  );
};

export default Post;

const styles = StyleSheet.create({});
