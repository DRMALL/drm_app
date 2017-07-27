import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import HeaderTitle from '../components/HeaderTitle'
import Home from './Home'
import Device from './Device'
import Status from './Status'
import Diagnose from './Diagnose'
import Seek from './Seek'
import { primaryColor, subTitleColor } from '../common/constants'
import { homeLabel, diagnoseLabel, deviceLabel, seekLabel, statusLabel } from '../common/strings'
import { home } from '../styles'

import Message from '../components/Message'
import Information from '../components/Information'
import UserName from '../components/information/UserName'
import CompanyName from '../components/information/CompanyName'
import Phone from '../components/information/Phone'
import Address from '../components/information/Address'
import ResetPassword from '../components/information/ResetPassword'
import Equipment from '../components/Equipment'
import Detail from '../components/archives/Detail'
import Calendars from '../components/archives/Calendars'
import TimePoint from '../components/archives/TimePoint'
import Remark from '../components/archives/Remark'

const userIcon = require('../images/navigation_icons/user.png')
const infoIcon = require('../images/navigation_icons/info.png')

const Main = TabNavigator(
  {
    [homeLabel]: { screen: Home },
    [deviceLabel]: { screen: Device },
    [statusLabel]: { screen: Status },
    [diagnoseLabel]: { screen: Diagnose },
    [seekLabel]: { screen: Seek },
  }, 
  {
    swipeEnabled: true,
    animationEnabled: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: primaryColor,
      inactiveTintColor: subTitleColor,
      style: {
        backgroundColor: '#fff',
      },
      tabStyle: {
        height: 60,
        paddingBottom: 3,
      },
      labelStyle: {
        height: 15,
        width: 76,
        fontSize: 12,
        // paddingBottom: 5,
      },
      indicatorStyle: {
        height: 0,
        // display: 'none'
      },
    }
  }
)

export default StackNavigator({
  main: { 
    screen: Main, 
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: primaryColor,
      },
      headerTitle: <HeaderTitle navigation={navigation}/>,
      headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.navigate('information', {name: 'Information'})}>
        <Image source={userIcon}/>
      </TouchableOpacity>,
      headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 18, paddingLeft: 2}} onPress={() => navigation.navigate('message', {name: 'Message'})}>
        <Image source={infoIcon}/>
      </TouchableOpacity>,
    }),
  },
  message: {
    screen: Message,
  },
  information: {
    screen: Information,
  },
  username: {
    screen: UserName,
  },
  companyname: {
    screen: CompanyName,
  },
  phone: {
    screen: Phone,
  },
  address: {
    screen: Address,
  },
  resetpassword: {
    screen: ResetPassword,
  },
  equipment: {
    screen: Equipment,
  },
  detail: {
    screen: Detail,
  },
  calendars: {
    screen: Calendars,
  },
  timePoint: {
    screen: TimePoint,
  },
  equipmentRemark: {
    screen: Remark,
  },
})