import React, {useState, useContext} from 'react';
import {View, StyleSheet, Image, Alert, Text, TextInput} from 'react-native';
import {authLogin} from '../api/authen';
import {ErrorMessage} from '../constant/Error';
import {SafeAreaContext, SafeAreaView} from 'react-native-safe-area-context';
import {PrimaryButton, RegisterButton} from '../components/button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {FONT_FAMILY, FONT_BOLD, THEME} from '../styles';
const ErrorScreen = (props) => {
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
      <View style={styles.subView}></View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.DEFAULT_DARK_MODE1,
    height: hp('100%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },

  mainView: {
    alignContent: 'center',
  },
  subView: {flex: 2, marginTop: 55, backgroundColor: THEME.DEFAULT_DARK_MODE2},

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
    color: 'white',
  },
  SubTitle: {
    fontSize: 20,
    marginTop: 25,
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
    color: 'white',
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
