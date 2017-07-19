import React, { Component } from 'react'
import { View, Text, Image, Button } from 'react-native'
import store from '../utils/store'
import { homeList } from '../utils/virtualData'
import HomeList from '../components/HomeList'

const homeIconSelected = require('../images/tabbar_icons/tabbar_home_selected.png')
    , homeIconNormal = require('../images/tabbar_icons/tabbar_home_normal.png')

export default class Home extends Component {
  static navigationOptions = (props) => ({
    tabBarIcon: ({ tintColor }) => {
      return <Image
        source={homeIconSelected}
        style={{tintColor: tintColor}}
      />
    },
  })

  render() {
    return(
      <View>
        <HomeList data={homeList} {...this.props} />
      </View>
    )
  }
}

