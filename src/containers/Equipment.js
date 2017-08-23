import React, { Component } from 'react'
import { View, Text, Image, ListView, ScrollView, TouchableOpacity } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import Lightbox from 'react-native-lightbox'
import { equipmentName, equipmentRunState, equipmentRunImg, equipmentIndexData, indexDataUpdateTime, equipmentRunningLog } from '../common/strings'
import { subTitleColor, primaryColor } from '../common/constants'
import { equipment } from '../styles'
import { equipmentDataList, equipmentLogList } from '../utils/virtualData'

import IndexData from '../components/equipment/IndexData'
import RunningLog from '../components/equipment/RunningLog'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')
const emptyIcon = require('../images/navigation_icons/empty.png')
const pic4 = require('../images/pic4.png')

export default class Equipment extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{navigation.state.params.statuItemData.deviceNo}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <Image style={{marginLeft: 20}} source={emptyIcon}/>,
  })
  render() {
    let { statuItemData } = this.props.navigation.state.params
    return (
      <ScrollView style={equipment.wrap}>
        <Text style={equipment.fixText}>{equipmentRunState}</Text>
        <Text style={equipment.stateText}>{statuItemData.normal ? '正常' : '异常'}</Text>
        <Text style={equipment.fixText}>{equipmentRunImg}</Text>
        <Lightbox style={equipment.imgView}>
          <Image style={equipment.img} source={pic4}/> 
        </Lightbox>
        <View style={equipment.twoTextView}>
          <Text style={equipment.fix2Text}>{equipmentIndexData}</Text>
          <Text style={[equipment.fix3Text, {position: 'absolute', right: 15}]}>{indexDataUpdateTime + statuItemData.updateTime}</Text>
        </View>
        <View style={equipment.dataView}>
          <IndexData indexData={equipmentDataList} {...this.props}/>
        </View>
        <Text style={equipment.fixText}>{equipmentRunningLog}</Text>
        <View style={equipment.logView}>
          { equipmentLogList.map((log, i)=> <RunningLog key={i} log={log} /> ) }
        </View>
      </ScrollView>
    )
  }
}
