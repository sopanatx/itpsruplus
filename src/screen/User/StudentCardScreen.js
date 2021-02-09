import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {Button, Avatar} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {HeaderBar} from '../../components/headerBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT_FAMILY, FONT_BOLD} from '../../styles';
import EncryptedStorage from 'react-native-encrypted-storage';

import tailwind from 'tailwind-rn';

export default class StudentCardScreen extends React.Component {
  state = {
    studentID: '',
    prorile: '',
    studentId: '',
    studentName: '',
  };
  async componentDidMount() {
    const accessToken = await EncryptedStorage.getItem('accessToken');

    const studentName = await EncryptedStorage.getItem('studentName');
    const studentId = await EncryptedStorage.getItem('studentID');
    const getUser = await fetch('https://api.itpsru.in.th/user/find', {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    });
    const userInfo = await getUser.json();

    console.log(userInfo.getAccountInfo.AccountInfo.profileImageUrl);
    this.setState({
      studentName: studentName,
      studentId: studentId,
      profile: userInfo.getAccountInfo.AccountInfo.profileImageUrl,
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderBar />

        <View style={{alignItems: 'center', margin: 50}}>
          <Avatar
            size="xlarge"
            rounded
            source={{
              uri: this.state.profile,
            }}
          />
        </View>

        <Text style={styles.titleName}> {this.state.studentName} </Text>
        <View style={tailwind('pt-2 items-center')}>
          <View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
            <Text style={tailwind('text-blue-800 font-semibold')}>
              <Text style={styles.detailText}> {this.state.studentId} </Text>
            </Text>
          </View>
        </View>
        <View style={tailwind('pt-2 items-center')}>
          <View style={tailwind('bg-green-200 px-3 py-1 rounded-full')}>
            <Text style={tailwind('text-green-800 font-semibold')}>
              <Text style={styles.detailText}>
                คณะ : วิทยาศาสตร์และเทคโนโลยี{' '}
              </Text>
            </Text>
          </View>
        </View>
        <View style={tailwind('pt-2 items-center')}>
          <View style={tailwind('bg-green-200 px-3 py-1 rounded-full')}>
            <Text style={tailwind('text-green-800 font-semibold')}>
              <Text style={styles.detailText}> สาขา : เทคโนโลยีสารสนเทศ </Text>
            </Text>
          </View>
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
  titleName: {
    fontFamily: FONT_BOLD,
    fontSize: 24,
    textAlign: 'center',
  },
  detailText: {
    fontFamily: FONT_BOLD,
    fontSize: 14,
    textAlign: 'center',
  },
});
