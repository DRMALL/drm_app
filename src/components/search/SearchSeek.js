import React, { Component } from 'react'
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native'
import { mainColor, primaryColor, subTitleColor } from '../../common/constants'
import { inputPartsKeywords, historicalRecord, hotSearch } from '../../common/strings'
import { search } from '../../styles'
import {  } from '../../utils/virtualData'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const searchIcon = require('../../images/navigation_icons/search.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')
const deleteSweepIcon = require('../../images/navigation_icons/delete_sweep.png')

export default class SearchSeek extends Component {
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
    }
  }

  pressTextTouch(text) {
    this.setState({
      text: text
    })
  }

  render() {
    let { navigation } = this.props
      , historyData = ['四字四字', '三个字', '二字', '四字四字', '三个字', '二字', 
                        '四字四字', '三个字', '二字', '四字四字', '三个字', '二字', 
                        '四字四字', '三个字', '二字', '四字四字', '三个字', '二字', ]
      , hotData = ['热门搜索词', '热门搜索词', '热门搜索词', '热门搜索词', '热门搜索词', '热门搜索词']
    return (
      <View style={{height: '100%'}}>
        <HeaderSearch 
          state={this.state} 
          navigation={navigation} 
          onChangeText={(text) => this.setState({text})}
          cleanText={()=> this.setState({text: ''})}
        />
        <ScrollView style={{height: '100%'}}>
          <View style={{position: 'relative', justifyContent: 'center'}}>
            <Text style={search.fixText}>{historicalRecord}</Text>
            <TouchableOpacity style={{position: 'absolute', right: 10, padding: 10}} onPress={()=> alert('post delete history')}>
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
              hotData.map((hotItem, h2)=> <TouchableOpacity key={h2} style={search.touchHot} onPress={()=> this.pressTextTouch(hotItem)}>
                <Image style={search.hotSearchIcon} source={searchIcon}/>
                <Text style={search.hotText}>{hotItem}</Text>
              </TouchableOpacity>)
            }
          </View>
          <View style={{height: 100}}/>
        </ScrollView>
      </View>
    )
  }
}

const HeaderSearch = props => {
  let { state, navigation, onChangeText, cleanText } = props
  return (
    <View style={search.header}>
      <TouchableOpacity style={search.touchBack} onPress={()=> navigation.goBack()}>
        <Image source={gobackWhiteIcon}/>
      </TouchableOpacity>
      <View style={search.inputView}>
        <TextInput 
          autoCapitalize='none' 
          style={search.inputText} 
          placeholder={inputPartsKeywords} 
          placeholderTextColor={subTitleColor}
          underlineColorAndroid='transparent'
          autoFocus={true}
          value={state.text}
          onChangeText={onChangeText}
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