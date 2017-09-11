import React, { Component } from 'react'
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native'
import { mainColor, primaryColor, loginBackgroundColor } from '../../common/constants'
import { historicalRecord, hotSearch } from '../../common/strings'
import { search } from '../../styles'
import { getWord, clearWord, getKeyNum } from '../../utils/searchBuffer'
import Loading from '../../components/units/Loading'
import EmptyContent from '../../components/units/EmptyContent'
import StatusOneItem from '../../components/search/StatusOneItem'
import StatusHeaderSearch from '../../components/search/StatusHeaderSearch'

import store from '../../utils/store'
import statuAC from '../../actions/statuAC'
import getStatusHotword from '../../funcs/search/getStatusHotword'
import getStatusOnchange from '../../funcs/search/getStatusOnchange'
import getStatusSubmit from '../../funcs/search/getStatusSubmit'

const searchIcon = require('../../images/navigation_icons/search.png')
const deleteSweepIcon = require('../../images/navigation_icons/delete_sweep.png')

export default class SearchStatus extends Component {
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
    this.state = store.getState().statu
  }

  componentDidMount () {
    let diagwordRe = []
    getStatusHotword()
    getKeyNum('statu')
    .then( num => {
      getWord('statu', num)
      .then(diagword => {
        diagword.map((item, d)=> {
          diagwordRe = diagwordRe.concat(item[1])
        })
        statuAC.setHistoryData(diagwordRe)
      })
    })
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().statu) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  pressTextTouch(text) {
    getStatusOnchange(text)
    getStatusSubmit()
  }

  pressDeleteSweep() {
    Alert.alert('提示', '是否删除历史记录',
      [ {text: '取消', onPress: () => 'no'}, 
        {text: '确定', onPress: () => {
          getKeyNum('statu')
          .then( num => {
            clearWord('statu', num)
          })
          statuAC.setHistoryData([])
        }},
      ],
      { cancelable: false }
    )
  }

  render() {
    let { navigation } = this.props
      , { statusData, historyData, hotwordData, jumpData } = this.state
      , dataBugsView
    if(!statusData) {
      dataBugsView = <Loading animating={!statusData ? true : false}/>
    } else {
      dataBugsView = statusData == 0 ? <View style={jumpData ? {height: '100%', backgroundColor: loginBackgroundColor} : {display: 'none'}}>
        <EmptyContent />
      </View> : <ScrollView>
        {
          statusData.map((statuOne, index)=> <StatusOneItem key={index} statuOne={statuOne} navigation={navigation} dataLength={statusData.length} rowID={index} />)
        }
      </ScrollView>
    }
    return (
      <View style={{height: '100%'}}>
        <StatusBar backgroundColor={primaryColor} barStyle='light-content'/>
        <StatusHeaderSearch 
          state={this.state} 
          navigation={navigation} 
        />
        <View style={{height: jumpData ? '100%' : 0, backgroundColor: mainColor}}>
          {dataBugsView}
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
                  <Text style={search.hotText}>{hotItem.text}</Text>
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
