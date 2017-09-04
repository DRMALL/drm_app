import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import socket from 'socket.io-client'
import { subTitleColor, loginBackgroundColor } from '../common/constants'
import { all, onState, offState, tokenKey } from '../common/strings'
import StatusCategory from '../components/StatusCategory'
import TabBarItem from '../components/units/TabBarItem'
import StatusTab from '../components/units/StatusTab'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getMoniterdevs } from '../apis'
import { statusList } from '../utils/virtualData'

import store from '../utils/store'
import statuAC from '../actions/statuAC'
import socketConnectStatu from '../funcs/status/socketConnectStatu'

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
    this.state = store.getState().statu
  }

  componentDidMount() {
    socketConnectStatu()
    this.getAllMoniterdev()
  }

  componentWillMount() {
    // statuAC.getEquipData({})
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().statu) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  getAllMoniterdev() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getMoniterdevs}?token=${token}`)
      if(res.code == 200) {
        statuAC.getStatusData(res.data)
      }
    })
  }

  onStatusRefresh() {
    statuAC.isRefresh()
    // funcs()
    setTimeout(() => {
      statuAC.isnotRefresh()
    }, 2000)
  }

  render() {
    let { statusArr, situation, isRefreshing, statusListData, equipmentData } = this.state
      , statusTabList = []
    statusListData.map((oneData)=> {
      if(situation == all) statusTabList = statusListData
      else if(situation == onState) {
        equipmentData.forEach((existData)=> {
          if(oneData.number == existData.number) {
            statusTabList = statusTabList.concat(oneData)
          }
        })
      } else {
        let outLine = true
        equipmentData.forEach((existData)=> {
          if(oneData.number == existData.number) {
            outLine = false
          }
        })
        if(outLine) statusTabList = statusTabList.concat(oneData)
      }
    })
    return(
      <View style={{height: '100%', backgroundColor: loginBackgroundColor}}>
        <StatusTab tabData={statusArr} state={this.state} />
        <StatusCategory data={statusTabList} equipmentData={equipmentData} onStatusRefresh={this.onStatusRefresh} {...this.props} />
      </View>
    )
  }
}