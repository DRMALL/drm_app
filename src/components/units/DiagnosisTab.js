import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { lightBlueColor, mainColor, contentColor } from '../../common/constants'
import { diagnosisTab } from '../../styles'
import pressTab from '../../funcs/diagnose/pressTab'

export default props => {
  let { state, diagData } = props
  return (
    <View style={diagnosisTab.wrap}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          diagData.map((tabItem, dt)=> <DiagTabItem key={dt} tabItem={tabItem} dt={dt} state={state} />)
        }
      </ScrollView>
    </View>
  )
}

const DiagTabItem = props => {
  let { tabItem, dt, state } = props
    , tabSelectState = state[`tabTypeRow${dt}`]
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={()=> pressTab(dt)}>
      <Text style={[diagnosisTab.tabText, {color: tabSelectState ? lightBlueColor : contentColor}]}>{tabItem.text}</Text>
      <View style={[diagnosisTab.tabLine, {backgroundColor: tabSelectState ? lightBlueColor : mainColor}]}/>
    </TouchableOpacity>
  )
}