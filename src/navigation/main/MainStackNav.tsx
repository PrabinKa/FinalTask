import {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from '../drawer/DrawerNav';
import {AppContext} from '../../context/AppContext';
import {LoginScreen, ProductDetail} from '../../screens';

const Stack = createStackNavigator();

const MainStackNav = () => {
  const {token} = useContext(AppContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {token ? (
        <Stack.Group>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Group>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default MainStackNav;
