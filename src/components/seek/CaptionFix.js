import React from 'react'
import { View, Text } from 'react-native'
import { mainColor } from '../../common/constants'
import { materialLongCode, materialName, materialModels, materialUnites } from '../../common/strings'
import { seek } from '../../styles'

export default props => {
  return (
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
  )
}