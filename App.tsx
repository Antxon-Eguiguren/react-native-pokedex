import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {TabsNavigator} from './src/navigator/TabsNavigator';

export const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <TabsNavigator />
    </NavigationContainer>
  );
};
