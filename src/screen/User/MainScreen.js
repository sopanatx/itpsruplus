import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Alert,
  ImageBackground,
  FlatList,
} from 'react-native';
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import LinearGradient from 'react-native-linear-gradient';
import {FONT_FAMILY, FONT_BOLD, THEME} from '../../styles';
import axios from 'axios';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStudentName} from '../../api/UserApi';
import {TEST_API_URL} from '../../constant/API';

async function getCalendar() {
  const calendar = await axios.get(TEST_API_URL.calendar);
  return calendar.data;
}
function convertDate(date) {
  //2020-10-30T18:00:00.000Z
  const year = Number(date.slice(2, 4)) + 43;
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  let monthText = '';
  switch (month) {
    case '1':
      monthText = 'ม.ค.';
      break;
    case '2':
      monthText = 'ก.พ.';
      break;
    case '3':
      monthText = 'มี.ค.';
      break;
    case '4':
      monthText = 'เม.ย.';
      break;
    case '5':
      monthText = 'พ.ค.';
      break;
    case '6':
      monthText = 'มิ.ย.';
      break;
    case '8':
      monthText = 'ส.ค.';
      break;
    case '9':
      monthText = 'ก.ย.';
      break;
    case '10':
      monthText = 'ต.ค.';
      break;
    case '11':
      monthText = 'พ.ย.';
      break;
    case '12':
      monthText = 'ธ.ค.';
      break;
  }

  console.log({year, month, day});
  return `${day} ${monthText} ${year}`;
}
export default class MainUserScreen extends React.Component {
  state = {
    activityCalendar: [],
  };
  async componentDidMount() {
    this.setState({activityCalendar: await getCalendar()});
    //console.log(this.state.activityCalendar[0]);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            colors={[THEME.WINTER_HEADER_1, THEME.WINTER_HEADER_2]}
            style={{
              shadowColor: 'rgba(245, 44, 80, 0.38)',
              width: 480,
              height: 165,
              alignSelf: 'center',
            }}>
            <Image
              style={styles.Logo}
              source={require('../../assets/images/WhiteLogo_4x.png')}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 30,
                width: 245,
                marginHorizontal: 110,
                margin: 20,
                fontFamily: 'DBHelvethaicaX-Bd',
              }}>
              Infomation Technology {'\n'}PSRU
            </Text>
          </LinearGradient>
        </View>

        <View style={{margin: 10}}>
          <Text style={styles.MenuText}>กิจกรรมที่กำลังมาถึง</Text>

          <FlatList
            horizontal={true}
            data={this.state.activityCalendar}
            renderItem={({item}) => (
              <ImageBackground
                source={{uri: item.activityImage}}
                style={{
                  width: 170,
                  height: 170,
                  marginHorizontal: 5,
                  elevation: 10,
                }}
                imageStyle={{
                  borderRadius: 9,
                }}>
                <View
                  style={{
                    width: 170,
                    height: 170,
                    borderRadius: 9,
                    backgroundColor: 'rgba(68, 129, 235, 0.35)',
                  }}>
                  <Text style={styles.CalendarDateText}>
                    {convertDate(item.activityStartDate)}
                  </Text>
                  <Text style={styles.CalendarInfoText}>
                    {item.activityName}
                  </Text>
                </View>
              </ImageBackground>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'white',
  },

  header: {
    width: 464,
    height: 165,
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
    fontSize: 28,
    marginHorizontal: 5,
    textAlign: 'left',
  },
  CalendarDateText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    textAlign: 'left',
    marginTop: -3,
    margin: 7,
  },
  CalendarInfoText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    textAlign: 'right',
    marginTop: 40,
    margin: 7,
  },
});
