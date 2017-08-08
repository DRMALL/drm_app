import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { all, onState, offState } from '../../common/strings'
import { primaryColor } from '../../common/constants'
import { statusTab } from '../../styles'

export default props => {
  let { tabData, state, pressStatusTab} = props
  return(
    <View style={statusTab.wrap}>
      {
        tabData.map((item, index)=> <StatuTabItem key={index} item={item} index={index} state={state} pressStatusTab={pressStatusTab}/>)
      }
    </View>
  )
}

const StatuTabItem = props => {
  let { item, index, state, pressStatusTab } = props
    , selectedSTab = state[`StatuTabRow${index}`]
  return (
    <TouchableOpacity style={statusTab.touchHighlignt} onPress={()=> pressStatusTab(index)} activeOpacity={0.9}>
      <Text style={[statusTab.text, selectedSTab ? {color: primaryColor} : {}]}>{item}</Text>
      <View style={selectedSTab ? statusTab.vuline : statusTab.vunoline} />
    </TouchableOpacity>
  )
}

