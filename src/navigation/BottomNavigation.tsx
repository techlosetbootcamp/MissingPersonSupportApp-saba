import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/Home';
import FilterReportScreen from '../screens/filterReport/FilterReport';
import ReportFormScreen from '../screens/reportForm/ReportForm';
import ProfileScreen from '../screens/profile/Profile';
import { Image, View, StyleSheet, Text } from 'react-native';
import News from '../screens/news/News';
import {IMAGES} from "../constants/constants"
const homeIcon = IMAGES.home;
const reportsIcon = IMAGES.report;
const uploadIcon = IMAGES.upload;
const profileIcon = IMAGES.profile;
const NewsIcon = IMAGES.news;

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconSource;

            if (route.name === 'Home') {
              iconSource = homeIcon;
            } else if (route.name === 'Reports') {
              iconSource = reportsIcon;
            } else if (route.name === 'Upload') {
              iconSource = uploadIcon;
            } else if (route.name === 'Profile') {
              iconSource = profileIcon;
            } else if (route.name === 'News') {
              iconSource = NewsIcon;
            }

            return (
              <View>
                <Image source={iconSource} />
              </View>
            );
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Text style={[styles.tabBarLabel, { color: focused ? 'blue' : 'black' }]}>
                {route.name}
              </Text>
            );
          },
          tabBarStyle: [
            styles.tabBarStyle,
            (route.name === 'Profile' || route.name === 'Upload') && { display: 'none' }, // Hide tab bar on specific screens
          ],
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Reports" component={FilterReportScreen} />
        <Tab.Screen name="Upload" component={ReportFormScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="News" component={News} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabBarStyle: {
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 26,
    paddingRight: 26,
    height: 62,
    margin: '10%',
    marginTop: 17,
    backgroundColor: '#ffffff',
    borderRadius: 42,
    borderWidth: 2,
    borderColor: '#000000',
  },
  tabBarLabel: {
    fontSize: 12,
    color: 'black',
    fontWeight: 400,
  },
});

export default BottomNavigation;
