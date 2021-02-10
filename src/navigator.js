import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './screen/WelcomeScreen';
import MainUserScreen from './screen/User/MainScreen';
import TimeTableScreen from './screen/User/TimeTableScreen';
import SettingScreen from './screen/SettingScreen';
import LoginScreen from './screen/LoginScreen';
import StudentRecordScreen from './screen/User/StudentRecordScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import TOSScreen from './screen/TOSScreen';
import RegisterScreen from './screen/RegisterScreen';
import {StackActions, NavigationActions} from 'react-navigation';
import StudentCardScreen from './screen/User/StudentCardScreen';
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
  headerShown: false,
  options: {
    gesturesEnabled: false,
    animations: {
      showModal: {
        alpha: {
          from: 0,
          to: 1,
          duration: 300,
        },
      },
    },
  },
};

const resetAction = StackActions.reset({
  index: 0,
  key: null, // <-- this
  actions: [
    NavigationActions.navigate({
      routeName: 'Main',
      component: MainStackNavigator,
    }),
  ],
});
const Tab = createBottomTabNavigator();
const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Main">
        {() => (
          <Tab.Navigator
            automaticallyAdjustContentInsets={false}
            tabBarOptions={{
              activeTintColor: 'orange',
              style: {
                borderTopEndRadius: 15,
                borderTopStartRadius: 15,
              },
              labelStyle: {
                fontFamily: 'SukhumvitTadmai-Bold',
              },
            }}>
            <Tab.Screen
              name="Home"
              component={MainUserScreen}
              options={{
                headerLeft: () => {
                  return <></>;
                },
                tabBarLabel: 'Main',
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="home-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="MyQR"
              component={TimeTableScreen}
              options={{
                tabBarLabel: 'Class',
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="alarm-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="MyProfile"
              component={StudentCardScreen}
              options={{
                tabBarLabel: 'My Profile',
                tabBarIcon: ({color, size}) => (
                  <Ionicons
                    name="person-circle-outline"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="News"
              component={StudentRecordScreen}
              options={{
                tabBarLabel: 'Grade',
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="star-outline" color={color} size={size} />
                ),
              }}
            />

            <Tab.Screen
              name="Setting"
              component={SettingScreen}
              options={{
                tabBarLabel: 'ตั้งค่า',
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="settings-outline" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="TOS" component={TOSScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={MainStackNavigator} />
    </Stack.Navigator>
  );
};
export {MainStackNavigator, ContactStackNavigator, resetAction};
