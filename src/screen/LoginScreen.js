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
import {SafeAreaContext, SafeAreaView} from 'react-native-safe-area-context';
import {PrimaryButton, RegisterButton} from '../components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {FONT_FAMILY, FONT_BOLD, THEME} from '../styles';
import {NativeModules} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
const LoginScreen = (props) => {
  const [studentId, setStudentId] = useState('');
  const [studentPassword, setPassword] = useState('');
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setSpinner(false);
    }, 3000);
  });

  const doLogin = async () => {
    //setSpinner(true);

    if (studentId == '' || studentPassword == '') {
      Alert.alert(
        ErrorMessage.TITLE_LOGIN_ERROR,
        ErrorMessage.TITLE_LOGIN_FIELD_NULL,
        [{text: 'ตกลง'}],
      );
    } else {
      setSpinner(true);
      try {
        const Login = await authLogin(studentId, studentPassword);
        console.log('Login Success');

        if (Login == 201) {
          NativeModules.DevSettings.reload();
          setSpinner(false);
        }
      } catch (err) {
        setSpinner(false);
        console.log(err);
        Alert.alert(
          ErrorMessage.TITLE_LOGIN_FAILED,
          ErrorMessage.LOGIN_FAILED,
          [{text: 'ตกลง'}],
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
        }}>
        <Spinner
          visible={spinner}
          textStyle={{
            fontFamily: FONT_FAMILY,
          }}
          textContent={'กำลังเข้าสู่ระบบ...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Image
          style={styles.Logo}
          source={require('../assets/images/IconPlus.png')}
        />
      </View>
      <View style={styles.subView}>
        <Text style={styles.SubTitle}>รหัสนักศึกษา</Text>
        <TextInput
          style={styles.input}
          onChangeText={(values) => setStudentId(values)}
          maxLength={10}
          keyboardType="numeric"
        />
        <Text style={styles.SubTitle}>รหัสผ่าน</Text>
        <TextInput
          style={styles.input}
          onChangeText={(values) => setPassword(values)}
          secureTextEntry={true}
          maxLength={255}
        />
        <PrimaryButton
          style={{width: '100%'}}
          containerStyle={{width: '80%'}}
          title={'เข้าสู่ระบบ'}
          onPress={() => doLogin(studentId, studentPassword)}
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
};
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
  subView: {flex: 2, marginTop: 55, backgroundColor: THEME.DEFAULT_LIGHT_MODE1},

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
export default LoginScreen;
