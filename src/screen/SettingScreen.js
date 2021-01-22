import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Alert,
  ImageBackground,
  BackHandler,
} from 'react-native';
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT_FAMILY, FONT_BOLD} from '../styles';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';

async function regexClassID() {
  const jwtToken = await AsyncStorage.getItem('token');
  const decodeJWT = await jwt_decode(jwtToken);
  const studentID = decodeJWT.username;

  return studentID;
}

export default class SettingScreen extends React.Component {
  logout = async () => {
    await AsyncStorage.removeItem('token');
    Alert.alert('ออกจากระบบ', 'คุณแน่ใจแล้วว่าจะออกจากระบบ', [
      {text: 'Cancel'},
      {text: 'OK', onPress: () => BackHandler.exitApp()},
    ]);
  };
  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>การตั้งค่าแอพลิเคชั่น - BETA</Text>
          <Text>App Version: 1.8.0</Text>
          <Button title="ออกจากระบบ" onPress={() => this.logout()} />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'white',
  },

  header: {
    width: 464,
    height: 165,
  },
  Logo: {
    height: 77,
    width: 77,
    left: 17,
    top: 82,
  },
  HeadImage: {width: 424, height: 165, shadowOpacity: 10},
  HeaderText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 30,
    textAlign: 'center',
    margin: 20,
  },
  classRoom: {
    fontFamily: FONT_BOLD,
    fontSize: 24,
    marginHorizontal: 10,
    margin: 2,
    color: 'white',
  },
  subjectName: {
    fontFamily: FONT_BOLD,
    fontSize: 17,
    marginHorizontal: 10,
    margin: 2,
    color: 'white',
  },
  subjectTeacher: {
    fontFamily: FONT_BOLD,
    fontSize: 16,
    marginHorizontal: 10,
    color: 'white',
  },
  Day: {
    fontFamily: FONT_BOLD,
    fontSize: 25,
    marginHorizontal: 10,
    margin: 2,
    color: 'white',
  },
  DebugText: {
    fontFamily: FONT_BOLD,
    fontSize: 12,
    textAlign: 'center',
    color: 'red',
  },
});
