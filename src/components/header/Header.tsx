import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, horizontalSpace, fontSize, heightPixel} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

interface HeaderProps {
  children: ReactNode;
  navigation: any;
}

const Header: React.FC<HeaderProps> = ({children, navigation}) => {
  const {container, screenName} = styles;
  const route = useRoute();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={30} color={COLORS.WHITE} />
        </TouchableOpacity>
        <Text style={screenName}>{route.name}</Text>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: heightPixel(60),
    width: width,
    backgroundColor: COLORS.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalSpace(12),
    zIndex: 99
  },
  screenName: {
    marginLeft: horizontalSpace(20),
    fontSize: fontSize(22),
    color: COLORS.WHITE,
    fontWeight: '500',
  },
});
