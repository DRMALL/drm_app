import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import { materialLongCode, materialName, materialModels, materialUnites, inTheEnd } from '../common/strings'
import { lightBlueColor, contentColor, mainColor, subTitleColor, loginBackgroundColor } from '../common/constants'
import { seek, home } from '../styles'
import { seekData } from '../utils/virtualData'

export default class SeekCategory extends Component {
  render() {
    let { navigation, isRefreshing, onSeekRefresh } = this.props
      , seekDataLength = seekData.length
    return (
      <View style={seek.wrap}>
        <View style={{backgroundColor: mainColor}}>
          <View style={seek.captionView}>
            <View style={seek.materialLongCodeView}>
              <Text style={seek.captionText}>{materialLongCode}</Text>
            </View>
            <View style={seek.materialNameView}>
              <Text style={seek.captionText}>{materialName}</Text>
            </View>
            <View style={seek.materialModelsView}>
              <Text style={seek.captionText}>{materialModels}</Text>
            </View>
            <View style={seek.materialUnitesView}>
              <Text style={seek.captionText}>{materialUnites}</Text>
            </View>
          </View>
        </View>
        <ScrollView 
          refreshControl={<RefreshControl 
            refreshing={isRefreshing}
            onRefresh={onSeekRefresh}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor={mainColor}
            title='下拉刷新'
            titleColor={contentColor}
          />}
        >
          {
            seekData.map((item, s)=> <SeekDataItem key={s} item={item} s={s} seekDataLength={seekDataLength} navigation={navigation}/>)
          }
        </ScrollView>
      </View>
    )
  }
}

const SeekDataItem = props => {
  let { item, s, seekDataLength, navigation } = props
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={seek.touchView} activeOpacity={0.8} onPress={()=> navigation.navigate('seekDetail', {name: 'SeekDetail', seekItem: item})}>
        <Text style={seek.text}>{item.longCode}</Text>
        <Text style={seek.text}>{item.materialName}</Text>
        <Text style={seek.text}>{item.models}</Text>
        <Text style={seek.text}>{item.unites}</Text>
      </TouchableOpacity>
      <View style={{backgroundColor: loginBackgroundColor, opacity: 1}}>
        <Text style={[home.endText, s == (seekDataLength-1) ? {} : {display: 'none' }]}>{inTheEnd}</Text>
      </View>
    </View>
  )
}