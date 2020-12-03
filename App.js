import React from 'react';
import {View, Text, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import {MainStackNavigator} from './src/navigator';
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
// Sentry.init({
//   dsn:
//     'https://d426d2cc424e4a1e88180fe4b61b629d@o449610.ingest.sentry.io/5432874',
//   enableNative: false,
// });

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

export default class App extends React.Component {
  async componentDidMount() {
    const DeviceID = await getUniqueId();
    const DeviceManufacturer = await getManufacturer();
    const DeviceName = await getDeviceName();
    await this.initNotification();

    await analytics().logScreenView({
      screen_name: 'MainScreen',
      screen_class: 'AppClass',
    });
  }
  initNotification = async () => {
    await this.setPermission();
    const fcmToken = await messaging().getToken();
    console.log('fcmToken', fcmToken);
    await messaging().registerDeviceForRemoteMessages();
    await saveTokenToDatabase(fcmToken);
    await messaging().onTokenRefresh((fcmToken) => {
      saveTokenToDatabase(fcmToken);
    });
  };

  setPermission = async () => {
    try {
      const enabled = await messaging().hasPermission();
      if (!enabled) {
        await messaging().requestPermission();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  render() {
    return (
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    );
  }
}
