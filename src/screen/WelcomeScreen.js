import React, {constructor, useContext, useState} from 'react';
import {Component} from 'react';
import {PrimaryButton, RegisterButton} from '../components/button';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  Text,
  ActivityIndicator,
  AsyncStorage,
  SafeAreaView,
} from 'react-native';

export default class WelcomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <Image
            style={styles.Logo}
            source={require('../assets/images/IconPlus.png')}
          />
          <Text style={styles.Title}>Information Technology {'\n'} PSRU</Text>
        </View>
        <View style={styles.subView}>
          <Text style={styles.TextInfo}>
            แอพลิเคชั่นนี้ อยู่ในระหว่างการพัฒนา {'\n'} อาจมีข้อผิดพลาด
            หรือไม่ความไม่เสถียรเกิดขึ้น {'\n'} ผู้พัฒนาต้องขออภัยมา ณ
            ที่นี้ด้วย
          </Text>
          <PrimaryButton
            style={{width: '100%'}}
            containerStyle={{width: '100%'}}
            title={'เข้าสู่ระบบ'}
            onPress={() => this.props.navigation.navigate('Login')}
          />
          <RegisterButton
            style={{width: '80%'}}
            containerStyle={{width: '100%'}}
            title={'ลงทะเบียน'}
            onPress={() =>
              Alert.alert('Error!', 'ระบบยังไม่เปิดให้ลงทะเบียนในขณะนี้')
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  mainView: {},
  Logo: {
    width: 122,
    height: 122,
    alignSelf: 'center',
    marginVertical: 80,
  },
  Title: {
    fontSize: 26,
    fontFamily: 'ProductSansRegular',
    textAlign: 'center',
  },
  subView: {
    backgroundColor: '#F2F2F2',
    flex: 2,
    marginTop: 30,
  },
  TextInfo: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'DBHelvethaicaX-Bd',
    margin: 30,
    marginVertical: 50,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
});
