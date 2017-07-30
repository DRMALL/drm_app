import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { lightBlueColor, subTitleColor, contentColor } from '../../common/constants'
import { seekTab } from '../../styles'

const dropdownNormal = require('../../images/dropdown_normal.png')
const dropdownSelected = require('../../images/dropdown_selected.png')

export default props => {
  let { state, openModal } = props
    , selectPartRow = state.seekPartRow
    , selectTypeRow = state.seekTypeRow
    , selectedPart = state.selectedPart
    , selectedType = state.selectedType
  return (
    <View style={seekTab.tabView}>
      <TouchableOpacity 
        style={[seekTab.tabTouch, {borderRightWidth: 0.5, borderColor: subTitleColor}]} 
        activeOpacity={0.8} 
        onPress={()=> openModal(`seekPartRow`)}
      >
        <Text style={[seekTab.tabText, selectPartRow ? {color: lightBlueColor} : {}]}>{selectedPart}</Text>
        <Image source={selectPartRow ? dropdownSelected : dropdownNormal}/>
      </TouchableOpacity>
      <TouchableOpacity 
        style={seekTab.tabTouch} 
        activeOpacity={0.8} 
        onPress={()=> openModal(`seekTypeRow`)}
      >
        <Text style={[seekTab.tabText, selectTypeRow ? {color: lightBlueColor} : {}]}>{selectedType}</Text>
        <Image source={selectTypeRow ? dropdownSelected : dropdownNormal}/>
      </TouchableOpacity>
    </View>
  )
}