import React, { Component } from 'react'
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native'
import { mainColor, primaryColor, subTitleColor, contentColor, mainColorPressed, lightBlueColor } from '../../common/constants'
import { inputDeviceFault, historicalRecord, hotSearch, unsolvedGoToPushOrder, tokenKey, internalServerError } from '../../common/strings'
import { search, diagnose, diagDetail } from '../../styles'
import Button from '../../components/units/Button'
import Loading from '../../components/units/Loading'
import { getWord, saveWord, clearWord, getKeyNum } from '../../utils/searchBuffer'
import replaced from '../../funcs/replace'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getBugs, getBugsHot } from '../../apis'

import store from '../../utils/store'
import diagnoseAC from '../../actions/diagnoseAC'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const searchIcon = require('../../images/navigation_icons/search.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')
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
    this.getBugsHotword()
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

  getBugsHotword() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getBugsHot}?token=${token}`)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        diagnoseAC.getHotword(res.data)
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  getBugsOnchange(text) {
    diagnoseAC.setJumpData({
      text: text,
      jumpData: text == '' ? false : true,
    })
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getBugs}?type=onchange&search=${this.state.text}&token=${token}`)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        diagnoseAC.getBugsData(res.data)
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
      let res = await getPort(`${getBugs}?type=submit&search=${this.state.text}&token=${token}`)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        let prevHistoryData = this.state.historyData
        if(res.data.text != null && res.data.text != undefined) {
          prevHistoryData = [res.data.text].concat(prevHistoryData)
          diagnoseAC.setHistoryData(prevHistoryData)
          saveWord('diagnose', prevHistoryData)
        }
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
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
      dataBugsView = <ScrollView>
        {
          bugsData.map((bugOne, index)=> <DiagBugsItem key={index} state={this.state} bugOne={bugOne} navigation={navigation} />)
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

const DiagBugsItem = props => {
  let { state, bugOne, navigation } = props
    , titleArr = []
    , contentArr = []
  if(bugOne.title) {
    let splitTitleArr = replaced.strArr(`${bugOne.title}`, state.text)
    for(var i = 0; i < splitTitleArr.length; i++) {
      if(i == splitTitleArr.length-1) {
        titleArr.push(<Text key={(i*2)}>{splitTitleArr[i]}</Text>)
      } else {
        titleArr.push(<Text key={(i*2)}>{splitTitleArr[i]}</Text>)
        titleArr.push(<Text key={(i*2+1)} style={{color: lightBlueColor}}>{state.text}</Text>)
      }
    }
  }
  if(bugOne.content) {
    let splitContentArr = replaced.strArr(replaced.trim(`${bugOne.content}`), state.text)
    for(var i = 0; i < splitContentArr.length; i++) {
      if(i == splitContentArr.length-1) {
        contentArr.push(<Text key={(i*2)}>{splitContentArr[i]}</Text>)
      } else {
        contentArr.push(<Text key={(i*2)}>{splitContentArr[i]}</Text>)
        contentArr.push(<Text key={(i*2+1)} style={{color: lightBlueColor}}>{state.text}</Text>)
      }
    }
  }
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={diagnose.touchView} activeOpacity={0.8} onPress={()=> navigation.navigate('diagDetail', {bugsId: bugOne._id, bugsTitle: bugOne.title, categoryText: bugOne.category.text})}>
        <View style={diagnose.titleView}>
          <Text style={[diagnose.titleText, {width: '100%'}]}>
            { titleArr }
          </Text> 
        </View>
        <View style={{paddingVertical: 5}}>
          <Text style={{color: contentColor, fontSize: 14 }} numberOfLines={3}>
            { contentArr }
          </Text>
        </View>
        <Text style={diagnose.kindsText}>{bugOne.category.text ? bugOne.category.text : '暂无分类'}</Text>
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
          placeholder={inputDeviceFault} 
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
