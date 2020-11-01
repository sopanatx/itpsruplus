import React from 'react';
import {View, Text, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Navigator from './src/navigator';
import {
  getUniqueId,
  getManufacturer,
  getApplicationName,
  getDeviceName,
} from 'react-native-device-info';
import RNLocation from 'react-native-location';
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

export default class App extends React.Component {
  async componentDidMount() {
    await this.initNotification();
    console.info(`Device UniqueID: ${await getUniqueId()}`);
    console.info(`Device Manufacturer: ${await getManufacturer()}`);
    console.info(`Application Name: ${await getApplicationName()}`);
    console.info(`Device: ${await getDeviceName()}`);
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
