import React, { Component } from 'react'
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native'
import moment from 'moment'
import { mainColor, primaryColor, subTitleColor, contentColor, loginBackgroundColor } from '../../common/constants'
import { inputDeviceTypes, historicalRecord, hotSearch, tokenKey, inTheEnd } from '../../common/strings'
import { search, device, home } from '../../styles'
import { getWord, saveWord, clearWord, getKeyNum } from '../../utils/searchBuffer'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getDevicesSearch, getDevicesHots } from '../../apis'
import Loading from '../../components/units/Loading'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const searchIcon = require('../../images/navigation_icons/search.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')
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
    this.state = {
      text: '',
      jumpData: false,
      deviceData: [],
      historyData: [],
      hotwordData: [],
    }
  }

  componentDidMount () {
    let diagwordRe = []
    this.getBugsHotword()
    getKeyNum('device')
    .then( num => {
      getWord('device', num)
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
        Alert.alert('错误', 'Internal Server Error',
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
      let res = await getPort(`${getDevicesSearch}?type=onchange&search=${this.state.text}&token=${token}`)
      if(!res) {
        Alert.alert('错误', 'Internal Server Error',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        this.setState({
          deviceData: res.data,
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
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getDevicesSearch}?type=submit&search=${this.state.text}&token=${token}`)
      if(!res) {
        Alert.alert('错误', 'Internal Server Error',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        let prevHistoryData = this.state.historyData
        if(res.data.text != null && res.data.text != undefined) {
          prevHistoryData = [res.data.text].concat(prevHistoryData)
          this.setState({
            historyData: prevHistoryData,
          })
          saveWord('device', prevHistoryData)
        }
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
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
    getKeyNum('device')
    .then( num => {
      clearWord('device', num)
    })
    this.setState({
      historyData: [],
    })
  }

  render() {
    let { navigation } = this.props
      , { deviceData, historyData, hotwordData, jumpData } = this.state
      , dataDeviceView
    if(!deviceData) {
      dataDeviceView = <Loading animating={!deviceData ? true : false}/>
    } else {
      dataDeviceView = <ScrollView>
        {
          deviceData.map((deviceOne, index)=> <DeviceItem key={index} index={index} deviceDataLength={deviceData.length} deviceOne={deviceOne} navigation={navigation} />)
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

const DeviceItem = props => {
  let { deviceOne, index, deviceDataLength, navigation } = props
    , nameNumLength = `${deviceOne.name + deviceOne.number}`.split('').length
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={device.archivesItemTouch} activeOpacity={0.8} onPress={()=> navigation.navigate('detail', {deviceId: deviceOne._id})}> 
        <Image style={device.archivesItemImg} source={{uri: deviceOne.images[0].url}} />
        <View style={device.archivesItemOther}>
          <View style={nameNumLength < 16 ? device.archivesNoTime : device.archivesNoTime2}>
            <Text style={device.archivesItemNo}>{deviceOne.name + deviceOne.number}</Text>
            <Text style={device.archivesItemTime}>{moment(deviceOne.createdAt).format('YYYY-MM-DD')}</Text>
          </View>
          <View style={device.archivesItemLabsView}>
            <View style={device.archivesItemLabBorder}>
              <Text style={device.archivesItemLab}>{deviceOne.cc}</Text>
            </View>
            <View style={device.archivesItemLabBorder}>
              <Text style={device.archivesItemLab}>{deviceOne.pressure}</Text>
            </View>
            <View style={device.archivesItemLabBorder}>
              <Text style={device.archivesItemLab}>{deviceOne.combustible}</Text>
            </View>
          </View>
          <Text style={device.archivesItemDetail}>{deviceOne.description}</Text>
        </View>
      </TouchableOpacity>
      <View style={{backgroundColor: mainColor, opacity: 1}}>
        <Text style={[home.endText, index == (deviceDataLength-1) ? {} : {display: 'none' }]}>{inTheEnd}</Text>
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
          placeholder={inputDeviceTypes} 
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