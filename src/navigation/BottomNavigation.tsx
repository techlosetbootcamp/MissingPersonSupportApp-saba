import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/Home';
import { colors } from '../constants/colors';
import {
  ReportForm,
  FilterReport,
  ProfileScreen,
  News,
} from '../constants/constants';
import {Image, View, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {IMAGES} from '../constants/constants';

const homeIcon = IMAGES?.home;
const reportsIcon = IMAGES?.report;
const uploadIcon = IMAGES?.upload;
const profileIcon = IMAGES?.profile;
const NewsIcon = IMAGES?.news;

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height; 

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({route}) => ({
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
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={[
                  styles.tabBarLabel,
                  { 
                    color: focused ? colors.skyBlue : colors.charcoal,
                    marginLeft: isLandscape ? 15 : 0, 
                  },
                ]}>
                {route.name}
              </Text>
            );
          },
          tabBarStyle: [
            styles.tabBarStyle,
            (route.name === 'Profile' || route.name === 'Upload') && {
              display: 'none',
            },
          ],
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Reports" component={FilterReport} />
        <Tab.Screen name="Upload" component={ReportForm} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="News" component={News} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whitish,
  },
  tabBarStyle: {
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 26,
    paddingRight: 26,
    height: 62,
    margin: '10%',
    marginTop: 17,
    backgroundColor: colors.whitish,
    borderRadius: 42,
    borderWidth: 2,
    borderTopWidth: 2,
    borderColor: colors.charcoal,
  },
  tabBarLabel: {
    fontSize: 12,
    color: colors.charcoal,
    fontWeight: '400',
  },
});

export default BottomNavigation;
