import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {heightPixel, horizontalSpace, fontSize, COLORS} from '../../constants';

interface TouchableInputsProps {
  icon: string;
  value: string | number;
  onPress?: () => void;
}

const TouchableInputs = ({icon, value, onPress}: TouchableInputsProps) => {
  const {wrapper, textStyles} = styles;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.3} style={wrapper}>
      <Ionicons name={icon} size={25} color={COLORS.PRIMARY} />
      <Text style={textStyles}>{value}</Text>
    </TouchableOpacity>
  );
};

export default TouchableInputs;

const styles = StyleSheet.create({
  wrapper: {
    height: heightPixel(70),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: horizontalSpace(15),
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  textStyles: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: fontSize(22),
    marginLeft: horizontalSpace(30),
  },
});
