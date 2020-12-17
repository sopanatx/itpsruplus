import React from 'react';
import {View, StyleSheet, Text, Image, ImageBackground} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {THEME} from '../styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const HeaderBar = () => {
  return (
    <View style={styles.header}>
      <ImageBackground
        source={require('../assets/images/HeadImage_3x.png')}
        style={styles.image}>
        <Image
          style={styles.Logo}
          source={require('../assets/images/WhiteLogo_4x.png')}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            justifyContent: 'center',
            fontFamily: 'DBHelvethaicaX-Bd',
          }}>
          Infomation Technology {'\n'}PSRU
        </Text>
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
    width: 464,
    height: 165,
  },
  Logo: {
    height: 66,
    width: 66,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 15,
  },
  HeadImage: {width: 424, height: 165, shadowOpacity: 10},
  Card: {
    borderRadius: 16,
    width: 366,
    height: 468,
  },
  HelloText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 30,
    textAlign: 'left',
    color: '#f2f2f2',
    paddingVertical: 50,
    padding: 30,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
