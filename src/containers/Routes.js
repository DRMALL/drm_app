import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import HeaderTitle from '../components/HeaderTitle'
import Home from './Home'
import Device from './Device'
import Status from './Status'
import Diagnose from './Diagnose'
import Seek from './Seek'
import { primaryColor, subTitleColor, backgroundColor } from '../common/constants'
import { homeLabel, diagnoseLabel, deviceLabel, seekLabel, statusLabel } from '../common/strings'
import { home } from '../styles'

import Login from './Login'
import EmailVerify from './login/EmailVerify'
import SetPassword from './login/SetPassword'
import Message from './Message'
import DynamicOrder from './message/DynamicOrder'
import Information from './Information'
import UserName from './information/UserName'
import CompanyName from './information/CompanyName'
import Phone from './information/Phone'
import Address from './information/Address'
import ResetPassword from './information/ResetPassword'
import Equipment from './Equipment'
import Detail from './archives/Detail'
import Calendars from './archives/Calendars'
import TimePoint from './archives/TimePoint'
import Remark from './archives/Remark'
import UploadImage from './archives/UploadImage'
import DiagDetail from './diagnose/DiagDetail'
import PushOrder from './diagnose/PushOrder'
import SeekDetail from './seek/SeekDetail'
import SearchDevice from './search/SearchDevice'
import SearchDiagnose from './search/SearchDiagnose'
import SearchSeek from './search/SearchSeek'
import SearchStatus from './search/SearchStatus'
import HomeDetail from './HomeDetail'
import Datagram from './equipment/Datagram'

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
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: backgroundColor,
      },
      tabStyle: {
        height: 60,
      },
      labelStyle: {
        width: '130%',
        alignSelf: 'center',
        fontSize: 12,
        bottom: 1,
      },
      iconStyle: {
        top: 6,
      },
      indicatorStyle: {
        height: 0,
        // display: 'none'
      },
    }
  }
)

export default StackNavigator({
  login: {
    screen: Login,
  },
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
  emailVerify: {
    screen: EmailVerify,
  },
  setPassword: {
    screen: SetPassword,
  },
  message: {
    screen: Message,
  },
  dynamicOrder: {
    screen: DynamicOrder,
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
  diagDetail: {
    screen: DiagDetail,
  },
  pushOrder: {
    screen: PushOrder,
  },
  seekDetail: {
    screen: SeekDetail,
  },
  searchDevice: {
    screen: SearchDevice,
  },
  searchDiagnose: {
    screen: SearchDiagnose,
  },
  searchSeek: {
    screen: SearchSeek,
  },
  searchStatus: {
    screen: SearchStatus,
  },
  homeDetail: {
    screen: HomeDetail,
  },
  uploadImage: {
    screen: UploadImage,
  },
  datagram: {
    screen: Datagram,
  }
}, {
  transitionConfig:()=>({  
    screenInterpolator: CardStackStyleInterpolator.forHorizontal,  
  }),
})

