import React from 'react';
import {View, Text, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import {ContactStackNavigator, MainStackNavigator} from './src/navigator';
import {
  getUniqueId,
  getManufacturer,
  getApplicationName,
  getDeviceName,
  getAndroidId,
  getLastUpdateTime,
} from 'react-native-device-info';
import RNLocation from 'react-native-location';
import * as Sentry from '@sentry/react-native';
import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './src/TabNavigator';
import BottomNavigator from './src/Navigation/ButtomNavigator';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
// Sentry.init({
//   dsn:
//     'https://d426d2cc424e4a1e88180fe4b61b629d@o449610.ingest.sentry.io/5432874',
//   enableNative: false,
// });

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

export default class App extends React.Component {
  state = {
    isSignedIn: false,
  };
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.setState({
        isSignedIn: true,
      });
    }
    console.log('Authentication Token:', token);
    const DeviceID = await getUniqueId();
    const DeviceManufacturer = await getManufacturer();
    const DeviceName = await getDeviceName();
  }

  render() {
    if (this.state.isLoading == true) {
      return (
        <NavigationContainer>
          {this.state.isSignedIn ? (
            <MainStackNavigator />
          ) : (
            <ContactStackNavigator />
          )}
        </NavigationContainer>
      );
    }
  }
}
