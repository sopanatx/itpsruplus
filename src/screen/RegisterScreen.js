import React, {constructor, useContext, useState} from 'react';
import {Component} from 'react';
import {PrimaryButton, RegisterButton} from '../components/button';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import {FONT_FAMILY, FONT_BOLD, THEME} from '../styles';
import {Picker} from '@react-native-picker/picker';
export default class RegisterScreen extends Component {
  state = {
    language: 'java',
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <Text style={styles.Title}>ลงทะเบียนใช้งาน</Text>
          <Text style={styles.TextAlert}>
            กรุณาใช้ ชื่อ-นามสกุลจริง ภาษาไทยเท่านั้น
            {'\n'} และโปรดตรวจสอบความถูกต้องก่อนกดลงทะเบียน
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.InputName}
            // onChangeText={(values) => setStudentId(values)}
            maxLength={255}
            //    keyboardType="numeric"
            placeholder="ชื่อ"
          />
          <TextInput
            style={styles.InputLastName}
            // onChangeText={(values) => setStudentId(values)}
            maxLength={255}
            //  keyboardType="numeric"
            placeholder="สกุล"
          />
          <TextInput
            style={styles.InputLastName}
            // onChangeText={(values) => setStudentId(values)}
            maxLength={255}
            keyboardType="numeric"
            placeholder="รหัสนักศึกษา 10 หลัก"
          />
          <Picker
            selectedValue={this.state.language}
            style={styles.InputLastName}
            itemStyle={{borderRadius: 10}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue})
            }>
            <Picker.Item label="กลุ่มเรียน 1" value="1" />
            <Picker.Item label="กลุ่มเรียน 2" value="2" />
          </Picker>
        </View>
        <Text>
          [DEBUG_REG_STRING] : {'\n'}
          NAME: {'\n'}
          LNAME: {'\n'}
          STD_ID: {'\n'}
          SGROUP: {'\n'}
          SGUADUATION:{'\n'}
          SEDUCATEYEAR: {'\n'}
          SPHONENUM: {'\n'}
          SFACEBOK: {'\n'}
          SLINE:{'\n'}
          SADDRESS: {'\n'}
          SWADDRESS:{'\n'}
        </Text>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.DEFAULT_LIGHT_MODE1,
  },
  mainView: {},
  Logo: {
    width: 122,
    height: 122,
    alignSelf: 'center',
    marginVertical: 80,
  },
  Title: {
    fontSize: 30,
    fontFamily: FONT_BOLD,
    textAlign: 'center',
    //  color: '#F2F2F2',
    margin: 20,
  },
  subView: {
    backgroundColor: THEME.DEFAULT_DARK_MODE1,
    marginTop: 30,
    height: 415,
  },
  TextInfo: {
    fontSize: 20,
    textAlign: 'center',
    //color: 'white',
    fontFamily: FONT_BOLD,
    margin: 30,
    marginVertical: 50,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  TextAlert: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    fontFamily: FONT_BOLD,
    //margin: 30,
    //marginVertical: 50,
  },
  InputName: {
    margin: 10,
    backgroundColor: '#EBE9E9',
    width: 200,
    height: 45,
    alignSelf: 'center',
    borderRadius: 9,
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    textAlign: 'center',
  },
  InputLastName: {
    margin: 10,
    backgroundColor: '#EBE9E9',
    width: 200,
    // height: 45,
    alignSelf: 'center',
    borderRadius: 9,
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    textAlign: 'center',
  },
});
