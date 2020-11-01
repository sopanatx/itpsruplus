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
} from 'react-native-device-info';
import RNLocation from 'react-native-location';

import * as Sentry from '@sentry/react-native';
Sentry.init({
  dsn:
    'https://d426d2cc424e4a1e88180fe4b61b629d@o449610.ingest.sentry.io/5432874',
  enableNative: false,
});
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

export default class App extends React.Component {
  async componentDidMount() {
    const DeviceID = await getUniqueId();
    const DeviceManufacturer = await getManufacturer();
    const DeviceName = await getDeviceName();
    await this.initNotification();
    await RNLocation.requestPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'fine', // or 'fine'
        rationale: {
          title: 'We need to access your location',
          message:
            'เราต้องขอสิทธิ์ในการเข้าถึงข้อมูลตำแหน่งเพื่อยืนยันว่าท่านเป็นนักศึกษาไอที มรพส จริงหรือไม่',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    });
    RNLocation.configure({
      distanceFilter: 100, // Meters
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      interval: 5000, // Milliseconds
      fastestInterval: 10000, // Milliseconds
      maxWaitTime: 5000, // Milliseconds
      // iOS Only
      activityType: 'other',
      allowsBackgroundLocationUpdates: false,
      headingFilter: 1, // Degrees
      headingOrientation: 'portrait',
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: false,
    });

    RNLocation.getLatestLocation({timeout: 60000}).then((latestLocation) => {
      console.log(latestLocation);
    });
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
