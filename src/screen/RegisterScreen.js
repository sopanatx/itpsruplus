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
export default class RegisterScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.mainView}>
            <Image
              style={styles.Logo}
              source={require('../assets/images/IconPlus.png')}
            />
            <Text style={styles.Title}>ระบบลงทะเบียน {'\n'} ITPSRU+</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.TextInfo}>MESSAGE_01</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.DEFAULT_DARK_MODE2,
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
    color: '#F2F2F2',
  },
  subView: {
    backgroundColor: THEME.DEFAULT_DARK_MODE1,
    marginTop: 30,
    height: 415,
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
