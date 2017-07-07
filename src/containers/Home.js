import React, { Component } from 'react'
import { View, Text, Image, Button } from 'react-native'

const homeIconSelected = require('../images/tabbar_icons/tabbar_home_selected.png')
    , homeIconNormal = require('../images/tabbar_icons/tabbar_home_normal.png')

export default class Home extends Component {
  static navigationOptions = (props) => ({
    tabBarIcon: ({ tintColor }) => (
      <Image
        onPress={console.log(props)}
        source={homeIconSelected}
        style={{tintColor: tintColor}}
      />
    ),
  })
  render() {
    return(
      <View>
        <Text>Hi I Am Home12</Text>
      </View>
    )
  }
}