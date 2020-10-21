import React, {constructor, useContext, useState} from 'react';
import {Component} from 'react';
import {PrimaryButton, RegisterButton} from '../components/button';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  Text,
  ActivityIndicator,
  AsyncStorage,
  SafeAreaView,
} from 'react-native';
import {FONT_FAMILY, FONT_BOLD, THEME} from '../styles';
export default class WelcomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <Image
            style={styles.Logo}
            source={require('../assets/images/IconPlus.png')}
          />
          <Text style={styles.Title}>Information Technology {'\n'} PSRU</Text>
        </View>
        <View style={styles.subView}>
          <Text style={styles.TextInfo}>
            เพื่อการใช้งานได้อย่างสมบูรณ์ {'\n'} จึงจำเป็นต้องเข้าสู่ระบบ
            ด้วยรหัสนักศึกษา {'\n'} ที่ลงทะเบียนแล้วเท่านั้น
            {'\n'} (สามารถใช้ได้กับ น.ศ. ภาคปกติ 4 ปี เท่านั้น)
          </Text>
          <PrimaryButton
            style={{width: '100%'}}
            containerStyle={{width: '100%'}}
            title={'เข้าสู่ระบบ'}
            onPress={() => this.props.navigation.navigate('Login')}
          />
          <RegisterButton
            style={{width: '80%'}}
            containerStyle={{width: '100%'}}
            title={'ลงทะเบียน'}
            onPress={() =>
              Alert.alert('Error!', 'ระบบยังไม่เปิดให้ลงทะเบียนในขณะนี้')
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
    backgroundColor: THEME.DEFAULT_DARK_MODE2,
    resizeMode: 'stretch',
    resizeMode: 'cover',
  },
  mainView: {
    resizeMode: 'cover',
  },
  Logo: {
    width: 122,
    height: 122,
    alignSelf: 'center',
    marginVertical: 80,
  },
  Title: {
    fontSize: 26,
    fontFamily: 'ProductSansRegular',
    textAlign: 'center',
    color: '#F2F2F2',
  },
  subView: {
    backgroundColor: THEME.DEFAULT_DARK_MODE1,
    flex: 2,
    marginTop: 30,
  },
  TextInfo: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
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
});
