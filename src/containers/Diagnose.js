import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

const diagnoseIconSelected = require('../images/tabbar_icons/tabbar_diagnosis_selected_x.png')
    , diagnoseIconNormal = require('../images/tabbar_icons/tabbar_diagnosis_normal.png')

export default class Diagnose extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={diagnoseIconSelected}
        style={{tintColor: tintColor}}
      />
    ),
  }
  render() {
    return(
      <View>
        <Text>Hi I Am Diagnose</Text>
      </View>
    )
  }
}