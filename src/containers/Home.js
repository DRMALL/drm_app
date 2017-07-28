import React, { Component } from 'react'
import { View, Text, Image, Button } from 'react-native'
import TabBarItem from '../components/units/TabBarItem'
import store from '../utils/store'
import { homeList } from '../utils/virtualData'
import HomeList from '../components/HomeList'

const homeIconSelected = require('../images/tabbar_icons/tabbar_home_selected.png')
    , homeIconNormal = require('../images/tabbar_icons/tabbar_home_normal.png')

export default class Home extends Component {
  static navigationOptions = (props) => ({
    tabBarIcon: ({ focused, tintColor }) => (
      <TabBarItem
        tintColor={tintColor}
        focused={focused}
        normalImage={homeIconNormal} 
        selectedImage={homeIconSelected} 
      />
    ),
  })

  render() {
    return(
      <View>
        <HomeList data={homeList} {...this.props} />
      </View>
    )
  }
}

