import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

const deviceIconSelected = require('../images/tabbar_icons/tabbar_archives_selected.png')
    , deviceIconNormal = require('../images/tabbar_icons/tabbar_archives_normal.png')

export default class Device extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={deviceIconSelected}
        style={{tintColor: tintColor}}
      />
    ),
  })
  render() {
    return(
      <View>
        <Text>Hi I Am Device</Text>
      </View>
    )
  }
}