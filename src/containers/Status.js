import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import socket from 'socket.io-client'
import { subTitleColor, loginBackgroundColor } from '../common/constants'
import { all, onState, offState } from '../common/strings'
import StatusCategory from '../components/StatusCategory'
import TabBarItem from '../components/units/TabBarItem'
import StatusTab from '../components/units/StatusTab'
import { statusList } from '../utils/virtualData'

import store from '../utils/store'
import statuAC from '../actions/statuAC'

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
    this.socketConnectStatu()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().statu) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  socketConnectStatu() {
    this.io = socket(`http://139.129.44.18:17954?token=900150983cd24fb0d6963f7d28e17f72&key=&values=&timestamps=`)
    this.io.on('connect', ()=> {
      // this.setState(()=> {
      //   return {
      //     connect: 'connect',
      //   }
      // })
      console.log('connect')
    })
    this.io.on('message', (res) => {
      // this.setState(res)
      console.log('message')
    })
    this.io.on('disconnect', ()=> {
      // this.setState(()=> {
      //   return {
      //     connect: 'disconnect',
      //   }
      // })
      console.log('disconnect')
    })
  }

  onStatusRefresh() {
    statuAC.isRefresh()
    // this.getNewsList()
    setTimeout(() => {
      statuAC.isnotRefresh()
    }, 2000)
  }

  render() {
    let { statusArr, situation, isRefreshing } = this.state
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
        <StatusTab tabData={statusArr} state={this.state} />
        <StatusCategory data={statusTabList} onStatusRefresh={this.onStatusRefresh} {...this.props} />
      </View>
    )
  }
}