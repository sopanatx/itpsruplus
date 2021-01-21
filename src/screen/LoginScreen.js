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
import Spinner from 'react-native-loading-spinner-overlay';
import {PRODUCTION_API} from '../constant/API';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

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
        console.log(err);
        return err;
      });
    if (!response.accessToken) {
      await Alert.alert('Error', response.message);
    } else {
      await AsyncStorage.setItem('token', response.accessToken);
      Alert.alert('แจ้งเตือน', 'เข้าสู่ระบบสำเร็จแล้ว');
      this.props.navigation.pop('Main');
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
