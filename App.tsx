import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import RootNav from './src/navigation/root/RootNav';
import {COLORS} from './src/constants';
import ContextProvider from './src/context/AppContext';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <ContextProvider>
        <StatusBar backgroundColor={COLORS.PRIMARY} />
        <RootNav />
      </ContextProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
