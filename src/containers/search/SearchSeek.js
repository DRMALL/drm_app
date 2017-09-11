import React, { Component } from 'react'
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native'
import { mainColor, primaryColor, loginBackgroundColor } from '../../common/constants'
import { inputPartsKeywords, historicalRecord, hotSearch } from '../../common/strings'
import { search } from '../../styles'
import { getWord, saveWord, clearWord, getKeyNum } from '../../utils/searchBuffer'
import Loading from '../../components/units/Loading'
import EmptyContent from '../../components/units/EmptyContent'
import CaptionFix from '../../components/seek/CaptionFix'
import SeekOneItem from '../../components/search/SeekOneItem'
import SeekHeaderSearch from '../../components/search/SeekHeaderSearch'

import store from '../../utils/store'
import seekAC from '../../actions/seekAC'
import getSeekHotword from '../../funcs/search/getSeekHotword'
import getSeekOnchange from '../../funcs/search/getSeekOnchange'
import getSeekSubmit from '../../funcs/search/getSeekSubmit'

const searchIcon = require('../../images/navigation_icons/search.png')
const deleteSweepIcon = require('../../images/navigation_icons/delete_sweep.png')

export default class SearchSeek extends Component {
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
    this.state = store.getState().seek
  }

  componentDidMount () {
    let diagwordRe = []
    getSeekHotword()
    getKeyNum('seek')
    .then( num => {
      getWord('seek', num)
      .then(diagword => {
        diagword.map((item, d)=> {
          diagwordRe = diagwordRe.concat(item[1])
        })
        seekAC.setHistoryData(diagwordRe)
      })
    })
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().seek) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  pressTextTouch(text) {
    getSeekOnchange(text)
    getSeekSubmit()
  }

  pressDeleteSweep() {
    Alert.alert('提示', '是否删除历史记录',
      [ {text: '取消', onPress: () => 'no'}, 
        {text: '确定', onPress: () => {
         getKeyNum('seek')
          .then( num => {
            clearWord('seek', num)
          })
          seekAC.setHistoryData([])
        }},
      ],
      { cancelable: false }
    )
  }


  render() {
    let { navigation } = this.props
      , { searchSeekData, historyData, hotwordData, jumpData } = this.state
      , { pressCleanText } = seekAC
      , dataBugsView
    if(!searchSeekData) {
      dataBugsView = <Loading animating={!searchSeekData ? true : false}/>
    } else {
      dataBugsView = searchSeekData == 0 ? <View style={jumpData ? {height: '100%', backgroundColor: loginBackgroundColor} : {display: 'none'}}>
        <EmptyContent />
      </View> : <ScrollView>
        {
          searchSeekData.map((sekOne, index)=> <SeekOneItem key={index} index={index} state={this.state} sekOne={sekOne} seekDataLength={searchSeekData.length} navigation={navigation} />)
        }
      </ScrollView>
    }
    return (
      <View style={{height: '100%'}}>
        <StatusBar backgroundColor={primaryColor} barStyle='light-content' />
        <SeekHeaderSearch 
          state={this.state} 
          navigation={navigation} 
          cleanText={()=> pressCleanText()}
        />
        <View style={{height: jumpData ? '100%' : 0, backgroundColor: mainColor}}>
          <CaptionFix />
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
