import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, Alert} from 'react-native';
import WelcomeScreen from './screen/WelcomeScreen';
import LoginScreen from './screen/LoginScreen';
import MainScreen from './screen/User/MainScreen';
import {isAuthen} from './api/authen';

const Stack = createStackNavigator();
isAuthen();

export default class Navigator extends Component {
  render() {
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
