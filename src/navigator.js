import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, Alert} from 'react-native';
import WelcomeScreen from './screen/WelcomeScreen';
import LoginScreen from './screen/LoginScreen';
import MainScreen from './screen/User/MainScreen';
import TimeTableScreen from './screen/User/TimeTableScreen';
import StudentCardScreen from './screen/User/StudentCardScreen';
import StudentRecordScreen from './screen/User/StudentRecordScreen'
import {isAuthen} from './api/authen';
import AsyncStorage from '@react-native-community/async-storage';
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
   }catch(e) {
    console.log("Error_TOKEN:",e)
   }
  }
  useEffect(() => {
    checkToken();
  });
  if (isLoggedIn == true) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
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
