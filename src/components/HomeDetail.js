import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import { primaryColor, mainColor, loginBorderColor } from '../common/constants'
import {  } from '../common/strings'
import { seekDetail, detail } from '../styles'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')
const shareIcon = require('../images/navigation_icons/share.png')
const pic5 = require('../images/pic5.png')
const pic6 = require('../images/pic6.png')
const pic7 = require('../images/pic7.png')

export default class HomeDetail extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 0,
      top: 50,
    }
  }

  render() {
    let { navigation } = this.props
    return (
      <ScrollView style={{backgroundColor: mainColor}}>
        <HomeSwiperHeader navigation={navigation}/>
        <Text style={[detail.titleText, {paddingHorizontal: 16}]}>多元热流体稠油增产技术在金海采油厂开始现场试验</Text>
        <Text style={[detail.titleTime, {paddingHorizontal: 16, paddingTop: 15}]}>2017-01-01</Text>
        <Text style={detail.ordinaryText}>
          {`在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`}
        </Text>
      </ScrollView>
    )
  }
}

const HomeSwiperHeader = props => {
  let { navigation } = props
    , picArr = [pic5, pic6, pic5, pic6, pic7]  //图片数组
  return (
    <View style={seekDetail.headerView}>
      <Swiper height={230} dotColor={loginBorderColor} activeDotColor={mainColor}>
        {
          picArr.map((picItem, index)=> <View key={index} style={seekDetail.picsView}>
            <Image style={seekDetail.pics} source={picItem}/>
          </View>)
        }
      </Swiper>
      <TouchableOpacity style={seekDetail.gobackIcon} onPress={() => navigation.goBack()}>
        <Image source={gobackWhiteIcon}/>
      </TouchableOpacity>
      <TouchableOpacity style={seekDetail.shareIcon} onPress={() => alert('share')}>
        <Image source={shareIcon}/>
      </TouchableOpacity>
    </View>
  )
}