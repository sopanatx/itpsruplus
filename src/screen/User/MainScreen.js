import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  StatusBar,
  TextInput,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {FONT_FAMILY, FONT_BOLD, THEME} from '../../styles';
import tailwind from 'tailwind-rn';
import axios from 'axios';
import {TEST_API_URL} from '../../constant/API';
import {ApplicationProvider, Layout} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {HeaderBar} from '../../components/headerBar';

import {getActivityCalender} from '../../api/UserApi';
import {convertDate} from '../../utils/misc';
async function getCalendar() {
  const calendar = await axios.get(TEST_API_URL.calendar);
  return calendar.data;
}

let studentData = [];
let studentGrade = [];
class MainUserScreen extends React.Component {
  state = {
    studentCalendar: [],
  };
  async componentDidMount() {
    this.setState({studentCalendar: await getActivityCalender()});
    console.log(this.state.studentCalendar);
  }
  render() {
    return (
      <>
        <SafeAreaView style={tailwind('h-full')}>
          <HeaderBar />
          <Text style={styles.MenuText}>กิจกรรมที่กำลังมาถึง</Text>
          <View style={{}}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={this.state.studentCalendar}
              renderItem={({item}) => (
                <ImageBackground
                  source={{uri: item.activityImage}}
                  style={{
                    width: Dimensions.get('window').height / 6.5,
                    height: Dimensions.get('window').height / 6.5,
                    marginHorizontal: 5,
                    elevation: 10,
                  }}
                  imageStyle={{
                    borderRadius: 9,
                  }}>
                  <View
                    style={{
                      width: Dimensions.get('window').height / 6.5,
                      height: Dimensions.get('window').height / 6.5,
                      borderRadius: 9,
                      backgroundColor: 'rgba(68, 129, 235, 0.35)',
                    }}>
                    <Text style={styles.CalendarDateText}>
                      {convertDate(item.activityStartDate)}
                    </Text>
                    <Text style={styles.CalendarInfoText}>
                      {item.activityName}
                    </Text>
                  </View>
                </ImageBackground>
              )}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    resizeMode: 'stretch',
    flex: 1,
    height: '100%',
    width: '100%',

    // backgroundColor: THEME.DEFAULT_DARK_MODE1,
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
    fontSize: RFPercentage(5),
    textAlign: 'center',
    marginVertical: -60,
  },
  MenuText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: RFPercentage(3),
    padding: 20,
    textAlign: 'left',
  },
  MenuText1: {
    fontFamily: 'Anuphan-Bold',
    fontSize: 28,
    marginTop: 10,
    textAlign: 'center',
  },
  CalendarDateText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    textAlign: 'left',
    marginTop: 3,
    margin: 7,
  },
  CalendarInfoText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 14,
    color: 'white',
    //textAlign: 'right',
    alignContent: 'center',
    position: 'relative', //Here is the trick
    bottom: 2, //Here is the trick
  },
  StudentName: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    textAlign: 'left',
    marginHorizontal: 25,
    marginTop: 10,
  },
  MajorName: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    textAlign: 'left',
    marginHorizontal: 25,
    marginTop: 10,
  },
  studentGradeInfoText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 30,
    textAlign: 'center',
    color: '#f4f4f4',
    marginTop: 10,
  },
  myGradeText: {
    fontFamily: 'DBHelvethaicaX-Bd',
    fontSize: 25,
    textAlign: 'center',
    color: '#f2f2f2',
    marginTop: 10,
  },
});
export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <MainUserScreen />
  </ApplicationProvider>
);
