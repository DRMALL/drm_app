import React, { Component } from 'react'
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native'
import { mainColor, primaryColor, loginBackgroundColor } from '../../common/constants'
import { historicalRecord, hotSearch } from '../../common/strings'
import { search } from '../../styles'
import { getWord, clearWord, getKeyNum } from '../../utils/searchBuffer'
import Loading from '../../components/units/Loading'
import DeviceHeaderSearch from '../../components/search/DeviceHeaderSearch'
import DeviceItem from '../../components/search/DeviceItem'
import EmptyContent from '../../components/units/EmptyContent'

import store from '../../utils/store'
import deviceAC from '../../actions/deviceAC'
import getDeviceHotword from '../../funcs/search/getDeviceHotword'
import getDeviceOnchange from '../../funcs/search/getDeviceOnchange'
import getDeviceSubmit from '../../funcs/search/getDeviceSubmit'

const searchIcon = require('../../images/navigation_icons/search.png')
const deleteSweepIcon = require('../../images/navigation_icons/delete_sweep.png')

export default class SearchDevice extends Component {
  static navigationOptions = {
    headerStyle: {
      width: '200%',
      height: 0,
      left: -50,
      backgroundColor: primaryColor,
    }
  };

  constructor(props) {
    super(props)
    this.state = store.getState().device
  }

  componentDidMount () {
    let diagwordRe = []
    getDeviceHotword()
    getKeyNum('device')
    .then( num => {
      getWord('device', num)
      .then(diagword => {
        diagword.map((item, d)=> {
          diagwordRe = diagwordRe.concat(item[1])
        })
        deviceAC.setHistoryData(diagwordRe)
      })
    })
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().device) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  pressTextTouch(text) {
    getDeviceOnchange(text)
    getDeviceSubmit()
  }

  pressDeleteSweep() {
    Alert.alert('提示', '是否删除历史记录',
      [ {text: '取消', onPress: () => 'no'}, 
        {text: '确定', onPress: () => {
          getKeyNum('device')
          .then( num => {
            clearWord('device', num)
          })
          deviceAC.setHistoryData([])
        }},
      ],
      { cancelable: false }
    )
  }

  render() {
    let { navigation } = this.props
      , { deviceData, historyData, hotwordData, jumpData } = this.state
      , dataDeviceView
    if(!deviceData) {
      dataDeviceView = <Loading animating={!deviceData ? true : false}/>
    } else {
      dataDeviceView = deviceData == 0 ? <ScrollView style={jumpData ? {height: '100%', backgroundColor: loginBackgroundColor} : {display: 'none'}}>
        <EmptyContent />
      </ScrollView> : <ScrollView>
        {
          deviceData.map((deviceOne, index)=> <DeviceItem key={index} index={index} deviceDataLength={deviceData.length} deviceOne={deviceOne} navigation={navigation} />)
        }
      </ScrollView>
    }
    return (
      <View style={{height: '100%'}}>
        <StatusBar backgroundColor={primaryColor} barStyle='light-content'/>
        <DeviceHeaderSearch 
          state={this.state} 
          navigation={navigation} 
        />
        <View style={{height: jumpData ? '100%' : 0, backgroundColor: mainColor}}>
          {dataDeviceView}
          <View style={{height: 1}} />
        </View>
        <View style={{height: jumpData ? 0 : '100%'}}>
          <ScrollView>
            <View style={{position: 'relative', justifyContent: 'center'}}>
              <Text style={search.fixText}>{historicalRecord}</Text>
              <TouchableOpacity style={search.deleteSweep} onPress={()=> this.pressDeleteSweep()}>
                <Image source={deleteSweepIcon}/>
              </TouchableOpacity>
            </View>
            <View style={[search.mapView, {paddingHorizontal: 16}]}>
              {
                historyData.map((historyItem, h1)=> <View key={h1} style={search.historyView}>
                  <TouchableOpacity style={search.touchHistory} onPress={()=> this.pressTextTouch(historyItem)}>
                    <Text style={search.historyText}>{historyItem}</Text>
                  </TouchableOpacity>
                </View>)
              }
            </View>
            <Text style={search.fixText}>{hotSearch}</Text>
            <View style={search.mapView}>
              {
                hotwordData.map((hotItem, h2)=> <TouchableOpacity key={h2} style={search.touchHot} onPress={()=> this.pressTextTouch(hotItem.text)}>
                  <Image style={search.hotSearchIcon} source={searchIcon}/>
                  <Text style={search.hotText}  numberOfLines={2}>{hotItem.text}</Text>
                </TouchableOpacity>)
              }
            </View>
            <View style={{height: 100}}/>
          </ScrollView>
        </View>
      </View>
    )
  }
}
