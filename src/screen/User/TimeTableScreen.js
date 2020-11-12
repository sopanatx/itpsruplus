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

let monday = [];
async function regexClassID() {
  const jwtToken = await AsyncStorage.getItem('token');
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
const image = {
  uri:
    'https://images.unsplash.com/photo-1516035645781-9f126e774e9e?ixlib=rb-1.2.1&w=1000&q=80',
};
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
        <ScrollView overScrollMode="auto">
          <HeaderBar />
          <View>
            <Text style={styles.HeaderText}>
              กิจกรรมการเรียนการสอนเทอมนี้ 2 / 2563
            </Text>
            {this.state.monday.map((item) => (
              <View
                style={{
                  width: wp('90%'),
                  height: 120,
                  backgroundColor: '#f2f2f2',
                  alignSelf: 'center',
                  borderRadius: 9,
                  elevation: 4,
                  marginVertical: 5,
                }}>
                <Text style={styles.Day}>
                  {item.subjectTime}{' '}
                  <Badge
                    containerStyle={{paddingHorizontal: 5}}
                    textStyle={{fontFamily: FONT_FAMILY}}
                    value={dayPeriodConvert(item.subjectPeriodType)}
                    status={stylePeriodBadge(item.subjectPeriodType)}
                  />
                </Text>

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
                  height: 120,
                  backgroundColor: '#f2f2f2',
                  alignSelf: 'center',
                  borderRadius: 9,
                  elevation: 4,
                  marginVertical: 5,
                }}>
                <Text style={styles.Day}>
                  {item.subjectTime}{' '}
                  <Badge
                    containerStyle={{paddingHorizontal: 5}}
                    textStyle={{fontFamily: FONT_FAMILY}}
                    value={dayPeriodConvert(item.subjectPeriodType)}
                    status={stylePeriodBadge(item.subjectPeriodType)}
                  />
                </Text>
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
                  height: 120,
                  backgroundColor: '#f2f2f2',
                  alignSelf: 'center',
                  borderRadius: 9,
                  elevation: 4,
                  marginVertical: 5,
                }}>
                <Text style={styles.Day}>
                  {item.subjectTime}{' '}
                  <Badge
                    containerStyle={{paddingHorizontal: 5}}
                    textStyle={{fontFamily: FONT_FAMILY}}
                    value={dayPeriodConvert(item.subjectPeriodType)}
                    status={stylePeriodBadge(item.subjectPeriodType)}
                  />
                </Text>
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
                  height: 120,
                  backgroundColor: '#f2f2f2',
                  alignSelf: 'center',
                  borderRadius: 9,
                  elevation: 4,
                  marginVertical: 5,
                }}>
                <Text style={styles.Day}>
                  {item.subjectTime}{' '}
                  <Badge
                    containerStyle={{paddingHorizontal: 5}}
                    textStyle={{fontFamily: FONT_FAMILY}}
                    value={dayPeriodConvert(item.subjectPeriodType)}
                    status={stylePeriodBadge(item.subjectPeriodType)}
                  />
                </Text>
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
                  height: 120,
                  backgroundColor: '#f2f2f2',
                  alignSelf: 'center',
                  borderRadius: 9,
                  elevation: 4,
                  marginVertical: 5,
                }}>
                <Text style={styles.Day}>
                  {item.subjectTime}{' '}
                  <Badge
                    containerStyle={{paddingHorizontal: 5}}
                    textStyle={{fontFamily: FONT_FAMILY}}
                    value={dayPeriodConvert(item.subjectPeriodType)}
                    status={stylePeriodBadge(item.subjectPeriodType)}
                  />
                </Text>
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
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 24,
    textAlign: 'left',
    // margin: 20,
    padding: 20,
  },
  classRoom: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 16,
    paddingHorizontal: 10,
    margin: 2,
    color: 'white',
  },
  subjectName: {
    fontFamily: 'DBHelvethaicaX-Reg',
    fontSize: 18,
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
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 20,
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
