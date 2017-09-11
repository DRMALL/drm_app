import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import { materialLongCode, materialName, materialModels, materialUnites, inTheEnd, allParts, allTypes } from '../common/strings'
import { lightBlueColor, contentColor, mainColor, subTitleColor, loginBackgroundColor } from '../common/constants'
import { seek, home } from '../styles'
import { seekData } from '../utils/virtualData'
import store from '../utils/store'
import EmptyContent from '../components/units/EmptyContent'
import CaptionFix from './seek/CaptionFix'

export default class SeekCategory extends Component {
  render() {
    let { navigation, isRefreshing, allSeekData, onSeekRefresh } = this.props
      , { selectedPart, selectedType } = store.getState().seek
      , selectDataArr = []
    if(selectedPart !== allParts) {
      allSeekData.map((seekOne, indexs)=> {
        if(selectedPart === seekOne.name) {
          if(selectedType !== allTypes) {
            if(selectedType == seekOne.model) {
              selectDataArr.push(seekOne)
            }
          } else selectDataArr.push(seekOne)
        }
      })
    } else selectDataArr = allSeekData
    let seekDataLength = selectDataArr.length
    return (
      <View style={seek.wrap}>
        <CaptionFix />
        {
          seekDataLength == 0 ? <EmptyContent /> : 
          <ScrollView 
            style={{height: '100%'}}
            refreshControl={<RefreshControl 
              refreshing={isRefreshing}
              onRefresh={onSeekRefresh}
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor={mainColor}
              title='下拉刷新'
              titleColor={contentColor}
            />}
          >
            {
              selectDataArr.map((item, s)=> <SeekDataItem key={s} item={item} s={s} seekDataLength={seekDataLength} navigation={navigation}/>)
            }
          </ScrollView>
        }
      </View>
    )
  }
}

const SeekDataItem = props => {
  let { item, s, seekDataLength, navigation } = props
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={seek.touchView} activeOpacity={0.8} onPress={()=> navigation.navigate('seekDetail', {seekId: item._id})}>
        <Text style={[seek.text, {width: '24%'}]}>{item.code}</Text>
        <Text style={[seek.text, {width: '26%'}]}>{item.name}</Text>
        <Text style={[seek.text, {width: '34%'}]}>{item.model}</Text>
        <Text style={[seek.text, {width: '6%'}]}>{item.unit}</Text>
      </TouchableOpacity>
      <View style={{backgroundColor: loginBackgroundColor, opacity: 1}}>
        <Text style={[home.endText, s == (seekDataLength-1) ? {} : {display: 'none' }]}>{inTheEnd}</Text>
      </View>
    </View>
  )
}