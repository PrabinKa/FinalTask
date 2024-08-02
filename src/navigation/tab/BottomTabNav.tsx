import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {ParamListBase} from '@react-navigation/routers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home, Search, Cart, Account} from '../../screens';
import {COLORS, heightPixel} from '../../constants';

type BottomTabNavProps = {
  route: RouteProp<ParamListBase, 'Product'>;
  navigation: any;
};

const Tab = createBottomTabNavigator();

const BottomTabNav: React.FC<BottomTabNavProps> = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.ERROR,
        tabBarInactiveTintColor: COLORS.TEXT_PRIMARY,
        tabBarStyle: {
          backgroundColor: COLORS.BACKGROUND,
          height: heightPixel(60),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
