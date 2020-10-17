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
import dayjs from 'dayjs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TEST_API_URL} from '../../constant/API';
import apiUserData from '../../api/UserApi';
async function getCalendar() {
  const calendar = await axios.get(TEST_API_URL.calendar);
  return calendar.data;
}
let studentData = [];
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

  //console.log({year, month, day});

  return `${day} ${monthText} ${year}`;
}
export default class MainUserScreen extends React.Component {
  state = {
    activityCalendar: [],
    userdata: [],
    studentTitileName: '',
    studentFirstName: 'Loading',
    studentLastName: '...',
    studentId: '0 0 0 0 0 0 0 0 0 0',
    studentProfileImage:
      'https://www2.guidestar.org/App_Themes/MainSite/images/loading.gif',
  };
  async componentDidMount() {
    studentData = await apiUserData();
    console.log(
      'STD_DATA:',
      studentData.getAccountInfo.AccountInfo.profileImageUrl,
    );
    this.setState({
      activityCalendar: await getCalendar(),
      userdata: await apiUserData(),
      studentFirstName: studentData.getAccountInfo.studentFirstName,
      studentLastName: studentData.getAccountInfo.studentLastName,
      studentProfileImage:
        studentData.getAccountInfo.AccountInfo.profileImageUrl,
      studentId: studentData.getAccountInfo.studentId,
    });
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
            showsHorizontalScrollIndicator={false}
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
        <View
          style={{
            width: wp('90%'),
            height: hp('20%'),
            backgroundColor: '#FFFFFF',
            alignSelf: 'center',
            borderRadius: 15,
            elevation: 10,
          }}>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            colors={[THEME.WINTER_GECARD1, THEME.WINTER_GECARD2]}
            style={{
              shadowColor: 'rgba(245, 44, 80, 0.38)',
              width: wp('90%'),
              height: hp('20%'),
              alignSelf: 'center',
              borderRadius: 15,
            }}>
            <Text style={styles.StudentName}>
              {this.state.studentFirstName} {this.state.studentLastName}
            </Text>
            <Text style={styles.MajorName}>{this.state.studentId}</Text>
            <Text style={styles.MajorName}>คณะวิทยาศาสตร์และเทคโนโลยี</Text>
            <Text style={styles.MajorName}>สาขาวิชา เทคโนโลยีสารสนเทศ</Text>
            <Image
              source={{uri: this.state.studentProfileImage}}
              style={{
                width: 100,
                height: 100,
                alignSelf: 'flex-end',
                borderRadius: 9,
                marginTop: -140,
                marginHorizontal: 10,
              }}
              imageStyle={{}}
            />
          </LinearGradient>
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
  MenuText1: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 28,
    marginTop: 10,
    textAlign: 'center',
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
});
