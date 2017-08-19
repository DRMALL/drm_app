import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import { primaryColor, mainColor, loginBorderColor } from '../../common/constants'
import { seekDetail } from '../../styles'

import homeDetailAC from '../../actions/homeDetailAC'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const shareIcon = require('../../images/navigation_icons/share.png')

export default props => {
  let { picData, navigation } = props
    , { showShare } = homeDetailAC
  let picsDataView = []
  for(var i = 0; i < picData.length; i++) {
    picsDataView.push(
      <View key={i} style={seekDetail.picsView}>
        <Image style={seekDetail.pics} source={{uri: picData[i].url}}/>
      </View>
    )
  }
  return (
    <View style={seekDetail.headerView}>
      <Swiper height={230} horizontal={true} dotColor={loginBorderColor} activeDotColor={mainColor}>
        {picsDataView}
      </Swiper>
      <TouchableOpacity style={seekDetail.gobackIcon} onPress={() => navigation.goBack()}>
        <Image source={gobackWhiteIcon}/>
      </TouchableOpacity>
      <TouchableOpacity style={seekDetail.shareIcon} onPress={() => showShare()}>
        <Image source={shareIcon}/>
      </TouchableOpacity>
    </View>
  )
}