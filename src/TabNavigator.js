// ./navigation/TabNavigator.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackNavigator, ContactStackNavigator} from './navigator';
const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ติดต่อ" component={MainStackNavigator} />
      <Tab.Screen name="หน้าหลัก" component={ContactStackNavigator} />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
