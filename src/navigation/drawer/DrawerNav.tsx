import React, {useState, useContext} from 'react';
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import BottomTabNav from '../tab/BottomTabNav';
import {Todos, Post} from '../../screens';
import {
  COLORS,
  DRAWER_SCREENS,
  DRAWER_ICONS,
  fontSize,
  heightPixel,
  verticalSpace,
  horizontalSpace,
  IMAGE_PATH,
} from '../../constants';
import {AppContext} from '../../context/AppContext';

const Drawer = createDrawerNavigator();

interface CustomDrawerItemProps {
  icon: ImageProps;
  label: string;
  isFocused?: boolean;
  onPress: () => void;
}

const CustomDrawerItem: React.FC<CustomDrawerItemProps> = ({
  icon,
  label,
  isFocused,
  onPress,
}) => {
  //   console.log('label', label);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        flexDirection: 'row',
        height: heightPixel(45),
        marginBottom: verticalSpace(20),
        alignItems: 'center',
        paddingLeft: horizontalSpace(15),
        borderRadius: 10,
        backgroundColor: isFocused
          ? COLORS.SURFACE
          : label == 'Log Out'
          ? COLORS.ERROR
          : COLORS.WHITE,
      }}
      onPress={onPress}>
      <Image
        source={icon}
        style={{
          width: heightPixel(25),
          height: heightPixel(25),
          tintColor: isFocused
            ? COLORS.WHITE
            : label == 'Log Out'
            ? COLORS.WHITE
            : COLORS.SURFACE,
        }}
      />
      <Text
        style={{
          marginLeft: horizontalSpace(10),
          color: isFocused
            ? COLORS.WHITE
            : label == 'Log Out'
            ? COLORS.WHITE
            : COLORS.SURFACE,
          fontSize: fontSize(18),
          fontWeight: 'bold',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface CustomDrawerContentProps {
  navigation: any;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
  navigation,
}) => {
  const [selectedTab, setSelectedTab] = useState('Product');
  const {tokenHandler, user} = useContext(AppContext);

  console.log('user', user)

  const logoutHandler = () => {
    Alert.alert('Logout !', 'Are you sure, you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => tokenHandler('')},
    ]);
  };

  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{flex: 1}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: horizontalSpace(10),
          paddingTop: verticalSpace(10),
        }}>
        <View>
          {user ? (
            <Image
              source={{uri: user.image}}
              resizeMode="contain"
              style={{
                width: heightPixel(80),
                height: heightPixel(80),
                borderRadius: 40,
              }}
            />
          ) : (
            <Image
              source={IMAGE_PATH.PROFILE}
              resizeMode="contain"
              style={{
                width: heightPixel(80),
                height: heightPixel(80),
                borderRadius: 40,
              }}
            />
          )}
          <View style={{marginLeft: 5, justifyContent: 'center'}}>
            <Text
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontWeight: 'bold',
                fontSize: fontSize(18),
                marginTop: verticalSpace(10),
              }}>
              {user ? `${user.firstName} ${user.lastName}` : `User Name`}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontWeight: 'bold',
                fontSize: fontSize(14),
              }}>
              {user ? `${user.email}` : `dummyUser@gmail.com`}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, marginTop: verticalSpace(40)}}>
          <CustomDrawerItem
            label={DRAWER_SCREENS.product}
            icon={DRAWER_ICONS.product}
            isFocused={selectedTab == DRAWER_SCREENS.product}
            onPress={() => {
              setSelectedTab(DRAWER_SCREENS.product);
              navigation.navigate('Product');
            }}
          />
          <CustomDrawerItem
            label={DRAWER_SCREENS.todo}
            icon={DRAWER_ICONS.todo}
            isFocused={selectedTab == DRAWER_SCREENS.todo}
            onPress={() => {
              setSelectedTab(DRAWER_SCREENS.todo);
              navigation.navigate('Todo');
            }}
          />
          <CustomDrawerItem
            label={DRAWER_SCREENS.post}
            icon={DRAWER_ICONS.post}
            isFocused={selectedTab == DRAWER_SCREENS.post}
            onPress={() => {
              setSelectedTab(DRAWER_SCREENS.post);
              navigation.navigate('Post');
            }}
          />
        </View>
        <View>
          <CustomDrawerItem
            label={DRAWER_SCREENS.logout}
            icon={DRAWER_ICONS.logout}
            onPress={() => {
              logoutHandler();
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.BACKGROUND}}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'front',
          drawerStyle: {
            flex: 1,
            width: '60%',
            paddingRight: horizontalSpace(10),
            backgroundColor: COLORS.BACKGROUND,
          },
          headerShown: false,
        }}
        drawerContent={props => {
          return <CustomDrawerContent navigation={props.navigation} />;
        }}
        initialRouteName="Product">
        <Drawer.Screen name="Product">
          {props => <BottomTabNav {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Todo">
          {props => <Todos {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Post">
          {props => <Post {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default DrawerNavigator;
