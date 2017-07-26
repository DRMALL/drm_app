import React, { Component } from 'react'
import { View, Text, Image, ListView, ScrollView, TouchableOpacity } from 'react-native'
import { equipmentName, equipmentRunState, equipmentRunImg, equipmentIndexData, indexDataUpdateTime, equipmentRunningLog } from '../common/strings'
import { subTitleColor, primaryColor } from '../common/constants'
import { equipment } from '../styles'
import { equipmentDataList, equipmentLogList } from '../utils/virtualData'

import IndexData from './equipment/IndexData'
import RunningLog from './equipment/RunningLog'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')
const emptyIcon = require('../images/navigation_icons/empty.png')
const pic4 = require('../images/pic4.png')

export default class Equipment extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{equipmentName}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <Image style={{marginLeft: 20}} source={emptyIcon}/>,
  })
  render() {
    return (
      <ScrollView style={equipment.wrap}>
        <Text style={equipment.fixText}>{equipmentRunState}</Text>
        <Text style={equipment.stateText}>正常</Text>
        <Text style={equipment.fixText}>{equipmentRunImg}</Text>
        <View style={equipment.imgView}>
          <Image style={equipment.img} source={pic4}/>
        </View>
        <View style={equipment.twoTextView}>
          <Text style={equipment.fix2Text}>{equipmentIndexData}</Text>
          <Text style={[equipment.fix2Text, {position: 'absolute', right: 15}]}>{indexDataUpdateTime + '2017-07-19 19:30'}</Text>
        </View>
        <View style={equipment.dataView}>
          <IndexData indexData={equipmentDataList} />
        </View>
        <Text style={equipment.fixText}>{equipmentRunningLog}</Text>
        <View style={equipment.logView}>
          { equipmentLogList.map((log, i)=> <RunningLog key={i} log={log} /> ) }
        </View>
      </ScrollView>
    )
  }
}
