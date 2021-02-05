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
  Modal,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {FONT_FAMILY, FONT_BOLD, THEME, COLORS} from '../styles';
import {normalize, Overlay} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import {ALERT_MESSAGE} from '../constant/Text';
import Spinner from 'react-native-loading-spinner-overlay';
import {ErrorMessage} from '../constant/Error';

const parseStudentId = (studentId) => {
  return studentId.substr(0, 2);
};

export default class TOSScreen extends Component {
  state = {
    firstName: '',
    lastName: '',
    studentId: '',
    studentEmail: '',
    studentPassword: '',
    nickname: '',
    educateGroup: 1,
    admissionYear: '',
    phoneNumber: '',
    spinner: false,
    isDisabledButtton: false,
  };

  componentDidMount() {}
  _RegisterHandler = async () => {
    const {
      firstName,
      lastName,
      studentId,
      studentEmail,
      studentPassword,
      nickname,
      educateGroup,
      admissionYear,
      phoneNumber,
    } = this.state;

    this.setState({
      spinner: true,
      isDisabledButtton: true,
    });

    const doPost = await fetch('https://api.itpsru.in.th/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        studentFirstName: firstName,
        studentLastName: lastName,
        studentEmail: studentEmail,
        studentPassword: studentPassword,
        nickname: nickname,
        educateGroup: educateGroup,
        admissionYear: parseStudentId(this.state.studentId),
        phoneNumber: phoneNumber,
      }),
    });

    console.log(doPost.status);
    if (doPost.status) {
      this.setState({spinner: false});
      console.log(await doPost.json());
    }

    switch (doPost.status) {
      case 400:
        Alert.alert(
          ErrorMessage.TITLE_REGISTER_FAILED,
          ErrorMessage.APP_REGISTER_BAD_REQ,
        );
        this.setState({isDisabledButtton: false});
        break;
      case 200:
        this.props.navigation.navigate('Home');
        this.setState({spinner: false});
        this.setState({isDisabledButtton: false});
        break;
      case 201:
        // this.props.navigation.navigate('Home');
        this.setState({spinner: false});
        Alert.alert(
          'ลงทะเบียนสำเร็จ',
          'โปรดลงชื่อเข้าใช้ด้วยข้อมูลที่ท่านลงทะเบียนอีกครั้ง',
          [
            {
              text: 'OK',
              onPress: () => this.props.navigation.replace('Login'),
            },
          ],
        );
        break;
      case 409:
        this.setState({spinner: false});
        Alert.alert('ลงทะเบียนไม่สำเร็จ', ErrorMessage.APP_CONFLICT_USER, [
          {
            text: 'OK',
            onPress: () => this.setState({isDisabledButtton: false}),
          },
        ]);
    }
  };
  render() {
    // const register = async () => {
    //   console.log(this.state.educateGroup);
    //   this.setState({spinner: true});
    //   const doPost = await fetch('https://api.itpsru.in.th/auth/register', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       studentId: this.state.studentId,
    //       studentFirstName: this.state.firstName,
    //       studentLastName: this.state.lastName,
    //       studentEmail: this.state.studentEmail,
    //       studentPassword: this.state.studentPassword,
    //       nickname: this.state.nickname,
    //       educateGroup: this.state.educateGroup,
    //       admissionYear: parseStudentId(this.state.studentId),
    //       phoneNumber: this.state.phoneNumber,
    //     }),
    //   });
    //   switch (doPost.status) {
    //     case 400:
    //       Alert.alert(
    //         ErrorMessage.TITLE_REGISTER_FAILED,
    //         ErrorMessage.APP_REGISTER_BAD_REQ +
    //           `\nStatus_Code: ${doPost.status}`,
    //       );
    //       break;
    //     case 200:
    //       this.props.navigation.navigate('Home');
    //       this.setState({spinner: false});
    //       break;
    //     case 201:
    //       // this.props.navigation.navigate('Home');
    //       this.setState({spinner: false});
    //       Alert.alert(
    //         'ลงทะเบียนสำเร็จ',
    //         'โปรดลงชื่อเข้าใช้ด้วยข้อมูลที่ท่านลงทะเบียนอีกครั้ง' +
    //           `\nStatus_Code: ${doPost.status}`,
    //         [
    //           {
    //             text: 'OK',
    //             onPress: () => this.props.navigation.replace('Login'),
    //           },
    //         ],
    //       );
    //       break;
    //   }

    //   console.log(doPost.status);
    //   console.log(await doPost.json());
    // };

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle="dark-content" />

        {this.state.spinner ? <CustomProgressBar /> : null}

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
              maxLength={255}
            />
            <TextInput
              style={styles.input}
              placeholder="สกุล"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => this.setState({lastName: text})}
              value={this.state.lastName}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              maxLength={255}
            />
            <TextInput
              style={styles.input}
              placeholder="ชื่อเล่น"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => this.setState({nickname: text})}
              value={this.state.nickname}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              maxLength={20}
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
              maxLength={10}
            />
            <Picker
              selectedValue={this.state.educateGroup}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({educateGroup: itemValue})
              }>
              <Picker.Item label="กลุ่มเรียน 1" value="1" />
              <Picker.Item label="กลุ่มเรียน 2" value="2" />
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="อีเมล"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => this.setState({studentEmail: text})}
              value={this.state.studentEmail}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              maxLength={100}
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
              maxLength={255}
            />
            <TextInput
              maxLength={10}
              ref="mobileNo"
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              placeholder="หมายเลขโทรศัพท์"
              onChangeText={(text) => this.setState({phoneNumber: text})}
              value={this.state.phoneNumber}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="phone-pad"
            />
            <PrimaryButton
              title="ยอมรับ"
              style={{width: '100%'}}
              containerStyle={{width: '100%'}}
              onPress={() => this._RegisterHandler()}
              disabled={this.state.isDisabledButtton}
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
    fontSize: 24,
    alignItems: 'center',
    color: COLORS.BLACK_1,
    textAlign: 'center',
  },

  subtitle: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    lineHeight: 24,
    // alignItems: 'center',
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
    fontSize: 14,
    //   elevation: 10,
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
const CustomProgressBar = ({visible}) => (
  <Overlay isVisible={visible}>
    <View style={{borderRadius: 10, backgroundColor: 'white', padding: 25}}>
      <ActivityIndicator size="large" color="#FFDE6A" />
      <Text style={{fontSize: 18, fontWeight: '300', fontFamily: FONT_FAMILY}}>
        กำลังประมวลผล กรุณารอสักครู่...
      </Text>
    </View>
  </Overlay>
);
