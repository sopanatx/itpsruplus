import React, {constructor, useContext, useState} from 'react';
import {Component} from 'react';
import {PrimaryButton, RegisterButton} from '../components/button';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  StatusBar,
  TextInput,
} from 'react-native';
import {FONT_FAMILY, FONT_BOLD, THEME, COLORS} from '../styles';
import {normalize} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class TOSScreen extends Component {
  state = {
    firstName: '',
    lastName: '',
    studentId: '',
    studentEmail: '',
    studentPassword: '',
    nickname: '',
    educateGroup: '',
    admissionYear: '',
    phoneNumber: '',
  };

  render() {
    const register = async () => {
      await fetch('https://api.itpsru.in.th/auth/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: this.state.studentId,
          studentFirstName: this.state.firstName,
          studentLastName: this.state.lastName,
          studentEmail: this.state.studentEmail,
          studentPassword: this.state.studentPassword,
        }),
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.title}> ลงทะเบียน </Text>
          <Text style={styles.subtitle}>
            โปรดกรอกข้อมูลส่วนตัวของท่านตามความเป็นจริงเพื่อลงทะเบียนใช้งานระบบ
          </Text>
        </View>

        <View style={styles.container}>
          <KeyboardAwareScrollView
            style={{flex: 1, width: '100%'}}
            keyboardShouldPersistTaps="always">
            <TextInput
              style={styles.input}
              placeholder="ชื่อ"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => this.setState({firstName: text})}
              value={this.state.firstName}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="สกุล"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => this.setState({lastName: text})}
              value={this.state.lastName}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="รหัสนักศึกษา"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => this.setState({studentId: text})}
              value={this.state.studentId}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="อีเมล"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => this.setState({studentEmail: text})}
              value={this.state.studentEmail}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.passwordinput}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder="Password"
              onChangeText={(text) => this.setState({studentPassword: text})}
              value={this.state.studentPassword}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const padding = normalize(16);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 16,
    marginHorizontal: padding,
  },

  title: {
    fontFamily: FONT_BOLD,
    fontSize: 32,
    alignItems: 'center',
    color: COLORS.BLACK_1,
    textAlign: 'center',
  },

  subtitle: {
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    lineHeight: 24,
    alignItems: 'center',
    color: COLORS.SECONDARY_DIM,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_BLUE,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.BORDER_LIGHT_BLUE,

    paddingHorizontal: padding,
    marginBottom: 16,
  },
  agreement: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.GRAY_4,
    marginBottom: 16,
    // textAlign: 'justify'
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: padding,
    marginBottom: 16,
  },

  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    elevation: 10,
  },
  passwordinput: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: 'orange',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d',
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
