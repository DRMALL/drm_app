import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

const statusIconSelected = require('../images/tabbar_icons/tabbar_monitor_selected.png')
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
        <Text>Hi I Am Status</Text>
      </View>
    )
  }
}