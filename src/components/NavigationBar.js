import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
//Will use this once branches have merged: import SearchScreen from ''
//Will use this once branches have merged: import ProfileRoom from ''
//Temporary screens I am using
import SearchScreen from '../screens/SearchScreen'
import TempProfileRoom from '../screens/TempProfileRoom'
import { Image, Text } from 'react-native'
import HomeIcon from '../../assets/images/HomeIcon.png'
import SearchIcon from '../../assets/images/SearchIcon.png'
import ProfileRoomIcon from '../../assets/images/ProfileRoomIcon.png'

//Creating an instance of the bottom tab navigator
const Tab = createBottomTabNavigator(); 

//Implementing bottom tab bar, including each images, and text to match the colour black 
//Adding Home, Search and Profile Room in the bottom tab navigation
const NavigationBar = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarLabelStyle: { color: 'black'} }}>
      <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarIcon: ({ size }) => (
          <Image source={HomeIcon} style={{ width: size, height: size, tintColor: 'black' }}
          />
        ), 
        headerShown: false, 
      }} />
      <Tab.Screen name='Search' component={SearchScreen} options={{
        tabBarIcon: ({ size }) => (
          <Image source={SearchIcon} style={{ width: size, height: size }}
          />
        ), 
        headerShown: false, 
      }} />
      <Tab.Screen name='Profile Room' component={TempProfileRoom} options={{
        tabBarIcon: ({ size }) => (
          <Image source={ProfileRoomIcon} style={{ width: size, height: size, tintColor: 'black' }}
          />
        ), 
        headerShown: false, 
      }} />
    </Tab.Navigator>
  )
}

export default NavigationBar;