import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {THEME} from '../styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
export const HeaderBar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [studentID, setStudentID] = useState('');
  useEffect(() => {
    EncryptedStorage.getItem('studentName').then((result) => {
      setUsername(result);
    });
    EncryptedStorage.getItem('studentID').then((result) => {
      setStudentID(result);
      setIsLoading(false);
    });
  }, []);
  return (
    <View style={styles.header}>
      <ImageBackground
        source={require('../assets/images/HeadImage_3x.png')}
        style={styles.image}
        imageStyle={{borderBottomRightRadius: 250}}>
        <View
          style={{
            backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
            borderBottomRightRadius: 250,
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
          }}>
          <SkeletonContent
            containerStyle={{
              width: 300,
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}
            boneColor="#ffffff"
            animationDirection="horizontalRight"
            layout={[
              // long line
              {
                width: 220,
                height: 20,
                marginBottom: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.72)',
              },
              // short line
              {
                width: 180,
                height: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.72)',
                marginBottom: 10,
              },
              {
                width: 180,
                height: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.72)',
                marginBottom: 10,
              },
              // ...
            ]}
            isLoading={isLoading}>
            <Text style={styles.TitleText}>สวัสดี, คุณ {username}</Text>
            <Text style={styles.MajorName}>{studentID}</Text>
            <Text style={styles.MajorName}>สาขาวิชา เทคโนโลยีสารสนเทศ</Text>
          </SkeletonContent>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    resizeMode: 'cover',
    flex: 1,
    height: '100%',
    width: '100%',
  },

  header: {
    width: '120%',
    height: Dimensions.get('window').height / 4.5,
  },
  Logo: {
    height: 66,
    width: 66,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 15,
  },
  HeadImage: {width: 424, height: 165, shadowOpacity: 10},
  TitleText: {
    fontFamily: 'SukhumvitTadmai-Bold',
    fontSize: 18,
    textAlign: 'left',
    color: '#f2f2f2',
  },
  MajorName: {
    fontFamily: 'SukhumvitTadmai-Bold',
    fontSize: 14,
    textAlign: 'left',
    color: '#f2f2f2',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
