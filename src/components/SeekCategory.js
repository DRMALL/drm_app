import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import {  } from '../common/strings'
import { lightBlueColor, contentColor } from '../common/constants'
import { seek } from '../styles'
import { seekData } from '../utils/virtualData'

export default class SeekCategory extends Component {
  render() {
    let { navigation } = this.props
    return (
      <View style={seek.wrap}>
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
    <TouchableOpacity style={seek.touchView} activeOpacity={0.8} onPress={()=> `navigation.navigate('', {name: ''})`}>
      <Text style={seek.text}>{item.longCode}</Text>
      <Text style={seek.text}>{item.materialName}</Text>
      <Text style={seek.text}>{item.models}</Text>
      <Text style={seek.text}>{item.unites}</Text>
    </TouchableOpacity>
  )
}