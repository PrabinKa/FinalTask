import React, {ReactNode} from 'react';
import {ImageProps} from 'react-native';
import {
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Image,
} from 'react-native';
import {heightPixel, horizontalSpace} from '../../constants';

interface ButtonWithIconProps {
  children: ReactNode;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ImageProps;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  children,
  onPress,
  containerStyle,
  textStyle,
  icon,
}) => {
  const {container, buttonText, imageStyles} = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[container, containerStyle]}>
      <Image source={icon} style={imageStyles} />
      <Text style={[buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: heightPixel(50),
    borderRadius: heightPixel(30),
    paddingHorizontal: horizontalSpace(10),
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '700',
  },
  imageStyles: {
    height: 30,
    width: 30,
  },
});
