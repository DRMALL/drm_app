import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { materialLongCode, materialName, materialModels, materialUnites } from '../common/strings'
import { lightBlueColor, contentColor, mainColor, subTitleColor } from '../common/constants'
import { seek } from '../styles'
import { seekData } from '../utils/virtualData'

export default class SeekCategory extends Component {
  render() {
    let { navigation } = this.props
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
        <ScrollView>
          {
            seekData.map((item, s)=> <SeekDataItem key={s} item={item} navigation={navigation}/>)
          }
        </ScrollView>
      </View>
    )
  }
}

const SeekDataItem = props => {
  let { item, navigation } = props
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={seek.touchView} activeOpacity={0.8} onPress={()=> navigation.navigate('seekDetail', {name: 'SeekDetail', seekItem: item})}>
        <Text style={seek.text}>{item.longCode}</Text>
        <Text style={seek.text}>{item.materialName}</Text>
        <Text style={seek.text}>{item.models}</Text>
        <Text style={seek.text}>{item.unites}</Text>
      </TouchableOpacity>
    </View>
  )
}