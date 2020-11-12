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
} from 'react-native';
import {FONT_FAMILY, FONT_BOLD, THEME} from '../styles';
export default class TOSScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <Text style={styles.Title}> ข้อตกลงในใช้งาน </Text>
          <View
            style={{
              backgroundColor: 'gray',
              height: 550,
              width: 350,
              borderRadius: 5,
              alignSelf: 'center',
              elevation: 5,
            }}>
            <ScrollView>
              <Text
                style={{
                  fontFamily: FONT_FAMILY,
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 20,
                  padding: 10,
                }}>
                คำอธิบายเกี่ยวกับระบบ และข้อตกลงในการใช้งาน
                {'\n'} {'\n'}
                1.แอพลิเคชั่นนี้เป็นโปรเจคในการอำนวยความสะดวกให้แก่นักศึกษา
                สาขาวิชาเทคโนโลยีสารสนเทศเท่านั้น {'\n'} (รหัสนักศึกษา 60 - 64)
                {'\n'}
                2. ข้อมูลที่แสดงผลในแอพลิเคชั่น เป็นข้อมูลที่ได้จากการประมวลผล ณ
                เวลาปัจจุบัน หากพบว่าข้อมูลไม่ถูกต้อง
                กรุณาติดต่อผู้ดูแลระบบแอพลิเคชั่น 3.
                ระบบไม่อนุญาตให้นักศึกษานอกเหนือสาขาเทคโนโลยีสารสนเทศใช้งาน
                เนื่องจากข้อจำกัดในปัจจุบัน
                {'\n'}
                4.ข้อมูลรหัสผ่านของท่านที่เก็บในระบบ ไม่ควรตั้งเป็น
                วันเดือนปีเกิด เด็ดขาด เนื่องจากเสี่ยงต่อการถูกแฮก / ขโมยข้อมูล
                5.ข้อมูลรหัสผ่านที่จัดเก็บในฐานข้อมูล
                จะถูกเข้ารหัสด้วยอัลกอริทึม ที่ไม่สามารถถอดรหัสกลับได้
                หากลืมรหัสผ่าน ท่านจะต้องรีเซ็ต และ ตั้งรหัสใหม่เท่านั้น
                ผู้ดูแลระบบไม่สามารถช่วยเหลือในกรณีกู้รหัสผ่านเดิมได้
                {'\n'}
                6.ระบบขอนุญาตส่งการแจ้งเตือนหาท่าน
                ในกรณีมีข่าวหรือเหตุการณ์ใดๆจากผู้ดูแลระบบ
                {'\n'}
                7.หากพบว่าระบบมีข้อผิดพลาด กรุณาส่งอีเมล พร้อมภาพ Screenshot
                ของข้อผิดพลาดนั้นๆมาที่ อีเมล: work@pleum.in.th
                พร้อมระบุแพลตฟอร์มเช่น Android / iOS
                {'\n'}
                8. เมื่อท่านกด 'ตกลง'
                ด้านล่างแล้วถือว่าท่านยอมรับเงื่อนไขและข้อตกลง
                ท่ี่กล่าวมาข้างต้นทุกประการ
              </Text>
            </ScrollView>
          </View>
          <View style={{paddingTop: 20}}>
            <PrimaryButton
              style={{width: '100%'}}
              titleStyle={{fontSize: 25}}
              containerStyle={{width: '100%'}}
              //style={{paddingTop: 20}}
              title={'ยอมรับ'}
              onPress={() => this.props.navigation.navigate('Register')}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.DEFAULT_DARK_MODE2,
  },
  mainView: {},
  Logo: {
    width: 122,
    height: 122,
    alignSelf: 'center',
    marginVertical: 80,
  },
  Title: {
    fontSize: 30,
    fontFamily: FONT_BOLD,
    textAlign: 'center',
    color: '#F2F2F2',
    margin: 20,
  },
  subView: {
    backgroundColor: THEME.DEFAULT_DARK_MODE1,
    marginTop: 30,
    height: 415,
  },
  TextInfo: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontFamily: FONT_BOLD,
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
