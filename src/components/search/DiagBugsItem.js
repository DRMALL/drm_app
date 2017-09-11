import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { subTitleColor, contentColor } from '../../common/constants'
import { inputDeviceFault, historicalRecord, hotSearch, unsolvedGoToPushOrder, tokenKey, internalServerError } from '../../common/strings'
import { diagnose } from '../../styles'

import strReplaceHeightLight from '../../funcs/strReplaceHeightLight'

export default props => {
  let { state, bugOne, navigation } = props
    , titleArr = []
    , contentArr = []
  if(bugOne.title) {
    titleArr = strReplaceHeightLight(bugOne.title, state.text)
  }
  if(bugOne.content) {
    contentArr = strReplaceHeightLight(bugOne.content, state.text)
  }
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={diagnose.touchView} activeOpacity={0.8} onPress={()=> navigation.navigate('diagDetail', {bugsId: bugOne._id, bugsTitle: bugOne.title, categoryText: bugOne.category.text})}>
        <View style={diagnose.titleView}>
          <Text style={[diagnose.titleText, {width: '100%'}]}>
            { titleArr }
          </Text> 
        </View>
        <View style={{paddingVertical: 5}}>
          <Text style={{color: contentColor, fontSize: 14 }} numberOfLines={3}>
            { contentArr }
          </Text>
        </View>
        <Text style={diagnose.kindsText}>{bugOne.category.text ? bugOne.category.text : '暂无分类'}</Text>
      </TouchableOpacity>
    </View>
  )
}