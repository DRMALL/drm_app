import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import TabBarItem from '../components/units/TabBarItem'

const seekIconSelected = require('../images/tabbar_icons/tabbar_search_selected_x.png')
    , seekIconNormal = require('../images/tabbar_icons/tabbar_search_normal.png')

export default class Seek extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => (
      <TabBarItem
        tintColor={tintColor}
        focused={focused}
        normalImage={seekIconNormal} 
        selectedImage={seekIconSelected} 
      />
    )
  });
  render() {
    return(
      <View>
        <Text>Hi I Am Seek</Text>
      </View>
    )
  }
}