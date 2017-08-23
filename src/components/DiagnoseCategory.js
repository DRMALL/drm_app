import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import { solved, unsolved, inTheEnd } from '../common/strings'
import { lightBlueColor, contentColor, subTitleColor, loginBackgroundColor, mainColor } from '../common/constants'
import { diagnose, home } from '../styles'
import { diagnosisData } from '../utils/virtualData'

export default props => {
  let { navigation, diagnoseData, isRefreshing, onDiagRefresh } = props
    , diagnoseDataLength = diagnoseData.length
  return (
    <View style={diagnose.wrap}>
      <ScrollView 
        refreshControl={<RefreshControl 
          refreshing={isRefreshing}
          onRefresh={onDiagRefresh}
          colors={['#ff0000', '#00ff00', '#0000ff']}
          progressBackgroundColor={mainColor}
          title='下拉刷新'
        />}
      >
        {
          diagnoseData.map((item, d)=> <DiagnosisItem key={d} item={item} d={d} diagnoseDataLength={diagnoseDataLength} navigation={navigation}/>)
        }
      </ScrollView>
    </View>
  )
}

const DiagnosisItem = props => {
  let { item, d, diagnoseDataLength, navigation } = props
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={diagnose.touchView} activeOpacity={0.8} onPress={()=> navigation.navigate('diagDetail', {bugsId: item._id, bugsTitle: item.title, categoryText: item.category.text})}>
        <View style={diagnose.titleView}>
          <Text style={diagnose.titleText}>{item.title}</Text>
          {
            item.isSolved ? <Text style={diagnose.solvedText}>{solved}</Text> : <Text style={diagnose.unsolvedText}>{unsolved}</Text>
          }
        </View>
        <Text style={diagnose.kindsText}>{item.category.text}</Text>
      </TouchableOpacity>
      <View style={{backgroundColor: loginBackgroundColor, opacity: 1}}>
        <Text style={[home.endText, d == (diagnoseDataLength-1) ? {} : {display: 'none' }]}>{inTheEnd}</Text>
      </View>
    </View>
  )
}