import React, { Component } from 'react'
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import { mainColor, primaryColor, subTitleColor, contentColor } from '../../common/constants'
import { inputDeviceNumber, historicalRecord, hotSearch, tokenKey } from '../../common/strings'
import { search, diagnose } from '../../styles'
import { getWord, saveWord, clearWord, getKeyNum } from '../../utils/searchBuffer'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getBugs, getBugsHot } from '../../apis'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const searchIcon = require('../../images/navigation_icons/search.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')
const deleteSweepIcon = require('../../images/navigation_icons/delete_sweep.png')

export default class SearchStatus extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 0,
      top: 50,
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      jumpData: false,
      bugsData: [],
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
      let res = await getPort(`${getBugsHot}?token=${token}`)
      if(!res) {
        alert('server error')
      } else if(res.code == 200) {
        this.setState({
          hotwordData: res.data,
        })
      } else alert(JSON.stringify(res))
    })
  }

  getBugsOnchange(text) {
    this.setState({
      text: text,
      jumpData: text == '' ? false : true,
    })
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getBugs}?type=onchange&search=${this.state.text}&token=${token}`)
      if(!res) {
        alert('server error')
      } else if(res.code == 200) {
        this.setState({
          bugsData: res.data,
        })
      } else alert(JSON.stringify(res))
    })
  }

  getBugsSubmit() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getBugs}?type=submit&search=${this.state.text}&token=${token}`)
      if(!res) {
        alert('server error')
      } else if(res.code == 200) {
        let prevHistoryData = this.state.historyData
        if(res.data.text != null && res.data.text != undefined) {
          prevHistoryData = [res.data.text].concat(prevHistoryData)
          this.setState({
            historyData: prevHistoryData,
          })
          saveWord('statu', prevHistoryData)
        }
      } else alert(JSON.stringify(res))
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
    getKeyNum('statu')
    .then( num => {
      clearWord('statu', num)
    })
    this.setState({
      historyData: [],
    })
  }


  render() {
    let { navigation } = this.props
      , { bugsData, historyData, hotwordData, jumpData } = this.state
    return (
      <View style={{height: '100%'}}>
        <StatusBar backgroundColor={primaryColor} />
        <HeaderSearch 
          state={this.state} 
          navigation={navigation} 
          onChangeText={this.getBugsOnchange.bind(this)}
          onSubmitEditing={this.getBugsSubmit.bind(this)}
          cleanText={()=> this.pressCleanText()}
        />
        <View style={{height: jumpData ? '100%' : 0, backgroundColor: mainColor}}>
          <ScrollView>
            {
              bugsData.map((bugOne, index)=> <DiagBugsItem key={index} bugOne={bugOne} navigation={navigation} />)
            }
          </ScrollView>
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
  let { bugOne, navigation } = props
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={diagnose.touchView} activeOpacity={0.8} onPress={()=> navigation.navigate('diagDetail', {bugsId: bugOne._id, bugsTitle: bugOne.title, categoryText: bugOne.category.text})}>
        <View style={diagnose.titleView}>
          <Text style={diagnose.titleText}>{bugOne.title}</Text>
        </View>
        <Text style={{color: contentColor, fontWeight: 'bold' }}>{bugOne.content}</Text>
        <Text style={diagnose.kindsText}>{bugOne.category.text}</Text>
      </TouchableOpacity>
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