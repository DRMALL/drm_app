import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { lightBlueColor, mainColor, contentColor } from '../../common/constants'
import { diagnosisTab } from '../../styles'
import diagnosePress from '../../actions/diagnosePress'

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
    , condition = tabItem._id == state.selectedCate

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={()=> diagnosePress(tabItem._id)}>
      <Text style={[diagnosisTab.tabText, {color: condition ? lightBlueColor : contentColor}]}>{tabItem.text}</Text>
      <View style={[diagnosisTab.tabLine, {backgroundColor: condition ? lightBlueColor : mainColor}]}/>
    </TouchableOpacity>
  )
}
