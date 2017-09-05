import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import { primaryColor, mainColor, loginBorderColor } from '../../common/constants'
import { seekDetail } from '../../styles'

import homeDetailAC from '../../actions/homeDetailAC'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const shareIcon = require('../../images/navigation_icons/share.png')
const picMaskIcon = require('../../images/navigation_icons/pic_mask.png')

export default props => {
  let { picData, navigation } = props
    , { showShare, enlargeHeaderPic } = homeDetailAC
  let picsDataView = []
  for(var i = 0; i < picData.length; i++) {
    let picEnlarge = `${picData[i].url}`
    picsDataView.push(
      <TouchableOpacity key={i} style={seekDetail.picsView} onPress={()=> enlargeHeaderPic(picEnlarge)}> 
        <Image style={seekDetail.pics} source={{uri: picData[i].url}} />
        <Image style={{width: '100%', height: '100%', resizeMode: 'stretch', position: 'absolute' }} source={picMaskIcon}/>
      </TouchableOpacity>
    )
  }
  return (
    <View style={seekDetail.headerView}>
      <Swiper height={230} horizontal={true} dotColor={loginBorderColor} activeDotColor={mainColor}>
        {picsDataView}
      </Swiper>
      <TouchableOpacity 
        style={seekDetail.gobackIcon} 
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Image source={gobackWhiteIcon}/>
      </TouchableOpacity>
      {
        // <TouchableOpacity style={seekDetail.shareIcon} onPress={() => showShare()}>
        //   <Image source={shareIcon}/>
        // </TouchableOpacity>
        // <View style={{width: '100%', height: '100%', backgroundColor: 'red', position: 'absolute', opacity: 0.1}}/>
      }
    </View>
  )
}