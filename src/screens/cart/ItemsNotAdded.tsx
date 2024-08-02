import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, fontSize} from '../../constants';

const ItemsNotAdded = () => {
  const {container, textStyles} = styles;
  return (
    <View style={container}>
      <Text style={textStyles}>Items are not added to Cart yet.</Text>
    </View>
  );
};

export default ItemsNotAdded;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyles: {
    color: COLORS.ERROR,
    fontSize: fontSize(14),
    fontWeight: 'bold',
  },
});
