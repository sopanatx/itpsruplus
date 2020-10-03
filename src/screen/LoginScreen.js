import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  ActivityIndicator,
  SectionList,
} from 'react-native';
import {authLogin} from '../api/authen';
import {ErrorMessage} from '../constant/Error';
import {SafeAreaContext, SafeAreaView} from 'react-native-safe-area-context';
import {PrimaryButton, RegisterButton} from '../components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class LoginScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Image
            style={styles.Logo}
            source={require('../assets/images/IconPlus.png')}
          />
          <Text style={styles.Title}>
            Infomation Technology Major {'\n'} <Text> PSRU </Text>
          </Text>
        </View>
        <View style={styles.subView}>
          <Text style={styles.SubTitle}>Student ID</Text>
          <TextInput
            style={styles.input}
            maxLength={10}
            keyboardType="numeric"
          />
          <Text style={styles.SubTitle}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            maxLength={255}
          />
          <PrimaryButton
            style={{width: '100%'}}
            containerStyle={{width: '80%'}}
            title={'เข้าสู่ระบบ'}
            disabled={true}
          />
          <RegisterButton
            style={{width: '50%'}}
            containerStyle={{width: '50%'}}
            title={'ลืมรหัสผ่าน'}
            onPress={() =>
              Alert.alert('Error!', 'ระบบยังไม่เปิดให้้ใช้งานในขณะนี้')
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: hp('100%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },

  mainView: {
    alignContent: 'center',
  },
  subView: {flex: 2, marginTop: 55, backgroundColor: '#F2F2F2'},

  Logo: {
    width: 122,
    height: 122,
    alignSelf: 'center',
    margin: 100,
  },
  Title: {
    margin: -50,
    fontSize: 26,
    fontFamily: 'ProductSansRegular',
    textAlign: 'center',
  },
  SubTitle: {
    fontSize: 20,
    marginTop: 25,
    fontFamily: 'DBHelvethaicaX-Reg',
    textAlign: 'center',
  },
  input: {
    margin: 10,
    backgroundColor: '#EBE9E9',
    width: 244,
    height: 45,
    alignSelf: 'center',
    borderRadius: 24,
    fontFamily: 'DBHelvethaicaX-Reg',
    fontSize: 30,
    textAlign: 'center',
  },
  card: {
    shadowColor: '#FFFFFF',
  },
});
