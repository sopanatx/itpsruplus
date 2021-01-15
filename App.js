import React from 'react';
import {Alert} from 'react-native';
import {ContactStackNavigator, MainStackNavigator} from './src/navigator';
import {
  getUniqueId,
  getManufacturer,
  getDeviceName,
} from 'react-native-device-info';
import * as Sentry from '@sentry/react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {getVersion} from './src/api/appinfo';
import {ErrorMessage} from './src/constant/Error';
import RNBootSplash from 'react-native-bootsplash';
import NetInfo from '@react-native-community/netinfo';
import JailMonkey from 'jail-monkey';
Sentry.init({
  dsn:
    'https://d426d2cc424e4a1e88180fe4b61b629d@o449610.ingest.sentry.io/5432874',
  enableNative: false,
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
    const getConnection = await NetInfo.fetch();
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        Alert.alert(
          ErrorMessage.TITLE_API_ERROR,
          ErrorMessage.APP_CONNECTION_FAILED,
        );
        RNBootSplash.show();
      }
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });

    const isRooted = await JailMonkey.isJailBroken();
    const isHooked = await JailMonkey.hookDetected();

    if (isRooted) {
      const alert = () => {
        Alert.alert(
          ErrorMessage.TITLE_LOGIN_ERROR,
          ErrorMessage.APP_ROOT_DETECTED,
          [{text: 'OK', onPress: () => alert()}],
        );
      };
      alert();
      RNBootSplash.show();
    }

    if (isHooked) {
      const alert = () => {
        Alert.alert(
          ErrorMessage.TITLE_LOGIN_ERROR,
          ErrorMessage.APP_HOOK_DETECTED,
          [{text: 'OK', onPress: () => alert()}],
        );
      };
      alert();
      RNBootSplash.show();
    }
    const response = await getVersion();
    //console.log(response.json());
    if (!response.ok) {
      Alert.alert(ErrorMessage.TITLE_API_ERROR, ErrorMessage.APP_SERVER_ERROR);
      RNBootSplash.show();
    }

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
    //RNBootSplash.show();
    if (this.state.isLoading == true) {
      RNBootSplash.hide({fade: true}); // fade
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
