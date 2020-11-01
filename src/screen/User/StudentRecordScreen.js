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
import {getAllGrade} from '../../api/StudentGradeApi';
import {convertGrade} from '../../utils/misc';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT_FAMILY, FONT_BOLD, THEME} from '../../styles';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';

async function regexClassID() {
  const jwtToken = await AsyncStorage.getItem('token');
  const decodeJWT = await jwt_decode(jwtToken);
  const studentID = decodeJWT.username;

  return studentID;
}
export default class StudentRecordScreen extends React.Component {
  state = {
    studentID: '',
    studentGrade: [],
  };
  async componentDidMount() {
    this.setState({
      studentID: await regexClassID,
      studentGrade: await getAllGrade(await regexClassID()),
    });
    console.log(this.state.studentGrade[1]);
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
          <View style={{alignItems: 'center', width: wp('100%')}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.state.studentGrade}
              renderItem={({item}) => (
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  colors={['#fc6076', '#ff9a44']}
                  style={{
                    shadowColor: 'rgba(245, 44, 80, 0.38)',
                    width: 337,
                    height: 120,
                    borderRadius: 9,
                    marginVertical: 5,
                    elevation: 2,
                    alignSelf: 'center',
                  }}>
                  <Text style={styles.SubjectText}>เทอม: {item.term}</Text>
                  <Text style={styles.SubjectText}>
                    ชื่อวิชา: {item.subjectName}
                  </Text>
                  <Text style={styles.SubjectText}>
                    ผลการเรียน: {convertGrade(item.studentGrade)}
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
    color: '#4C4C4C',
  },

  SubjectText: {
    fontFamily: FONT_BOLD,
    fontSize: 20,
    textAlign: 'left',
    color: '#F2F2F2',
    paddingHorizontal: 20,
    // paddingVertical: 10,
  },
});
