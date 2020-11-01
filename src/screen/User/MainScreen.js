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
import getMyGrade from '../../api/StudentGradeApi';

import {getDay, convertDate} from '../../utils/misc';
async function getCalendar() {
  const calendar = await axios.get(TEST_API_URL.calendar);
  return calendar.data;
}
let studentData = [];
let studentGrade = [];
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
    studentGrade: [],
  };
  async componentDidMount() {
    // StatusBar.setHidden(true);
    studentData = await apiUserData();
    console.log(
      'IMAGE_PROFILE_DATA:',
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
    this.setState({studentGrade: await getMyGrade(this.state.studentId)});
    this.setState({studentGrade: this.state.studentGrade[0]});
    console.log(this.state.studentGrade);
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
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
                      width: 120,
                      height: 120,
                      marginHorizontal: 5,
                      elevation: 10,
                    }}
                    imageStyle={{
                      borderRadius: 9,
                    }}>
                    <View
                      style={{
                        width: 120,
                        height: 120,
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

            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={[
                THEME.WINTER_GECARD1,
                THEME.WINTER_GECARD2,
                //THEME.WINTER_GECARD3,
              ]}
              style={{
                shadowColor: 'rgba(245, 44, 80, 0.38)',
                width: wp('90%'),
                height: 180,
                alignSelf: 'center',
                borderRadius: 15,
                elevation: 10,
              }}>
              <Text style={styles.StudentName}>
                {this.state.studentFirstName} {this.state.studentLastName}
              </Text>
              <Text style={styles.MajorName}>{this.state.studentId}</Text>
              <Text style={styles.MajorName}>คณะ วิทยาศาสตร์และเทคโนโลยี</Text>
              <Text style={styles.MajorName}>สาขาวิชา เทคโนโลยีสารสนเทศ</Text>
              <Image
                source={{uri: this.state.studentProfileImage}}
                style={{
                  width: 80,
                  height: 80,
                  alignSelf: 'flex-end',
                  borderRadius: 9,
                  marginTop: -140,
                  marginHorizontal: 10,
                }}
                imageStyle={{}}
              />
            </LinearGradient>

            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={[THEME.WINTER_GRADE_CARD1, THEME.WINTER_GRADE_CARD2]}
              style={{
                shadowColor: 'rgba(245, 44, 80, 0.38)',
                width: wp('90%'),
                height: 220,
                alignSelf: 'center',
                borderRadius: 15,
                marginTop: 10,
              }}>
              <Text style={styles.studentGradeInfoText}> ระดับผลการเรียน </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    width: 150,
                    height: 100,
                    backgroundColor: THEME.DEFAULT_DARK_MODE2,
                    marginHorizontal: 10,
                    borderRadius: 5,
                    elevation: 10,
                  }}>
                  <Text style={styles.myGradeText}> ระดับผลการเรียน </Text>
                  <Text style={styles.myGradeText}>
                    <Text style={{color: 'green'}}> ดี </Text>
                  </Text>
                </View>
                <View
                  style={{
                    width: 150,
                    height: 100,
                    backgroundColor: THEME.DEFAULT_DARK_MODE2,
                    marginHorizontal: 10,
                    borderRadius: 5,
                    elevation: 10,
                  }}>
                  <Text style={styles.myGradeText}> เกรดเฉลี่ยรวม </Text>
                  <Text style={styles.myGradeText}>
                    {this.state.studentGrade.TotalAverageGrade}
                  </Text>
                </View>
                <View
                  style={{
                    width: 150,
                    height: 100,
                    backgroundColor: THEME.DEFAULT_DARK_MODE2,
                    marginHorizontal: 10,
                    borderRadius: 5,
                    elevation: 10,
                  }}>
                  <Text style={styles.myGradeText}> เกรดเฉลี่ยวิิชาเอก </Text>
                  <Text style={styles.myGradeText}>
                    {this.state.studentGrade.TotalMainSubjectGrade}
                  </Text>
                </View>
              </ScrollView>
              <Button
                title="ข้อมูลเพิ่มเติม"
                buttonStyle={{
                  width: 100,
                  height: 40,
                  alignSelf: 'center',
                  marginVertical: 10,
                  backgroundColor: '#0f3057',
                  elevation: 10,
                }}
                titleStyle={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 14,
                }}
                disabled={true}
              />
            </LinearGradient>
            <View style={{margin: 10}}></View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

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
    fontFamily: 'DBHelvethaicaX-Bd',
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
