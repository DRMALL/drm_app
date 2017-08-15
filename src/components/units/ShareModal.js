import React, { Component }from 'react'
import { View, Text, Image, ListView, TouchableOpacity } from 'react-native'
import { lightBlueColor, contentColor, mainColor } from '../../common/constants'
import { other } from '../../styles'

const wechatSharePic = require('../../images/wechatShare.png')
const weiboSharePic = require('../../images/weiboShare.png')

export default props => {
  let { state, pressShareCancel } = props
    , { shareShow, topView } = state
  return (
    <View style={[topView, shareShow ? {height: '100%'} : {height: 0, display: 'none'}]}>
      <View style={other.halfOpacityView}/>
      <View style={other.shareView}>
        <Text style={other.shareToText}>分享到</Text>
        <View style={other.imgView}>
          <TouchableOpacity style={other.imgTouch} onPress={()=> alert('share to wechat')}>
            <Image style={other.shareImg} source={wechatSharePic}/>
            <Text style={other.shareImgText}>微信</Text>
          </TouchableOpacity>
          <TouchableOpacity style={other.imgTouch} onPress={()=> alert('share to weibo')}>
            <Image style={other.shareImg} source={weiboSharePic}/>
            <Text style={other.shareImgText}>微博</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={other.cancelShareTouch} onPress={()=> pressShareCancel()}>
          <Text style={other.cancelShareText}>取消</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}