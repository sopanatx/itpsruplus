import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {FONT_FAMILY, FONT_BOLD, THEME} from '../styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const HeaderBar = () => {
  return (
    <View style={styles.header}>
      <LinearGradient
        start={{x: 0, y: 1.2}}
        end={{x: 1, y: 0}}
        colors={[THEME.WINTER_HEADER_1, THEME.WINTER_HEADER_2]}
        style={{
          shadowColor: 'rgba(245, 44, 80, 0.38)',
          width: wp('100%'),
          height: 165,
          alignSelf: 'auto',
          borderBottomRightRadius: 100,
          backgroundColor: 'transparent',
        }}>
        <Image
          style={styles.Logo}
          source={require('../assets/images/WhiteLogo_4x.png')}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            paddingHorizontal: 103,
            padding: 30,
            //paddingVertical: -10,
            fontFamily: 'DBHelvethaicaX-Bd',
          }}>
          Infomation Technology {'\n'}PSRU
        </Text>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    resizeMode: 'cover',
    flex: 1,
    height: '100%',
    width: '100%',
    // backgroundColor: THEME.DEFAULT_DARK_MODE1,
  },

  header: {
    width: 464,
    height: 165,

    //  borderBottomRightRadius: 600,
  },
  Logo: {
    height: 77,
    width: 77,
    left: 17,
    top: 82,
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
    //marginVertical: -60,
  },
});
