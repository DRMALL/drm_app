import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { mainColor, subTitleColor } from '../../common/constants'
import { inTheEnd } from '../../common/strings'
import { seek, home } from '../../styles'

import strReplaceHeightLight from '../../funcs/strReplaceHeightLight'

export default props => {
  let { state, index, sekOne, seekDataLength, navigation } = props
    , sekNameArr = []
    , sekModelArr = []
  if(sekOne.name) {
    sekNameArr = strReplaceHeightLight(sekOne.name, state.text)
  }
  if(sekOne.model) {
    sekModelArr = strReplaceHeightLight(sekOne.model, state.text)
  }
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={seek.touchView} activeOpacity={0.8} onPress={()=> navigation.navigate('seekDetail', {seekId: sekOne._id})}>
        <Text style={[seek.text, {width: '26%'}]}>{sekOne.code}</Text>
        <Text style={[seek.text, {width: '46%'}]}>{sekNameArr}</Text>
        <Text style={[seek.text, {width: '28%'}]}>{sekModelArr}</Text>
       {/* <Text style={[seek.text, {width: '6%'}]}>{sekOne.unit}</Text>*/}
      </TouchableOpacity>
      <View style={index == (seekDataLength-1) ? {backgroundColor: mainColor, opacity: 1, paddingBottom: 60} : {display: 'none' }}>
        <Text style={home.endText}>{inTheEnd}</Text>
      </View>
    </View>
  )
}