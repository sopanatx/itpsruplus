import React, {useState, useEffect} from 'react';
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
import {Button, Badge} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import tailwind from 'tailwind-rn';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT_FAMILY, FONT_BOLD, THEME} from '../../styles';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import {dayPeriodConvert, stylePeriodBadge} from '../../utils/misc';
import {HeaderBar} from '../../components/headerBar';
import EncryptedStorage from 'react-native-encrypted-storage';
let monday = [];
async function regexClassID() {
  const jwtToken = await EncryptedStorage.getItem('accessToken');
  const decodeJWT = await jwt_decode(jwtToken);
  const studentID = decodeJWT.username;
  const shortStudentYear = studentID.substr(0, 2);
  const currentTerm = 2;
  const currentYear = 2563;
  const studentGroup = 2;
  console.log({shortStudentYear});
  //TST1_12563_61132m11702
  return `TST1_${currentTerm}${currentYear}_${shortStudentYear}132m1170${studentGroup}`;
}
export default class TimeTableScreen extends React.Component {
  state = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    classID: '',
  };

  async componentDidMount() {
    this.setState({classID: await regexClassID()});
    const subject = await axios.get(
      `https://app.itpsru.in.th/api/class/${this.state.classID}`,
    );
    this.setState({
      monday: subject.data.monday,
      tuesday: subject.data.tuesday,
      wednesday: subject.data.wednesday,
      thursday: subject.data.thursday,
      friday: subject.data.friday,
    });
    console.log('STATE_CLASS_ID:', this.state.classID);
  }
  render() {
    return (
      <SafeAreaView>
        <HeaderBar />
        <ScrollView
          overScrollMode="always"
          contentContainerStyle={{paddingBottom: 80}}
          showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.HeaderText}>
              กิจกรรมการเรียนการสอนเทอมนี้ 2 / 2563
            </Text>
            {this.state.monday.map((item) => (
              <View
                style={{
                  width: wp('90%'),
                  height: hp('15%'),
                  backgroundColor: '#f2f2f2',
                  alignSelf: 'center',
                  borderRadius: 9,
                  elevation: 4,
                  marginVertical: 5,
                  shadowColor: '#000',
                  shadowOpacity: 0.2,
                  borderLeftColor: '#F87E4D',
                  borderLeftWidth: 9,
                }}>
                <Text style={styles.Day}>{item.subjectTime} </Text>

                <Text style={styles.subjectName}>
                  {item.subjectCode} {item.subjectName}
                </Text>
                <Text style={styles.subjectName}>
                  ผู้สอน: {item.subjectTeacher} {'\n'}ห้องเรียน :{' '}
                  {item.subjectClassroom}
                </Text>
              </View>
            ))}

            {this.state.tuesday.map((item) => (
              <View
                style={{
                  width: wp('90%'),
                  height: hp('15%'),
                  backgroundColor: '#f2f2f2',
                  alignSelf: 'center',
                  borderRadius: 9,
                  elevation: 4,
                  marginVertical: 5,
                  shadowColor: '#000',
                  shadowOpacity: 0.2,
                  borderLeftColor: '#F87E4D',
                  borderLeftWidth: 9,
                }}>
                <Text style={styles.Day}>{item.subjectTime} </Text>
                <Text style={styles.subjectName}>
                  {item.subjectCode} {item.subjectName}
                </Text>
                <Text style={styles.subjectName}>
                  ผู้สอน: {item.subjectTeacher} {'\n'}ห้องเรียน :{' '}
                  {item.subjectClassroom}
                </Text>
              </View>
            ))}

            {this.state.wednesday.map((item) => (
              <View
                style={{
                  width: wp('90%'),
                  height: hp('15%'),
                  backgroundColor: '#f2f2f2',
                  alignSelf: 'center',
                  borderRadius: 9,
                  elevation: 4,
                  marginVertical: 5,
                  borderLeftColor: '#F87E4D',
                  borderLeftWidth: 9,
                }}>
                <Text style={styles.Day}>{item.subjectTime} </Text>
                <Text style={styles.subjectName}>
                  {item.subjectCode} {item.subjectName}
                </Text>
                <Text style={styles.subjectName}>
                  ผู้สอน: {item.subjectTeacher} {'\n'}ห้องเรียน :{' '}
                  {item.subjectClassroom}
                </Text>
              </View>
            ))}

            {this.state.thursday.map((item) => (
              <View
                style={{
                  width: wp('90%'),
                  height: hp('15%'),
                  backgroundColor: '#f2f2f2',
                  alignSelf: 'center',
                  borderRadius: 9,
                  elevation: 4,
                  marginVertical: 5,
                  shadowColor: '#000',
                  shadowOpacity: 0.2,
                  borderLeftColor: '#F87E4D',
                  borderLeftWidth: 9,
                }}>
                <Text style={styles.Day}>{item.subjectTime} </Text>
                <Text style={styles.subjectName}>
                  {item.subjectCode} {item.subjectName}
                </Text>
                <Text style={styles.subjectName}>
                  ผู้สอน: {item.subjectTeacher} {'\n'}ห้องเรียน :{' '}
                  {item.subjectClassroom}
                </Text>
              </View>
            ))}

            {this.state.friday.map((item) => (
              <View
                style={{
                  width: wp('90%'),
                  height: hp('15%'),
                  backgroundColor: '#f2f2f2',
                  alignSelf: 'center',
                  borderRadius: 9,
                  elevation: 4,
                  marginVertical: 5,
                  shadowColor: '#000',
                  shadowOpacity: 0.2,
                  borderLeftColor: '#F87E4D',
                  borderLeftWidth: 9,
                }}>
                <Text style={styles.Day}>{item.subjectTime} </Text>
                <Text style={styles.subjectName}>
                  {item.subjectCode} {item.subjectName}
                </Text>
                <Text style={styles.subjectName}>
                  ผู้สอน: {item.subjectTeacher} {'\n'}ห้องเรียน :{' '}
                  {item.subjectClassroom}
                </Text>
              </View>
            ))}
          </View>
          <View style={{height: 100}}></View>
        </ScrollView>
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
  HeaderText: {
    fontFamily: 'SukhumvitTadmai-Bold',
    fontSize: 18,
    textAlign: 'left',
    // margin: 20,
    padding: 20,
  },
  classRoom: {
    fontFamily: 'SukhumvitTadmai-Bold',
    fontSize: 10,
    paddingHorizontal: 10,
    margin: 2,
    color: 'white',
  },
  subjectName: {
    fontFamily: 'SukhumvitTadmai-Text',
    fontSize: 14,
    paddingHorizontal: 10,
    margin: 2,
  },
  subjectTeacher: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 16,
    paddingHorizontal: 10,
    color: 'white',
  },
  Day: {
    fontFamily: FONT_BOLD,
    fontSize: 14,
    paddingHorizontal: 10,
    margin: 2,
    color: 'black',
  },
  DebugText: {
    fontFamily: FONT_BOLD,
    fontSize: 12,
    textAlign: 'center',
    color: 'red',
  },
  image: {
    //flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
