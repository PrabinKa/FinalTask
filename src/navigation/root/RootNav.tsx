import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStackNav from '../main/MainStackNav';
import {SplashScreen} from '../../screens';

const Stack = createStackNavigator();

const RootNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainStackNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNav;
