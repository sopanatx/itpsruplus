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
          //  backgroundColor: 'transparent',
        }}>
        <Image
          style={styles.Logo}
          source={require('../assets/images/WhiteLogo_4x.png')}
        />
        {/* <Text
          style={{
            color: 'white',
            fontSize: 30,
            paddingHorizontal: 90,
            padding: 20,
            fontFamily: 'DBHelvethaicaX-Bd',
          }}>
          Infomation Technology {'\n'}PSRU
        </Text> */}
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
    backgroundColor: 'transparent',

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
  HeaderText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 30,
    textAlign: 'center',
    marginVertical: -60,
  },
  MenuText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 24,
    marginHorizontal: 10,
    textAlign: 'left',
    //  color: '#f6f6f6',
  },
  MenuText1: {
    fontFamily: 'Anuphan-Bold',
    fontSize: 28,
    marginTop: 10,
    textAlign: 'center',
  },
  CalendarDateText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    textAlign: 'left',
    marginTop: 3,
    margin: 7,
  },
  CalendarInfoText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    textAlign: 'right',
    paddingTop: 30,
    paddingEnd: 3,
  },
  StudentName: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    textAlign: 'left',
    marginHorizontal: 25,
    marginTop: 10,
  },
  MajorName: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    textAlign: 'left',
    marginHorizontal: 25,
    marginTop: 10,
  },
  studentGradeInfoText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 30,
    textAlign: 'center',
    color: '#f4f4f4',
    marginTop: 10,
  },
  myGradeText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 25,
    textAlign: 'center',
    color: '#f2f2f2',
    marginTop: 10,
  },
});
