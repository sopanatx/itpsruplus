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
} from 'react-native';
import {FONT_FAMILY, FONT_BOLD, THEME} from '../styles';
export default class WelcomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.mainView}>
            <Image
              style={styles.Logo}
              source={require('../assets/images/IconPlus.png')}
            />
            <Text style={styles.Title}>Information Technology {'\n'} PSRU</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.TextInfo}>
              ระบบรองรับการใช้งานสำหรับ {'\n'} นักศึกษาเทคโนโลยีสารสนเทศ ภาคปกติ
              4 ปี เท่านั้น
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
              onPress={() => this.props.navigation.navigate('TOS')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.DEFAULT_LIGHT_MODE2,
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
    color: 'black',
  },
  subView: {
    backgroundColor: THEME.DEFAULT_LIGHT_MODE1,
    flex: 2,
    marginTop: 30,
    height: 415,
  },
  TextInfo: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
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
