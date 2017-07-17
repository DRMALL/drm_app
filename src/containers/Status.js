import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import StatusCategory from '../components/StatusCategory'
import StatusTab from '../components/units/StatusTab'
import { statusList } from '../utils/virtualData'

const statusIconSelected = require('../images/tabbar_icons/tabbar_monitor_selected_x.png')
    , statusIconNormal = require('../images/tabbar_icons/tabbar_monitor_normal.png')

export default class Status extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={statusIconSelected}
        style={{tintColor: tintColor}}
      />
    ),
  }
  render() {
    return(
      <View>
        <StatusTab />
        <StatusCategory data={statusList} />
      </View>
    )
  }
}