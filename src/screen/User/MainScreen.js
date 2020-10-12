import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import LinearGradient from 'react-native-linear-gradient';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStudentName} from '../../api/UserApi';
const MainUserScreen = (props) => {
  const [studentName, setStudentName] = useState('');
  const [studentId, setstudentId] = useState('');

  const showStudentData = async () => {
    const jwtToken = await AsyncStorage.getItem('token');
    const decodeJWT = await jwt_decode(jwtToken);
    setStudentName(decodeJWT.studentName);
    setstudentId(decodeJWT.username);
  };

  useEffect(() => {
    showStudentData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0.5}}
          colors={['#F5872C', '#FF6996']}
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
      <ImageBackground
        source={require('../../assets/images/HeadImage_2x.png')}
        style={{width: wp('100%'), height: 189}}>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.79)',
            width: wp('100%'),
            height: 189,
          }}>
          <View
            style={{
              margin: 60,
              marginHorizontal: 50,
              marginTop: 130,
            }}>
            <Text style={styles.HeaderText}>
              สวัสดี {studentName} {'\n'} {studentId}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <ScrollView style={{backgroundColor: 'white'}}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            margin: 10,
            width: 366,
            height: 480,
            borderRadius: 16,
            elevation: 4,
            shadowColor: '#E9E9E9',
            alignSelf: 'center',
            marginBottom: 30,
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              margin: 10,
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <Button
              buttonStyle={{
                backgroundColor: 'rgba(250, 121, 88, 0.13)',
                width: 75,
                height: 75,
                borderRadius: 17,
                marginTop: 10,
                marginHorizontal: 20,
                flexDirection: 'row',
              }}
              icon={{
                name: 'work', //A
                size: 25,
                color: '#FFFFFF', //#FA7958
              }}
              onPress={() => props.navigation.navigate('Grade')}
              disabled={true}
            />

            <Button
              buttonStyle={{
                backgroundColor: 'rgba(250, 121, 88, 0.13)',
                width: 75,
                height: 75,
                borderRadius: 17,
                marginTop: 10,
                marginHorizontal: 20,
                flexDirection: 'row',
              }}
              icon={{
                name: 'card-membership',
                size: 25,
                color: 'white',
              }}
              disabled={true}
            />
            <Button
              buttonStyle={{
                backgroundColor: 'rgba(250, 121, 88, 0.13)',
                width: 75,
                height: 75,
                borderRadius: 17,
                marginTop: 10,
                marginHorizontal: 20,
                flexDirection: 'row',
              }}
              icon={{
                name: 'alarm',
                size: 25,
                color: '#FA7958',
              }}
              onPress={() => props.navigation.navigate('Time')}
            />
          </View>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              margin: 10,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                width: wp('30%'),
                fontFamily: 'DBHelvethaicaX-Reg',
                fontSize: 24,
                textAlign: 'center',
              }}>
              ผลการเรียน
            </Text>

            <Text
              style={{
                width: wp('30%'),
                fontFamily: 'DBHelvethaicaX-Reg',
                fontSize: 24,
                textAlign: 'center',
                marginHorizontal: -3,
              }}>
              กิจกรรม
            </Text>
            <Text
              style={{
                width: wp('30%'),
                fontFamily: 'DBHelvethaicaX-Reg',
                fontSize: 24,
                textAlign: 'center',
                marginHorizontal: 1,
              }}>
              ตารางเรียน
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#FFFFFF',
              margin: 10,
              flexDirection: 'row',
            }}>
            <Button
              buttonStyle={{
                backgroundColor: 'rgba(250, 121, 88, 0.13)',
                width: 75,
                height: 75,
                borderRadius: 17,
                marginTop: 10,
                marginHorizontal: 20,
                flexDirection: 'row',
                alignSelf: 'flex-start',
              }}
              icon={{
                name: 'card-travel', //A
                size: 25,
                color: '#FA7958',
              }}
              onPress={() => props.navigation.navigate('StudentCard')}
            />
          </View>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              margin: 10,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                width: wp('30%'),
                fontFamily: 'DBHelvethaicaX-Reg',
                fontSize: 24,
                textAlign: 'center',
              }}>
              บัตรนักศึกษา
            </Text>
          </View>
          <View style={{alignContent: 'center'}}></View>
        </View>

        {/* <View style={{}}>
            <ImageBackground
              source={image}
              style={{}}
              imageStyle={{
                borderRadius: 10,
                width: wp("90%"),
                height: 100,
                marginHorizontal: 20,
              }}
            >
              <Button
                title="สอบปลายภาคเรียน"
                titleStyle={{
                  color: "black",
                  alignSelf: "center",
                }}
                buttonStyle={{
                  backgroundColor: "transparent",
                  alignContent: "center",
                  width: wp("90%"),
                  height: 100,
                  marginHorizontal: 20,
                }}
              />
            </ImageBackground>
            <Button
              buttonStyle={{
                backgroundColor: "transparent",
                width: 75,
                height: 75,
                borderRadius: 17,
                marginTop: 10,
                marginHorizontal: 20,
                flexDirection: "row",
              }}
            />
          </View> */}
        <View style={{marginTop: 20, alignContent: 'center'}}>
          <Text
            style={{
              margin: 50,
              textAlign: 'center',
              fontFamily: 'DBHelvethaicaX-Bd',
              fontSize: 25,
            }}>
            Application Version: 1.3.6
            {'\n'}
            Build: 2020101002
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: -10,
          width: wp('100%'),
          height: hp('8%'),
          elevation: 10,
          borderRadius: 4,
        }}>
        <Image
          source={require('../../assets/components/c_icon_home_enabled_menu.png')}
          style={{width: 36, height: 36, margin: 10, marginHorizontal: 50}}
        />
      </View>
    </SafeAreaView>
  );
};

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
});

export default MainUserScreen;
