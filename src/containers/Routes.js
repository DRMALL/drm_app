import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { TabNavigator } from 'react-navigation'
import Home from './Home'
import Device from './Device'
import { primaryColor, subTitleColor } from '../common/constants'
import { homeLabel, diagnoseLabel, deviceLabel, seekLabel, statusLabel } from '../common/strings'
import { home } from '../styles'

export default TabNavigator(
  {
    [homeLabel]: { screen: Home },
    [deviceLabel]: { screen: Device },
    [statusLabel]: { screen: Device },
    [diagnoseLabel]: { screen: Device },
    [seekLabel]: { screen: Device },
  },
  {
    tabBarOptions: {
      activeTintColor: primaryColor,
      inactiveTintColor: subTitleColor,
      labelStyle: {
        paddingBottom: 5
      },
    }
  }
)