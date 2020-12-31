import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './screen/WelcomeScreen';
import MainUserScreen from './screen/User/MainScreen';
import TimeTableScreen from './screen/User/TimeTableScreen';
import SettingScreen from './screen/SettingScreen';
import LoginScreen from './screen/LoginScreen';
import StudentRecordScreen from './screen/User/StudentRecordScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import TOSScreen from './screen/TOSScreen';
import RegisterScreen from './screen/RegisterScreen';
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
  headerShown: false,
};

const Tab = createBottomTabNavigator();
const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Main">
        {() => (
          <Tab.Navigator
            automaticallyAdjustContentInsets={false}
            tabBarOptions={{
              activeTintColor: 'orange',
              style: {
                borderTopEndRadius: 15,
                borderTopStartRadius: 15,
              },
            }}>
            <Tab.Screen
              name="Home"
              component={MainUserScreen}
              options={{
                tabBarLabel: 'หน้าหลัก',
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="home-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Time"
              component={TimeTableScreen}
              options={{
                tabBarLabel: 'ตารางเรียน',
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="calendar-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Record"
              component={StudentRecordScreen}
              options={{
                tabBarLabel: 'ผลการเรียน',
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="receipt-outline" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="TOS" component={TOSScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
export {MainStackNavigator, ContactStackNavigator};
