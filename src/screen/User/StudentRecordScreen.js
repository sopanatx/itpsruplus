import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  LogBox,
  ActivityIndicator,
} from 'react-native';
import {Card, Overlay} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  getAllGrade,
  getAvailableSemester,
  getGradeBySemester,
} from '../../api/StudentGradeApi';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT_FAMILY, FONT_BOLD} from '../../styles';
import {HeaderBar} from '../../components/headerBar';
import EncryptedStorage from 'react-native-encrypted-storage';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
async function regexClassID() {
  const jwtToken = await EncryptedStorage.getItem('accessToken');
  const studentId = await EncryptedStorage.getItem('studentID');
  return studentId;
}

const _GetGradeHandler = async () => {
  const semesterList = await getAvailableSemester();
  const lastSemester = semesterList;
  const gradeResponse = await getAllGrade();
  return {
    gradeResponse,
    lastSemester: semesterList[lastSemester.length - 1],
  };
};

export default class StudentRecordScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    studentID: '',
    studentGrade: [],
    semesterList: [],
    lastSemester: '',
    isLoading: true,
    timestamp: 0,
    gpa: 0,
    major: 0,
    countries: ['uk'],
  };

  async componentDidMount() {
    const data = await _GetGradeHandler();
    //console.log('data --->', data.gradeResponse.data);

    this.setState({
      studentId: data.gradeResponse.studentInfo.studentId,
      timestamp: moment().format('DD-MM-YYYY hh:mm:ss'),
      studentGrade: data.gradeResponse.data,
      lastSemester: data.lastSemester,
      semesterList: data.gradeResponse.semesterInfo.availableSemesterData,
      gpa: data.gradeResponse.TotalCalculateGrade.TotalAverageGrade,
      major: data.gradeResponse.TotalCalculateGrade.TotalMainSubjectGrade,
      isLoading: false,
    });
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  ChangeSemesterView = async (e) => {
    if (e != this.state.lastSemester) {
      this.setState({isLoading: true});

      const response = await getGradeBySemester(e).then((result) => {
        console.log('RSP->', result.data);
        this.setState({studentGrade: []});
        this.setState({
          lastSemester: e,
          studentGrade: result.data,
          isLoading: false,
        });
      });
    }
  };
  render() {
    return (
      <View>
        <HeaderBar />
        <ScrollView contentContainerStyle={{paddingBottom: 80}}>
          <View style={{alignItems: 'center', width: wp('100%')}}>
            {this.state.isLoading ? (
              <CustomProgressBar visible={this.state.isLoading} />
            ) : (
              <View>
                <Text
                  style={{
                    margin: 10,
                    fontFamily: FONT_FAMILY,
                    textAlign: 'center',
                    fontSize: 14,
                  }}>
                  ข้อมูลของภาคเรียนที่ {this.state.lastSemester} {'\n'}
                  ปรับปรุงล่าสุด : {this.state.timestamp}
                </Text>

                <Picker
                  itemStyle={{fontFamily: FONT_FAMILY}}
                  mode="dropdown"
                  selectedValue={this.state.lastSemester}
                  style={styles.input}
                  onValueChange={(e) => this.ChangeSemesterView(e)}>
                  {Object.keys(this.state.semesterList).map((key) => {
                    return (
                      <Picker.Item
                        label={`ภาคเรียนที่: ${this.state.semesterList[key]}`}
                        value={this.state.semesterList[key]}
                        key={key}
                      />
                    );
                  })}
                </Picker>

                <Card
                  containerStyle={{
                    borderRadius: 10,
                    width: wp('90%'),
                    height: wp('35%'),
                  }}
                  wrapperStyle={{fontFamily: FONT_FAMILY}}>
                  <Text
                    style={{
                      marginBottom: 16,
                      fontFamily: FONT_BOLD,
                      textAlign: 'center',
                      fontSize: 18,
                    }}>
                    ผลการเรียนเฉลี่ย
                  </Text>
                  <Card.Divider />

                  <Text
                    style={{
                      marginBottom: 12,
                      fontFamily: FONT_BOLD,
                      textAlign: 'center',
                      fontSize: 30,
                      color: 'orange',
                    }}>
                    {this.state.gpa}
                  </Text>
                </Card>
                <Card
                  containerStyle={{
                    borderRadius: 10,
                    width: wp('90%'),
                    height: wp('35%'),
                  }}>
                  <Text
                    style={{
                      marginBottom: 16,
                      fontFamily: FONT_BOLD,
                      textAlign: 'center',
                      fontSize: 18,
                    }}>
                    ค่าเฉลี่ยวิชาเอก
                  </Text>
                  <Card.Divider />

                  <Text
                    style={{
                      marginBottom: 12,
                      fontFamily: FONT_BOLD,
                      textAlign: 'center',
                      fontSize: 30,
                      color: 'orange',
                    }}>
                    {this.state.major}
                  </Text>
                </Card>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={this.state.studentGrade}
                  renderItem={({item}) => (
                    <View
                      style={{
                        width: wp('90%'),
                        height: wp('35%'),
                        backgroundColor: '#f2f2f2',
                        margin: 10,
                        borderRadius: 8,
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        borderLeftColor: '#F8804D',
                        borderLeftWidth: 9,
                      }}>
                      <Text style={styles.SubjectText}>
                        ภาคเรียน : {this.state.lastSemester} {'\n'}
                        {item.subjectCode} {''}
                        {item.subjectName}
                      </Text>
                      <Text style={styles.SubjectValue}>
                        <Text style={{color: 'orange'}}>
                          {item.studentGrade}
                        </Text>
                      </Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}
          </View>
          <View style={{height: 100}}></View>
        </ScrollView>
      </View>
    );
  }
}
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
  HeaderText: {
    fontFamily: FONT_BOLD,
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
    color: '#4C4C4C',
  },

  SubjectText: {
    fontFamily: FONT_BOLD,
    fontSize: 14,
    textAlign: 'left',
    color: 'black',
    padding: 9,
    // paddingVertical: 10,
  },
  SubjectValue: {
    fontFamily: FONT_BOLD,
    fontSize: 24,
    textAlign: 'right',
    color: 'black',
    paddingRight: 10,
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
  },
});
const CustomProgressBar = ({visible}) => (
  <Overlay isVisible={visible}>
    <View style={{borderRadius: 10, backgroundColor: 'white', padding: 25}}>
      <ActivityIndicator size="large" color="#FFDE6A" />
      <Text style={{fontSize: 14, fontWeight: '300', fontFamily: FONT_FAMILY}}>
        กำลังประมวลผล กรุณารอสักครู่...
      </Text>
    </View>
  </Overlay>
);
