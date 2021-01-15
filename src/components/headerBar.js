import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {THEME} from '../styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

export const HeaderBar = () => {
  return (
    <View style={styles.header}>
      <ImageBackground
        source={require('../assets/images/HeadImage_3x.png')}
        style={styles.image}
        imageStyle={{borderBottomRightRadius: 250}}>
        <View
          style={{
            backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
            borderBottomRightRadius: 250,
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
          }}></View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    resizeMode: 'cover',
    flex: 1,
    height: '100%',
    width: '100%',
  },

  header: {
    width: '120%',
    height: Dimensions.get('window').height / 4.5,
  },
  Logo: {
    height: 66,
    width: 66,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 15,
  },
  HeadImage: {width: 424, height: 165, shadowOpacity: 10},
  TitleText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 28,
    textAlign: 'left',
    color: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  MajorName: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 18,
    textAlign: 'left',
    color: '#f2f2f2',
    paddingHorizontal: 30,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
