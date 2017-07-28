import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { solved, unsolved } from '../common/strings'
import { lightBlueColor, contentColor } from '../common/constants'
import { diagnose } from '../styles'
import { diagnosisData } from '../utils/virtualData'

export default class DiagnoseCategory extends Component {
  render() {
    let { navigation } = this.props
    return (
      <View style={diagnose.wrap}>
        <ScrollView>
          {
            diagnosisData.map((item, d)=> <DiagnosisItem key={d} item={item} navigation={navigation}/>)
          }
        </ScrollView>
      </View>
    )
  }
}

const DiagnosisItem = props => {
  let { item, navigation } = props
  return (
    <TouchableOpacity style={diagnose.touchView} activeOpacity={0.8} onPress={()=> navigation.navigate('diagDetail', {name: 'DiagDetail'})}>
      <View style={diagnose.titleView}>
        <Text style={diagnose.titleText}>{item.title}</Text>
        {
          item.solved ? <Text style={diagnose.solvedText}>{solved}</Text> : <Text style={diagnose.unsolvedText}>{unsolved}</Text>
        }
      </View>
      <Text style={diagnose.kindsText}>{item.kinds}</Text>
    </TouchableOpacity>
  )
}