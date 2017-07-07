import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
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
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: primaryColor,
      inactiveTintColor: subTitleColor,
      labelStyle: {
        fontSize: 10,
        // paddingBottom: 5
      },
      style: {
        backgroundColor: '#fff',
      },
      indicatorStyle: {
        height: 0,
        // display: 'none'
      }
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
      headerLeft: <Image onPress={() => 'ox'} style={{marginLeft: 24}} source={userIcon}/>,
      headerRight: <Image onPress={() => 'ox'} style={{marginRight: 24}} source={infoIcon}/>
    }),
  },
})


