import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import DeviceCategory from '../components/DeviceCategory'

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
      <View style={{paddingBottom: 100}}>
        <DeviceCategory {...this.props}/>
      </View>
    )
  }
}