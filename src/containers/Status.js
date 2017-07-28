import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import TabBarItem from '../components/units/TabBarItem'
import { subTitleColor } from '../common/constants'
import StatusCategory from '../components/StatusCategory'
import StatusTab from '../components/units/StatusTab'
import { statusList } from '../utils/virtualData'

const statusIconSelected = require('../images/tabbar_icons/tabbar_monitor_selected_x.png')
    , statusIconNormal = require('../images/tabbar_icons/tabbar_monitor_normal.png')

export default class Status extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => (
      <TabBarItem
        tintColor={tintColor}
        focused={focused}
        normalImage={statusIconNormal} 
        selectedImage={statusIconSelected} 
      />
    )
  });
  render() {
    return(
      <View style={{backgroundColor: subTitleColor, paddingBottom: 50}}>
        <StatusTab />
        <StatusCategory data={statusList} {...this.props} />
      </View>
    )
  }
}