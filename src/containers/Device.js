import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import TabBarItem from '../components/units/TabBarItem'
import DeviceCategory from '../components/DeviceCategory'

const deviceIconSelected = require('../images/tabbar_icons/tabbar_archives_selected.png')
    , deviceIconNormal = require('../images/tabbar_icons/tabbar_archives_normal.png')

export default class Device extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => (
      <TabBarItem
        tintColor={tintColor}
        focused={focused}
        normalImage={deviceIconNormal} 
        selectedImage={deviceIconSelected} 
      />
    )
  });
  render() {
    return(
      <View style={{paddingBottom: 100}}>
        <DeviceCategory {...this.props}/>
      </View>
    )
  }
}