import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, heightPixel} from '../../constants';

interface ButtonPros {
  icon: string;
  onPress: () => void;
}

const Button = ({icon, onPress}: ButtonPros) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        height: heightPixel(40),
        width: heightPixel(40),
        backgroundColor: COLORS.WHITE,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Ionicons name={icon} size={20} color={COLORS.TEXT_PRIMARY} />
    </TouchableOpacity>
  );
};

export default Button;
