import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import HeaderTitle from '../components/HeaderTitle'
import Home from './Home'
import Device from './Device'
import Status from './Status'
import Diagnose from './Diagnose'
import Seek from './Seek'
import { primaryColor, subTitleColor, backgroundColor, lightRedColor } from '../common/constants'
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

import store from '../utils/store'

const userIcon = require('../images/navigation_icons/user.png')
const infoIcon = require('../images/navigation_icons/info.png')

const Main = TabNavigator(
  {
    [homeLabel]: { screen: Home, path: 'home' },
    [deviceLabel]: { screen: Device, path: 'device' },
    [statusLabel]: { screen: Status, path: 'status' },
    [diagnoseLabel]: { screen: Diagnose, path: 'diagnose' },
    [seekLabel]: { screen: Seek, path: 'seek' },
  },
  {
    swipeEnabled: false,
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
        height: 55,
      },
      labelStyle: {
        width: '130%',
        alignSelf: 'center',
        fontSize: 12,
        bottom: Platform.OS === 'ios' ? 1 : -3,
      },
      iconStyle: {
        top: Platform.OS === 'ios' ? 6 : 9,
      },
      indicatorStyle: {
        height: 0,
        // display: 'none'
      },
    },
    initialRouteParams: {
      msgRedShow: true,
    },
    initialRouteName: homeLabel,
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
      headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.navigate('information', { recordMsgRed: navigation.state.params ? navigation.state.params.msgRedShow : false })}>
        <Image source={userIcon}/>
      </TouchableOpacity>,
      headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 18, paddingLeft: 2}}
        onPress={()=> {
          navigation.navigate('message', {disabledPress: true, gobackParams: navigation.state.params && navigation.state.params.msgRedShow ? false : true})
        }}
      >
        <Image source={infoIcon}/>
        <View style={
            navigation.state.params && navigation.state.params.msgRedShow ?
            {width: 8, height: 8, borderRadius: 4, backgroundColor: lightRedColor, position: 'absolute', top: 10, }
             : {}
          }
        />
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
  initialRouteName: 'login',
  initialRouteParams: { initPara: '初始页面参数' },
  transitionConfig:()=>({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
  }),
})
