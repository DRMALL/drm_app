import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import { materialLongCode, materialName, materialModels, materialUnites, inTheEnd, allParts, allTypes } from '../common/strings'
import { lightBlueColor, contentColor, mainColor, subTitleColor, loginBackgroundColor } from '../common/constants'
import { seek, home } from '../styles'
import { seekData } from '../utils/virtualData'
import store from '../utils/store'
import EmptyContent from '../components/units/EmptyContent'
import CaptionFix from './seek/CaptionFix'
import seekAC from '../actions/seekAC'

export default class SeekCategory extends Component {
  constructor(props) {
    super(props)
  }

  onScroll(e) {
    const { isLoading, allSeekPartData, allSeekPartDataMeta, selectedPart, selectedType } = store.getState().seek
    if (isLoading) return 

    if (allSeekPartDataMeta.offset >= allSeekPartDataMeta.count) return

    let y = e.nativeEvent.contentOffset.y
    let height = e.nativeEvent.layoutMeasurement.height
    let contentHeight = e.nativeEvent.contentSize.height

    if(y+height>=contentHeight-20){
      seekAC.loadMore(selectedPart, selectedType)       
    }
  }

  render() {
    let { navigation, isRefreshing, allSeekData, onSeekRefresh } = this.props
      , { selectedPart, selectedType, isLoading } = store.getState().seek
    //   , selectDataArr = []
    // if(selectedPart !== allParts) {
    //   allSeekData.map((seekOne, indexs)=> {
    //     if(selectedPart === seekOne.name) {
    //       if(selectedType !== allTypes) {
    //         if(selectedType == seekOne.model) {
    //           selectDataArr.push(seekOne)
    //         }
    //       } else selectDataArr.push(seekOne)
    //     }
    //   })
    // } else selectDataArr = allSeekData
    let seekDataLength = allSeekData.length
    return (
      <View style={seek.wrap}>
        <CaptionFix />
        {
          seekDataLength == 0 ? <EmptyContent /> : 
          <ScrollView 
            onScroll={this.onScroll.bind(this)}
            scrollEventThrottle={50}
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
              allSeekData.map((item, s)=> <SeekDataItem key={s} item={item} s={s} isLoading={isLoading} seekDataLength={seekDataLength} navigation={navigation}/>)
            }
          </ScrollView>
        }
      </View>
    )
  }
}

const SeekDataItem = props => {
  let { item, s, seekDataLength, navigation, isLoading } = props
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={seek.touchView} activeOpacity={0.8} onPress={()=> navigation.navigate('seekDetail', {seekId: item._id})}>
        <Text style={[seek.text, {width: '26%'}]}>{item.code}</Text>
        {/*<Text style={[seek.text, {width: '26%'}]}>{item.levelOne}</Text>*/}
        <Text style={[seek.text, {width: '46%'}]}>{item.name}</Text>
        <Text style={[seek.text, {width: '28%'}]}>{item.model}</Text>
      </TouchableOpacity>
      <View style={{backgroundColor: loginBackgroundColor, opacity: 1}}>
        <Text style={[home.endText, s == (seekDataLength-1) ? {} : {display: 'none' }]}>{inTheEnd(isLoading)}</Text>
      </View>
    </View>
  )
}