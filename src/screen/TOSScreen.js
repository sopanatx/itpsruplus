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
} from 'react-native';
import {FONT_FAMILY, FONT_BOLD, THEME, COLORS} from '../styles';
import {normalize} from 'react-native-elements';
import {getPolicyText} from '../constant/Text';
export default class TOSScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle="dark-content" />

        <View style={styles.header}>
          <Text style={styles.title}>ลงทะเบียน </Text>
          <Text style={styles.subtitle}>
            โปรดอ่านคำอธิบายและข้อตกลงเพื่อทำความเข้าใจก่อนการใช้งาน
          </Text>
        </View>

        <View style={styles.content}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: 'white',
            }}
            style={{
              borderColor: COLORS.GRAY_2,
              borderWidth: 1,
              borderRadius: 4,
            }}>
            <View style={{padding: 16}}>
              <Text style={styles.agreement}>{getPolicyText()} </Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <PrimaryButton
            title="ยอมรับ"
            style={{width: '100%'}}
            containerStyle={{width: '100%'}}
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}
            disabled={false}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const padding = normalize(16);
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
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
});
