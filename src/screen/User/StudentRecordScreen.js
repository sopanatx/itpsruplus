import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT_FAMILY, FONT_BOLD, THEME} from '../../styles';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';

async function regexClassID() {
  const jwtToken = await AsyncStorage.getItem('token');
  const decodeJWT = await jwt_decode(jwtToken);
  const studentID = decodeJWT.username;

  return studentID;
}
export default class StudentRecordScreen extends React.Component {
  state = {
    studentID: '',
  };
  async componentDidMount() {
    this.setState({studentID: await regexClassID()});
  }
  render() {
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            colors={[THEME.WINTER_HEADER_1, THEME.WINTER_HEADER_2]}
            style={{
              shadowColor: 'rgba(245, 44, 80, 0.38)',
              width: 480,
              height: 165,
              alignSelf: 'center',
            }}>
            <Image
              style={styles.Logo}
              source={require('../../assets/images/WhiteLogo_4x.png')}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 30,
                width: 245,
                marginHorizontal: 110,
                margin: 20,
                fontFamily: 'DBHelvethaicaX-Bd',
              }}>
              Infomation Technology {'\n'}PSRU
            </Text>
          </LinearGradient>
        </View>
        <View style={{alignItems: 'center'}}></View>
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
    color: '#4C4C4C',
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
