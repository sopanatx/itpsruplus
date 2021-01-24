import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {HeaderBar} from '../../components/headerBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT_FAMILY, FONT_BOLD} from '../../styles';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';

async function regexClassID() {
  const jwtToken = await AsyncStorage.getItem('token');
  const decodeJWT = await jwt_decode(jwtToken);
  const studentID = decodeJWT.username;

  return studentID;
}
export default class StudentCardScreen extends React.Component {
  state = {
    studentID: '',
  };
  async componentDidMount() {
    this.setState({studentID: await regexClassID()});
  }
  render() {
    return (
      <SafeAreaView>
        <HeaderBar />

        <View style={{alignItems: 'center', margin: 50}}>
          <Button
            buttonStyle={{
              width: wp('70%'),
              height: 70,
              backgroundColor: '#ec5858',
            }}
            title="ชำระค่าเทอม"
            titleStyle={{fontFamily: FONT_FAMILY, fontSize: 18}}
            onPress={() =>
              Alert.alert(
                'ยืนยันการเชื่อมต่อข้อมูล',
                'เนื่องจากมีการล็อกอินบนอุปกรณ์ใหม่ ท่านจำเป็นต้องกรอกข้อมูลส่วนตัวใหม่อีกครั้ง \nเนื่องจากระบบชำระค่าเทอมจำเป็นต้องอ้างอิงข้อมูลจากทะเบียนของมหาวิทยาลัย \nท่านจำเป็นต้องกรอกข้อมูล \nรหัสนักศึกษา และ รหัสผ่านที่่ใช้กับมหาวิทยาลัย.',
              )
            }
          />
          <Button
            buttonStyle={{
              width: wp('70%'),
              height: 70,
              backgroundColor: '#fd8c04',
              marginTop: 10,
            }}
            title="สแกน QR Code"
            titleStyle={{fontFamily: FONT_FAMILY, fontSize: 18}}
            disabled={true}
          />
          <Button
            buttonStyle={{
              width: wp('70%'),
              height: 70,
              backgroundColor: '#f5b461',
              marginTop: 10,
            }}
            title="บัตรนักศึกษา"
            titleStyle={{fontFamily: FONT_FAMILY, fontSize: 18}}
          />
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
