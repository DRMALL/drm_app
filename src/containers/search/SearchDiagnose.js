import React, { Component } from 'react'
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native'
import { mainColor, primaryColor, mainColorPressed, loginBackgroundColor } from '../../common/constants'
import { historicalRecord, hotSearch, unsolvedGoToPushOrder } from '../../common/strings'
import { search, diagDetail } from '../../styles'
import { getWord, clearWord, getKeyNum } from '../../utils/searchBuffer'
import Button from '../../components/units/Button'
import Loading from '../../components/units/Loading'
import DiagBugsItem from '../../components/search/DiagBugsItem'
import DiagHeaderSearch from '../../components/search/DiagHeaderSearch'
import EmptyContent from '../../components/units/EmptyContent'

import store from '../../utils/store'
import diagnoseAC from '../../actions/diagnoseAC'
import getBugsHotword from '../../funcs/search/getBugsHotword'
import getBugsOnchange from '../../funcs/search/getBugsOnchange'
import getBugsSubmit from '../../funcs/search/getBugsSubmit'

const searchIcon = require('../../images/navigation_icons/search.png')
const deleteSweepIcon = require('../../images/navigation_icons/delete_sweep.png')

export default class SearchDiagnose extends Component {
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
    this.state = store.getState().diagnose
  }

  componentDidMount () {
    let diagwordRe = []
    getBugsHotword()
    getKeyNum('diagnose')
    .then( num => {
      getWord('diagnose', num)
      .then(diagword => {
        diagword.map((item, d)=> {
          diagwordRe = diagwordRe.concat(item[1])
        })
        diagnoseAC.setHistoryData(diagwordRe)
      })
    })
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().diagnose) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  pressTextTouch(text) {
    getBugsOnchange(text)
    getBugsSubmit()
  }

  pressDeleteSweep() {
    Alert.alert('提示', '是否删除历史记录',
      [ {text: '取消', onPress: () => 'no'}, 
        {text: '确定', onPress: () => {
          getKeyNum('diagnose')
          .then( num => {
            clearWord('diagnose', num)
          })
          diagnoseAC.setHistoryData([])
        }},
      ],
      { cancelable: false }
    )
  }

  render() {
    let { navigation } = this.props
      , { bugsData, historyData, hotwordData, jumpData } = this.state
      , { pressCleanText } = diagnoseAC
      , dataBugsView
    if(!bugsData) {
      dataBugsView = <Loading animating={!bugsData ? true : false}/>
    } else {
      dataBugsView = bugsData == 0 ? <ScrollView style={jumpData ? {height: '100%', backgroundColor: loginBackgroundColor} : {display: 'none'}}>
        <EmptyContent />
      </ScrollView> : <ScrollView>
        {
          bugsData.map((bugOne, index)=> <DiagBugsItem key={index} state={this.state} bugOne={bugOne} navigation={navigation} />)
        }
      </ScrollView>
    }
    return (
      <View style={{height: '100%'}}>
        <StatusBar backgroundColor={primaryColor} barStyle='light-content'/>
        <DiagHeaderSearch 
          state={this.state} 
          navigation={navigation} 
          cleanText={()=> pressCleanText()}
        />
        <View style={{height: jumpData ? '100%' : 0, backgroundColor: mainColor}}>
          {dataBugsView}
          <View style={[diagDetail.buttonViewSearch, { bottom: 0, borderWidth: 0.5, borderColor: mainColorPressed, opacity: 1 }]}>
            <Button 
              style={diagDetail.button} 
              title={unsolvedGoToPushOrder} 
              titleStyle={{fontSize: 14, color: mainColor}} 
              activeOpacity={0.8} 
              onPress={()=> navigation.navigate('pushOrder', {name: 'PushOrder'})}
            />
          </View>
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
                  <Text style={search.hotText} numberOfLines={2}>{hotItem.text}</Text>
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
