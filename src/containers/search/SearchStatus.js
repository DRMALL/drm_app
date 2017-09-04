import React, { Component } from 'react'
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native'
import { mainColor, primaryColor, subTitleColor, contentColor, lightGreenColor, lightRedColor } from '../../common/constants'
import { inputDeviceNumber, historicalRecord, hotSearch, tokenKey, internalServerError, onState, offState, online, offline, onToOffText, inTheEnd } from '../../common/strings'
import { search, status, home } from '../../styles'
import { getWord, saveWord, clearWord, getKeyNum } from '../../utils/searchBuffer'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getDevicesHots, getMoniterdevsSearch } from '../../apis'
import Loading from '../../components/units/Loading'

import store from '../../utils/store'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const searchIcon = require('../../images/navigation_icons/search.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')
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
    this.state = {
      text: '',
      jumpData: false,
      statusData: [],
      historyData: [],
      hotwordData: [],
    }
  }

  componentDidMount () {
    let diagwordRe = []
    this.getBugsHotword()
    getKeyNum('statu')
    .then( num => {
      getWord('statu', num)
      .then(diagword => {
        diagword.map((item, d)=> {
          diagwordRe = diagwordRe.concat(item[1])
        })
        this.setState({
          historyData: diagwordRe,
        })
      })
    })
  }

  getBugsHotword() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getDevicesHots}?token=${token}`)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        this.setState({
          hotwordData: res.data,
        })
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  getBugsOnchange(text) {
    this.setState({
      text: text,
      jumpData: text == '' ? false : true,
    })
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getMoniterdevsSearch}?search=${this.state.text}&token=${token}`)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        this.setState({
          statusData: res.data,
        })
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  getBugsSubmit() {
    // checkToken(tokenKey)
    // .then(async token => {
    //   let res = await getPort(`${getBugs}?type=submit&search=${this.state.text}&token=${token}`)
    //   if(!res) {
    //     Alert.alert('错误', internalServerError,
    //       [ {text: 'OK', onPress: () => 'OK'}, ],
    //       { cancelable: false }
    //     )
    //   } else if(res.code == 200) {
        let prevHistoryData = this.state.historyData
        if(this.state.text != '' && this.state.text != undefined) {
          prevHistoryData = [this.state.text].concat(prevHistoryData)
          this.setState({
            historyData: prevHistoryData,
          })
          saveWord('statu', prevHistoryData)
        }
    //   } else {
    //     Alert.alert('错误', JSON.stringify(res.message),
    //       [ {text: 'OK', onPress: () => 'OK'}, ],
    //       { cancelable: false }
    //     )
    //   }
    // })
  }

  pressCleanText() {
    this.setState({
      text: '',
      jumpData: false,
    })
  }

  pressTextTouch(text) {
    this.getBugsOnchange(text)
    this.getBugsSubmit()
  }

  pressDeleteSweep() {
    Alert.alert('提示', '是否删除历史记录',
      [ {text: '取消', onPress: () => 'no'}, 
        {text: '确定', onPress: () => {
          getKeyNum('statu')
          .then( num => {
            clearWord('statu', num)
          })
          this.setState({
            historyData: [],
          })
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
      dataBugsView = <ScrollView>
        {
          statusData.map((statuOne, index)=> <DiagBugsItem key={index} statuOne={statuOne} navigation={navigation} dataLength={statusData.length} rowID={index} />)
        }
      </ScrollView>
    }
    return (
      <View style={{height: '100%'}}>
        <StatusBar backgroundColor={primaryColor} barStyle='light-content'/>
        <HeaderSearch 
          state={this.state} 
          navigation={navigation} 
          onChangeText={this.getBugsOnchange.bind(this)}
          onSubmitEditing={this.getBugsSubmit.bind(this)}
          cleanText={()=> this.pressCleanText()}
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

const DiagBugsItem = props => {
  let { statuOne, navigation, dataLength, rowID } = props
  const { _id, images, name, number, stopTime } = statuOne
  let equipmentData = store.getState().statu.equipmentData
  let deviceState = false
  equipmentData.map((eqItem, index)=> {
    if(number == eqItem.number) {
      deviceState = true
    }
  })
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={status.wrap} activeOpacity={0.8} onPress={() => navigation.navigate('equipment', {statuItemId: _id, statuItemNumber: number})}>
        <Image source={{uri: images[0].url}} style={status.img} />
        <View style={status.nextView}>
          <View style={status.cover}>
            <Text style={status.NoText} numberOfLines={2}>{`${name} (${number})`}</Text>
            <TouchableOpacity style={[status.touch, {borderColor: deviceState ? lightGreenColor : lightRedColor}]}>
              <Text style={[status.touchText, {color: deviceState ? lightGreenColor : lightRedColor}]}>{deviceState ? onState : offState}</Text>
            </TouchableOpacity>
          </View>
          <Text style={[status.text, {lineHeight: deviceState ? 20 : 28}]} numberOfLines={2}>{deviceState ? online : offline}</Text>
          <Text style={[status.text, {lineHeight: deviceState ? 20 : 28}]} numberOfLines={3}>{deviceState ? '' : onToOffText + (stopTime || '2017-09-04')}</Text>
        </View>
      </TouchableOpacity>
      <View style={{backgroundColor: mainColor, opacity: 1}}>
        <Text style={[home.endText, rowID == (dataLength-1) ? {} : {display: 'none' }]}>{inTheEnd}</Text>
      </View>
    </View>
  )
}

const HeaderSearch = props => {
  let { state, navigation, onChangeText, onSubmitEditing, cleanText } = props
  return (
    <View style={search.header}>
      <TouchableOpacity style={search.touchBack} onPress={()=> navigation.goBack()}>
        <Image source={gobackWhiteIcon}/>
      </TouchableOpacity>
      <View style={search.inputView}>
        <TextInput 
          autoCapitalize='none' 
          style={search.inputText} 
          placeholder={inputDeviceNumber} 
          placeholderTextColor={subTitleColor}
          underlineColorAndroid='transparent'
          autoFocus={true}
          value={state.text}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        <Image style={search.searchIcon} source={searchIcon}/>
        {
          state.text != '' ? <TouchableOpacity style={search.cancelTouch} onPress={cleanText}>
            <Image style={search.cancelIcon} source={cancelIcon}/>
          </TouchableOpacity> : <Image style={{height: 0}}/>
        }
      </View>
    </View>
  )
}