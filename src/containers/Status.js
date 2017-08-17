import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { subTitleColor, loginBackgroundColor } from '../common/constants'
import { all, onState, offState } from '../common/strings'
import StatusCategory from '../components/StatusCategory'
import TabBarItem from '../components/units/TabBarItem'
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

  constructor(props) {
    super(props)
    let statusArr = [all, onState, offState]
    this.state = (()=> {
      let statuStateObj = {
        statusArr: statusArr,
        situation: all,
      }
      statusArr.map((item, index)=> {
        if(index == 0) statuStateObj[`StatuTabRow${index}`] = true
        else statuStateObj[`StatuTabRow${index}`] = false
      })
      return statuStateObj
    })()
  }

  pressStatusTab(index) {
    this.state.statusArr.map((item, i)=> {
      if(index == i) {
        this.setState({
          [`StatuTabRow${index}`]: true,
          situation: item,
        })
      } else this.setState({[`StatuTabRow${i}`]: false})
    })
  }

  render() {
    let { statusArr, situation } = this.state
      , statusTabList = []
    statusList.map((oneData)=> {
      if(situation == all) statusTabList = statusList
      else if(situation == onState) {
        if(oneData.deviceState) {
          statusTabList = statusTabList.concat(oneData)
        }
      } else {
        if(!oneData.deviceState) {
          statusTabList = statusTabList.concat(oneData)
        }
      }
    })
    return(
      <View style={{height: '100%', backgroundColor: loginBackgroundColor}}>
        <StatusTab tabData={statusArr} state={this.state} pressStatusTab={this.pressStatusTab.bind(this)}/>
        <StatusCategory data={statusTabList} {...this.props} />
      </View>
    )
  }
}