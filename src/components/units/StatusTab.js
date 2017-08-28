import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { all, onState, offState } from '../../common/strings'
import { primaryColor } from '../../common/constants'
import { statusTab } from '../../styles'

import store from '../../utils/store'
import statuAC from '../../actions/statuAC'

export default props => {
  let { tabData, state} = props
  return(
    <View style={statusTab.wrap}>
      {
        tabData.map((item, index)=> <StatuTabItem key={index} item={item} index={index} state={state} />)
      }
    </View>
  )
}

const StatuTabItem = props => {
  let { item, index, state } = props
    , { pressStatusTab } = statuAC
    , selectedSTab = state[`StatuTabRow${index}`]
  return (
    <TouchableOpacity style={statusTab.touchHighlignt} onPress={()=> pressStatusTab(index)} activeOpacity={0.9}>
      <Text style={[statusTab.text, selectedSTab ? {color: primaryColor} : {}]}>{item}</Text>
      <View style={selectedSTab ? statusTab.vuline : statusTab.vunoline} />
    </TouchableOpacity>
  )
}

