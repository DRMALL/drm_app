import React, { Component } from 'react'
import { View, Text, Image, ListView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import moment from 'moment'
import socket from 'socket.io-client'
import { Navigator } from 'react-native-deprecated-custom-components'
import Lightbox from 'react-native-lightbox'
import { equipmentName, equipmentRunState, equipmentRunImg, equipmentIndexData, indexDataUpdateTime, equipmentRunningLog } from '../common/strings'
import { subTitleColor, primaryColor } from '../common/constants'
import { equipment } from '../styles'
import { equipmentDataList, equipmentLogList } from '../utils/virtualData'
import IndexData from '../components/equipment/IndexData'
import RunningLog from '../components/equipment/RunningLog'

import store from '../utils/store'
import statuAC from '../actions/statuAC'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')
const emptyIcon = require('../images/navigation_icons/empty.png')
const pic4 = require('../images/pic4.png')

export default class Equipment extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{navigation.state.params.statuItemNumber || '00000000'}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <Image style={{marginLeft: 20}} source={emptyIcon}/>,
  });

  constructor(props) {
    super(props)
    this.state = store.getState().statu
  }

  componentDidMount() {
    statuAC.getEquipData({})
    // this.io = socket(`https://api.wardenger.me/socket`)
    // this.io.on('connect', ()=> {
    //   console.log('connect')
    // })
    // this.io.on('news', (data) => {
    //   statuAC.getEquipData(data)
    //   console.log(data)
    // })
    // this.io.on('connect_error', (error) => {
    //   Alert.alert('错误', '连接错误',
    //     [ {text: 'OK', onPress: () => this.io.close()}, ],
    //     { cancelable: false }
    //   )
    // })
    // this.io.on('connect_timeout', (timeout) => {
    //   Alert.alert('错误', '连接超时',
    //     [ {text: 'OK', onPress: () => this.io.close()}, ],
    //     { cancelable: false }
    //   )
    // })
    // this.io.on('disconnect', ()=> {
    //   console.log('disconnect')
    // })
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(()=> this.setState(store.getState().statu) )
  }

  componentWillUnmount(){
    // this.io.close()
    this.unsubscribe()
  }

  render() {
    let { equipmentData } = this.state
      , { statuItemNumber } = this.props.navigation.state.params
      , isNormal = false
      , equipmentItemData = {}
    equipmentData.map((eqItem, index)=> {
      if(statuItemNumber == eqItem.number) {
        isNormal = true
        equipmentItemData = eqItem
      }
    })
    return (
      <ScrollView style={equipment.wrap}>
        <Text style={equipment.fixText}>{equipmentRunState}</Text>
        <Text style={equipment.stateText}>{isNormal ? '正常' : '异常'}</Text>
        <Text style={equipment.fixText}>{equipmentRunImg}</Text>
        <Lightbox style={equipment.imgView}>
          <Image style={equipment.img} source={pic4}/> 
        </Lightbox>
        <View style={equipment.twoTextView}>
          <Text style={equipment.fix2Text}>{equipmentIndexData}</Text>
          <Text style={[equipment.fix3Text, {position: 'absolute', right: 15}]}>{indexDataUpdateTime + `${moment(equipmentItemData.rnTimestamp).format('YYYY-MM-DD hh:mm')}`}</Text>
        </View>
        <View style={equipment.dataView}>
          <IndexData indexData={equipmentDataList} equipmentItemData={equipmentItemData} {...this.props}/>
        </View>
        <Text style={equipment.fixText}>{equipmentRunningLog}</Text>
        <View style={equipment.logView}>
          { equipmentLogList.map((log, i)=> <RunningLog key={i} log={log} /> ) }
        </View>
      </ScrollView>
    )
  }
}
