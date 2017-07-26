import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { mainColor, loginBorderColor, primaryColor, subTitleColor, contentColor } from '../../common/constants'
import { deviceSort, deviceTimeline, deviceRemarks } from '../../common/strings'
import { timeLineData } from '../../utils/virtualData'
import { detail } from '../../styles'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const calendarIcon = require('../../images/navigation_icons/calendar.png')
const editIcon = require('../../images/navigation_icons/edit.png')
const pic5 = require('../../images/pic5.png')
const pic6 = require('../../images/pic6.png')
const pic7 = require('../../images/pic7.png')

export default class Detail extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 0,
      top: 50,
    }
  }
  render() {
    let { navigation } = this.props
    const detailTitle = '设备编号1234567890'
      , detailTitleLength = detailTitle.split('').length
    return (
      <ScrollView>
        <View style={detail.wrap}>
          <SwiperHeader navigation={navigation}/>
          <View style={detailTitleLength > 20 ? detail.titleViewColumn : detail.titleViewRow}>
            <Text style={detail.titleText}>{detailTitle}</Text>
            <Text style={detail.titleTime}>2017-01-01</Text>
          </View>
          <View style={detail.lebalView}>
            <Text style={detail.lebalText}>单发生器</Text>
            <Text style={detail.lebalText}>25Mpa</Text>
            <Text style={detail.lebalText}>天然气型</Text>
          </View>
          <Text style={detail.ordinaryText}>单发生器的多元热流体设备，以天然气为能源。压力范围：25Mpa。</Text>
          <View style={detail.fixTextView}>
            <Text style={detail.textFix}>{deviceSort}</Text>
          </View>
          <Text style={detail.sortText}>纯氧复合热载体发生器</Text>
          <View style={detail.fixTextView}>
            <Text style={detail.textFix}>{deviceTimeline}</Text>
            <View style={detail.iconView}>
              <TouchableOpacity style={detail.touchIcon} activeOpacity={0.6} onPress={()=> alert('Calendar')}>
                <Image source={calendarIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={detail.touchIcon} activeOpacity={0.6} onPress={()=> alert('Edit')}>
                <Image source={editIcon}/>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TimeLineForm timelineData={timeLineData} />
          </View>
          <View style={detail.fixTextView}>
            <Text style={detail.textFix}>{deviceRemarks}</Text>
            <TouchableOpacity style={detail.touchIcon} activeOpacity={0.6} onPress={()=> alert('Edit')}>
              <Image source={editIcon}/>
            </TouchableOpacity>
          </View>
          <Text style={detail.ordinaryText}>在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。{`\n\n`}
            在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const SwiperHeader = props => {
  let { navigation } = props
    , picArr = [pic5, pic6, pic5, pic6, pic7]
  return (
    <View style={detail.headerView}>
      <Swiper height={230} dotColor={loginBorderColor} activeDotColor={mainColor}>
        {
          picArr.map((picItem, index)=> <View key={index} style={detail.picsView}>
            <Image style={detail.pics} source={picItem}/>
          </View>)
        }
      </Swiper>
      <TouchableOpacity style={detail.gobackIcon} onPress={() => navigation.goBack()}>
        <Image source={gobackWhiteIcon}/>
      </TouchableOpacity>
    </View>
  )
}

const dateToArr = (date)=> {
  let dateArr = date.replace(/\-/, '|').split('|')
  return dateArr
}

const TimeLineForm = props => {
  let { timelineData } = props
  return (
    <View style={{paddingVertical: 10}}>
      {
        timelineData.map((lineItem, l)=> <LineItem key={l} lineItem={lineItem} l={l} total={timelineData.length} />)
      }
    </View>
  )
}

const LineItem = props => {
  let { lineItem, l, total } = props
    , lineItemYear = dateToArr(lineItem.time)[0]
    , lineItemDay = dateToArr(lineItem.time)[1]
  return (
    <View style={detail.oneTimeView}>
      <View style={detail.oneTimeLineView}>
        <View style={detail.dateView}>
          <Text style={detail.dateText}>{lineItemYear}</Text>
          <Text style={detail.dateText}>{lineItemDay}</Text>
        </View>
        <View style={detail.lineDrawView}>
          <View style={detail.shortTerm} />
          <View style={[detail.dotView, l%2 == 0 ? {backgroundColor: primaryColor, borderColor: primaryColor} : {}]} />
          <View style={[detail.longTerm, {flex: l == total-1 ? 0 : 1}]} />
        </View>
      </View>
      <View style={detail.contentView}>
        <Text style={detail.typeText}>{lineItem.title}</Text>
        <Text style={detail.contentText}>{lineItem.content}</Text>
      </View>
    </View>
  )
}
