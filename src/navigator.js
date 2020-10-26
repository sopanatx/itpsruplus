import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, Alert} from 'react-native';
import WelcomeScreen from './screen/WelcomeScreen';
import LoginScreen from './screen/LoginScreen';
import MainScreen from './screen/User/MainScreen';
import TimeTableScreen from './screen/User/TimeTableScreen';
import StudentCardScreen from './screen/User/StudentCardScreen';
import StudentRecordScreen from './screen/User/StudentRecordScreen';
import SettingScreen from './screen/SettingScreen';
import {isAuthen} from './api/authen';
import AsyncStorage from '@react-native-community/async-storage';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RegisterScreen from './screen/RegisterScreen';
import TOSScreen from './screen/TOSScreen';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Navigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function checkToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token != null) {
        setIsLoggedIn(true);
      }
      console.log({token, isLoggedIn});
    } catch (e) {
      console.log('Error_TOKEN:', e);
    }
  }
  useEffect(() => {
    checkToken();
  });
  if (isLoggedIn == true) {
    return (
      <NavigationContainer>
        <Tab.Navigator barStyle={{backgroundColor: '#393e46'}}>
          <Tab.Screen
            name="Home"
            component={MainScreen}
            options={{
              tabBarLabel: 'หน้าหลัก',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Time"
            component={TimeTableScreen}
            options={{
              tabBarLabel: 'ตารางเรียน',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="calendar"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Card"
            component={StudentCardScreen}
            options={{
              tabBarLabel: 'บัตรนักศึกษา',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="card-account-details"
                  color={color}
                  size={26}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Record"
            component={StudentRecordScreen}
            options={{
              tabBarLabel: 'ผลการเรียน',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="cast-education"
                  color={color}
                  size={26}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Setting"
            component={SettingScreen}
            options={{
              tabBarLabel: 'การตั้งค่า',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="toolbox"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TOS"
            component={TOSScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Time"
            component={TimeTableScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="StudentCard"
            component={StudentCardScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="StudentRecord"
            component={StudentRecordScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
export default Navigator;
