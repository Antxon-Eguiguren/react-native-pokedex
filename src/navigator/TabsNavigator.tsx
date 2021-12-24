import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackNavigator} from './StackNavigator';
import {Platform} from 'react-native';
import {SearchTabScreen} from './SearchTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'white'}}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5856D6',
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? 0 : 10,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255, 0.95)',
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="list-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchTabScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="search-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
