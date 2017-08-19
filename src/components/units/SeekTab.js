import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { lightBlueColor, subTitleColor, contentColor } from '../../common/constants'
import { seekTab } from '../../styles'

const dropdownNormal = require('../../images/dropdown_normal.png')
const dropdownSelected = require('../../images/dropdown_selected.png')

export default props => {
  let { state, openModal } = props
    , { seekPartRow, seekTypeRow, selectedPart, selectedType } = state
  return (
    <View style={seekTab.tabView}>
      <TouchableOpacity 
        style={[seekTab.tabTouch, {borderRightWidth: 0.5, borderColor: subTitleColor}]} 
        activeOpacity={0.8} 
        onPress={()=> openModal(`seekPartRow`)}
      >
        <Text style={[seekTab.tabText, seekPartRow ? {color: lightBlueColor} : {}]}>{selectedPart}</Text>
        <Image source={seekPartRow ? dropdownSelected : dropdownNormal}/>
      </TouchableOpacity>
      <TouchableOpacity 
        style={seekTab.tabTouch} 
        activeOpacity={0.8} 
        onPress={()=> openModal(`seekTypeRow`)}
      >
        <Text style={[seekTab.tabText, seekTypeRow ? {color: lightBlueColor} : {}]}>{selectedType}</Text>
        <Image source={seekTypeRow ? dropdownSelected : dropdownNormal}/>
      </TouchableOpacity>
    </View>
  )
}