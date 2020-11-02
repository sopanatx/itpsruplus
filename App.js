import React from 'react';
import {View, Text, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import Navigator from './src/navigator';
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
Sentry.init({
  dsn:
    'https://d426d2cc424e4a1e88180fe4b61b629d@o449610.ingest.sentry.io/5432874',
  enableNative: false,
});

async function saveTokenToDatabase(token) {
  // Assume user is already signed in
  const userId = await getAndroidId();

  // Add the token to the users datastore
  try {
    await firestore()
      .collection('Users')
      .doc(userId)
      .update({
        tokens: firestore.FieldValue.arrayUnion(token),
        userId: userId,
      });
  } catch {
    firestore()
      .collection('Users')
      .doc(userId)
      .set({
        tokens: firestore.FieldValue.arrayUnion(token),
        userId: userId,
      })
      .then(() => {
        console.log('Firestore Device Registered!');
      });
  }
}

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
    return <Navigator />;
  }
}
