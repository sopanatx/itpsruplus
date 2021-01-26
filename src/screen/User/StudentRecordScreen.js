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
import {HeaderBar} from '../../components/headerBar';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

async function regexClassID() {
  const jwtToken = await EncryptedStorage.getItem('accessToken');
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
        <HeaderBar />

        <ScrollView contentContainerStyle={{paddingBottom: 80}}>
          <View style={{alignItems: 'center', width: wp('100%')}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.state.studentGrade}
              renderItem={({item}) => (
                <View
                  style={{
                    width: wp('90%'),
                    height: 120,
                    backgroundColor: '#f2f2f2',
                    margin: 10,
                    borderRadius: 8,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    borderLeftColor: '#F8804D',
                    borderLeftWidth: 9,
                  }}>
                  <Text style={styles.SubjectText}>
                    เทอมที่ : {item.term} {'\n'}
                    {item.subjectCode} {''}
                    {item.subjectName}
                  </Text>
                  <Text style={styles.SubjectValue}>
                    <Text style={{color: 'orange'}}>{item.studentGrade}</Text>
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
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
    fontFamily: FONT_BOLD,
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
    color: '#4C4C4C',
  },

  SubjectText: {
    fontFamily: FONT_BOLD,
    fontSize: 14,
    textAlign: 'left',
    color: 'black',
    padding: 9,
    // paddingVertical: 10,
  },
  SubjectValue: {
    fontFamily: FONT_BOLD,
    fontSize: 24,
    textAlign: 'right',
    color: 'black',
    paddingRight: 10,
  },
});
