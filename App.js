import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './src/screen/WelcomeScreen';
import Navigator from './src/navigator';

export default class App extends React.Component {
  render() {
    return <Navigator />;
  }
}
