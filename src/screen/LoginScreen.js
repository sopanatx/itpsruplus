import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Text,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {authLogin} from '../api/authen';
import {ErrorMessage} from '../constant/Error';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PrimaryButton, RegisterButton} from '../components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {FONT_FAMILY, FONT_BOLD, THEME} from '../styles';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {setCredential} from '../api/authen';
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: '',
      studentPassword: '',
      spinner: false,
    };
  }
  _SignInHandler = async () => {
    const {studentId, studentPassword} = this.state;
    const formData = new FormData();
    formData.append('studentId', studentId);
    formData.append('studentPassword', studentPassword);
    this.setState({spinner: true});
    if (studentId == '' || studentPassword == '') {
      this.setState({spinner: false});

      Alert.alert('Error', 'โปรดกรอกข้อมูลการเข้าสู่ระบบให้ครบถ้วน');
    } else {
      const response = await axios
        .post(`https://api.itpsru.in.th/auth/login`, {
          studentId: studentId,
          studentPassword: studentPassword,
        })
        .then((result) => {
          this.setState({spinner: false});
          console.log(result.data);
          return result.data;
        })
        .catch((err) => {
          this.setState({spinner: false});
          return err;
        });
      if (!response.accessToken) {
        this.setState({spinner: false});
        //console.log('ERR_CODE', response.response.status);
        switch (response.response.status) {
          case 400:
            await Alert.alert(
              ErrorMessage.TITLE_LOGIN_ERROR,
              ErrorMessage.TITLE_LOGIN_FAILED,
            );
            break;
          case 401:
            await Alert.alert(
              ErrorMessage.TITLE_LOGIN_ERROR,
              ErrorMessage.LOGIN_FAILED,
            );
            break;
          case 404:
            await Alert.alert(
              ErrorMessage.TITLE_LOGIN_ERROR,
              'ไม่มีบัญชีดังกล่าวในระบบ โปรดตรวจสอบข้อมูลของท่านอีกครั้ง',
            );
            break;
          case 500:
            await Alert.alert(
              ErrorMessage.TITLE_LOGIN_ERROR,
              'เซิร์ฟเวอร์แม่ข่ายไม่สามารถประมวลผลคำขอได้',
            );
            break;
        }
      } else {
        await setCredential(response.accessToken);
        const token = await EncryptedStorage.setItem(
          'accessToken',
          response.accessToken,
        ).then((result) => {
          Alert.alert('แจ้งเตือน', 'เข้าสู่ระบบสำเร็จแล้ว');
          this.props.navigation.replace('Main');
        });
      }
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}>
          {this.state.spinner ? <CustomProgressBar /> : null}
          <Image
            style={styles.Logo}
            source={require('../assets/images/IconPlus.png')}
          />
        </View>
        <View style={styles.subView}>
          <Text style={styles.SubTitle}>รหัสนักศึกษา</Text>
          <TextInput
            style={styles.input}
            onChangeText={(values) => this.setState({studentId: values})}
            maxLength={10}
            keyboardType="numeric"
          />
          <Text style={styles.SubTitle}>รหัสผ่าน</Text>
          <TextInput
            style={styles.input}
            onChangeText={(values) => this.setState({studentPassword: values})}
            secureTextEntry={true}
            maxLength={255}
          />
          <PrimaryButton
            style={{width: '100%'}}
            containerStyle={{width: '80%'}}
            title={'Sign in with ITPSRU ID'}
            onPress={() =>
              this._SignInHandler(
                this.state.studentId,
                this.state.studentPassword,
              )
            }
          />
          <RegisterButton
            style={{width: '50%'}}
            containerStyle={{width: '50%'}}
            title={'ลืมรหัสผ่าน'}
            onPress={() =>
              Alert.alert('Error!', 'ระบบยังไม่เปิดให้ช้งานในขณะนี้')
            }
            disabled={true}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.DEFAULT_LIGHT_MODE2,
    height: hp('100%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
    resizeMode: 'cover',
  },

  mainView: {
    alignContent: 'center',
  },
  subView: {
    flex: 2,
    marginTop: 55,
    backgroundColor: THEME.DEFAULT_LIGHT_MODE1,
  },

  Logo: {
    width: 122,
    height: 122,
    alignSelf: 'center',
    margin: 100,
  },
  Title: {
    margin: -50,
    fontSize: 26,
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
    color: 'black',
  },
  SubTitle: {
    fontSize: 22,
    marginTop: 25,
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    margin: 10,
    backgroundColor: '#EBE9E9',
    width: 244,
    height: 45,
    alignSelf: 'center',
    borderRadius: 18,
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    textAlign: 'center',
  },
  card: {
    shadowColor: '#FFFFFF',
  },
});
const CustomProgressBar = ({visible}) => (
  <Modal onRequestClose={() => null} visible={visible}>
    <View
      style={{
        flex: 1,
        backgroundColor: '#dcdcdc',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{borderRadius: 10, backgroundColor: 'white', padding: 25}}>
        <Text style={{fontSize: 20, fontWeight: '200'}}>
          กำลังเข้าสู่ระบบ กรุณารอสักครู่...
        </Text>
        <ActivityIndicator size="large" color="#FFDE6A" />
      </View>
    </View>
  </Modal>
);
