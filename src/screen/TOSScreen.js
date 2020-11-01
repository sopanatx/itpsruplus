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
                2.แอพลิเคชั่นจะมีการเก็บ Log หากตรวจพบการกระทำที่ผิดปกติ
                {'\n'}
                3. แอพลิเคชั่นนี้ใช้การสื่อสารระหว่างฐานข้อมูลด้วย API Server
                ที่มีการเข้ารหัสด้วย SSL
                โดยจะทำให้ผู้ใช้มั่นใจได้ว่าจะไม่มีการดักฟัง / อ่านข้อมูลกลางทาง
                {'\n'}
                4. แอพลิเคชั่นนี้ มีการจัดเก็บข้อมูลรหัสผ่าน
                ที่มีการเข้ารหัสด้วยอัลกอลิทึมของ Bcrypt และมีการ Salt
                ทำให้รหัสผ่านของท่านที่เก็บในฐานข้อมูล
                จะไม่สามารถถูกดูได้โดยผู้ดูแลระบบ
                และไม่สามารถถอดรหัสได้นอกจากตัวท่านเอง
                {'\n'}
                5. ผู้พัฒนาแอพลิเคชั่นมีการตรวจสอบการเข้าถึง API อย่างรัดกุม
                เพื่อให้ข้อมูลส่วนตัวของท่าน จัดเก็บด้วยความปลอดภัย
                {'\n'}
                6. จะไม่มีการเปิดเผยข้อมูลส่วนตัวใดๆของท่านแก่บุคคลใดๆ
                และไม่นำข้อมูลของท่านไปใช้ประโยชน์ด้านอื่น
                {'\n'}
                7. ผู้พัฒนาแอพพลิเคชั่น ขอสงวนสิทธิ์ที่จะ ระงับ / ลบบัญชีของท่าน
                หากพบว่า มีการพยายามโจมตี API Server
                หรือการพยายามแสวงหาช่องโหว่ของระบบ โดยไม่ได้รับอนุญาต
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
              onPress={() =>
                Alert.alert(
                  'Error',
                  'เวอร์ชั่นของท่าน ไม่รองรับการกระทำดังกล่าว โปรดอัพเดทเป็นเวอร์ชั่นล่่าสุด',
                )
              }
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
