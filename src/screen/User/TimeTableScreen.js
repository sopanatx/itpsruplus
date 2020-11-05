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
import {Button} from 'react-native-elements';
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

let monday = [];
async function regexClassID() {
  const jwtToken = await AsyncStorage.getItem('token');
  const decodeJWT = await jwt_decode(jwtToken);
  const studentID = decodeJWT.username;
  const shortStudentYear = studentID.substr(0, 2);
  const currentTerm = 1;
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

          <View>
            <Text style={styles.HeaderText}>
              ตารางเรียน {'\n'}ภาคเรียนที่ 1 / 2563
            </Text>

            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.monday}
              renderItem={({item}) => (
                <LinearGradient
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 2}}
                  colors={['#FFE29F', '#FFA99F', '#FF719A']}
                  style={{
                    shadowColor: 'rgba(245, 44, 80, 0.38)',
                    width: 337,
                    height: 120,
                    borderRadius: 9,
                    marginVertical: 5,
                    elevation: 4,
                    alignSelf: 'center',
                  }}>
                  <Text style={styles.Day}>วัน{item.subjectTime}</Text>

                  <Text style={styles.subjectName}>
                    {item.subjectCode} {item.subjectName}
                  </Text>
                  <Text style={styles.subjectName}>
                    ผู้สอน: {item.subjectTeacher} | ห้องเรียน :{' '}
                    {item.subjectClassroom}
                  </Text>
                </LinearGradient>
              )}
              keyExtractor={(item, index) => index.toString()}
            />

            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.tuesday}
              renderItem={({item}) => (
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  colors={['#ff9a9e', '#fecfef']} // Tuesday Color
                  style={{
                    shadowColor: 'rgba(245, 44, 80, 0.38)',
                    width: 337,
                    height: 120,
                    borderRadius: 9,
                    marginVertical: 5,
                    elevation: 4,
                    alignSelf: 'center',
                  }}>
                  <Text style={styles.Day}>วัน{item.subjectTime}</Text>

                  <Text style={styles.subjectName}>
                    {item.subjectCode} {item.subjectName}
                  </Text>
                  <Text style={styles.subjectName}>
                    ผู้สอน: {item.subjectTeacher} | ห้องเรียน :{' '}
                    {item.subjectClassroom}
                  </Text>
                </LinearGradient>
              )}
              keyExtractor={(item, index) => index.toString()}
            />

            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.wednesday}
              renderItem={({item}) => (
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  colors={['#20E2D7', '#F9FEA5']}
                  style={{
                    shadowColor: 'rgba(245, 44, 80, 0.38)',
                    width: 337,
                    height: 120,
                    borderRadius: 9,
                    marginVertical: 5,
                    elevation: 8,
                    alignSelf: 'center',
                  }}>
                  <Text style={styles.Day}>วัน{item.subjectTime}</Text>

                  <Text style={styles.subjectName}>
                    {item.subjectCode} {item.subjectName}
                  </Text>
                  <Text style={styles.subjectName}>
                    ผู้สอน: {item.subjectTeacher} | ห้องเรียน :{' '}
                    {item.subjectClassroom}
                  </Text>
                </LinearGradient>
              )}
              keyExtractor={(item, index) => index.toString()}
            />

            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.thursday}
              renderItem={({item}) => (
                <LinearGradient
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={['#fc6076', '#ff9a44']}
                  style={{
                    shadowColor: 'rgba(245, 44, 80, 0.38)',
                    width: 337,
                    height: 120,
                    borderRadius: 9,
                    marginVertical: 5,
                    elevation: 8,
                    alignSelf: 'center',
                  }}>
                  <Text style={styles.Day}>วัน{item.subjectTime}</Text>

                  <Text style={styles.subjectName}>
                    {item.subjectCode} {item.subjectName}
                  </Text>
                  <Text style={styles.subjectName}>
                    ผู้สอน: {item.subjectTeacher} | ห้องเรียน :{' '}
                    {item.subjectClassroom}
                  </Text>
                </LinearGradient>
              )}
              keyExtractor={(item, index) => index.toString()}
            />

            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.friday}
              renderItem={({item}) => (
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  colors={[THEME.WINTER_ROW_1, THEME.WINTER_ROW_2]}
                  style={{
                    shadowColor: 'rgba(245, 44, 80, 0.38)',
                    width: 337,
                    height: 120,
                    borderRadius: 9,
                    marginVertical: 5,
                    elevation: 8,
                    alignSelf: 'center',
                  }}>
                  <Text style={styles.Day}>วัน{item.subjectTime}</Text>

                  <Text style={styles.subjectName}>
                    {item.subjectCode} {item.subjectName}
                  </Text>
                  <Text style={styles.subjectName}>
                    ผู้สอน: {item.subjectTeacher} | ห้องเรียน :{' '}
                    {item.subjectClassroom}
                  </Text>
                </LinearGradient>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
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
    fontSize: 30,
    textAlign: 'center',
    margin: 20,
  },
  classRoom: {
    fontFamily: FONT_BOLD,
    fontSize: 24,
    marginHorizontal: 10,
    margin: 2,
    color: 'white',
  },
  subjectName: {
    fontFamily: FONT_BOLD,
    fontSize: 17,
    marginHorizontal: 10,
    margin: 2,
    color: 'white',
  },
  subjectTeacher: {
    fontFamily: FONT_BOLD,
    fontSize: 16,
    marginHorizontal: 10,
    color: 'white',
  },
  Day: {
    fontFamily: FONT_BOLD,
    fontSize: 25,
    marginHorizontal: 10,
    margin: 2,
    color: 'white',
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
