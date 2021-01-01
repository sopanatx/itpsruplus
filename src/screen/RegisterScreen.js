import React, {constructor, useContext, useState} from 'react';
import {Component} from 'react';
import {PrimaryButton, RegisterButton} from '../components/button';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {FONT_FAMILY, FONT_BOLD, THEME} from '../styles';
import {Picker} from '@react-native-picker/picker';
import styles from '../styles/RegisterationStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export default class RegisterScreen extends Component {
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
    const onFooterLinkPress = () => {
      navigation.navigate('Login');
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ลงทะเบียนใช้งาน</Text>
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

          <TouchableOpacity style={styles.button} disabled={true}>
            <Text style={styles.buttonTitle}>ลงทะเบียน</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Already got an account?{' '}
              <Text style={styles.footerLink}>Log in</Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
