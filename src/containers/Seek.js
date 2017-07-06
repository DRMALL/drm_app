import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

const seekIconSelected = require('../images/tabbar_icons/tabbar_search_selected.png')
    , seekIconNormal = require('../images/tabbar_icons/tabbar_search_normal.png')

export default class Seek extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={seekIconSelected}
        style={{tintColor: tintColor}}
      />
    ),
  }
  render() {
    return(
      <View>
        <Text>Hi I Am Seek</Text>
      </View>
    )
  }
}