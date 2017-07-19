import React, { Component } from 'react'
import { View, Text, Image, ListView, ScrollView, TouchableOpacity } from 'react-native'
import { equipmentName } from '../common/strings'
import { subTitleColor, primaryColor } from '../common/constants'
import { equipment } from '../styles'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')
const emptyIcon = require('../images/navigation_icons/empty.png')
const pic4 = require('../images/pic4.png')
const dropdownNormal = require('../images/dropdown_normal.png')

export default class Equipment extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{equipmentName}</Text>,
    headerLeft: <TouchableOpacity style={{paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <Image style={{marginLeft: 20}} source={emptyIcon}/>,
  })
  render() {
    return (
      <ScrollView style={equipment.wrap}>
        <Text style={equipment.fixText}>运行状态</Text>
        <Text style={equipment.stateText}>正常</Text>
        <Text style={equipment.fixText}>运行图示（点击图片放大）</Text>
        <View style={equipment.imgView}>
          <Image style={equipment.img} source={pic4}/>
        </View>
        <View style={equipment.twoTextView}>
          <Text style={equipment.fix2Text}>指标数据</Text>
          <Text style={[equipment.fix2Text, {position: 'absolute', right: 15}]}>更新时间: 2017-07-19 19:30</Text>
        </View>
        <View style={equipment.dataView}>
          <TouchableOpacity style={equipment.dataTouch} onPress={()=> 'touch'}>
            <Text style={equipment.textTouch}>本类别数据名称</Text>
            <Image style={equipment.imgTouch} source={dropdownNormal}/>
          </TouchableOpacity>
          <TouchableOpacity style={equipment.dataTouch} onPress={()=> 'touch'}>
            <Text style={equipment.textTouch}>本类别数据名称</Text>
            <Image style={equipment.imgTouch} source={dropdownNormal}/>
          </TouchableOpacity>
          <TouchableOpacity style={equipment.dataTouch} onPress={()=> 'touch'}>
            <Text style={equipment.textTouch}>本类别数据名称</Text>
            <Image style={equipment.imgTouch} source={dropdownNormal}/>
          </TouchableOpacity>
          <TouchableOpacity style={equipment.dataTouch} onPress={()=> 'touch'}>
            <Text style={equipment.textTouch}>本类别数据名称</Text>
            <Image style={equipment.imgTouch} source={dropdownNormal}/>
          </TouchableOpacity>
        </View>
        <Text style={equipment.fixText}>运行日志</Text>
        <View style={equipment.logView}>
          <Text style={equipment.logText}>2017-05-05 15:21:32  设备点火</Text>
          <Text style={equipment.logText}>2017-05-05 15:21:32  设备点火</Text>
          <Text style={equipment.logText}>2017-05-05 15:21:32  设备点火</Text>
          <Text style={equipment.logText}>2017-05-05 15:21:32  设备点火</Text>
          <Text style={equipment.logText}>2017-05-05 15:21:32  设备点火</Text>
        </View>
      </ScrollView>
    )
  }
}