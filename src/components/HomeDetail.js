import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import moment from 'moment'
import { primaryColor, mainColor, loginBorderColor } from '../common/constants'
import {  } from '../common/strings'
import { seekDetail, detail } from '../styles'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getNewsOne } from '../apis'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')
const shareIcon = require('../images/navigation_icons/share.png')
const uploadPic = require('../images/uploadPic.png')

export default class HomeDetail extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 0,
      top: 50,
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      newsOneData: {},
    }
  }

  componentDidMount() {
    this.getNewsOne()
  }

  getNewsOne() {
    let id = this.props.navigation.state.params.newsId
    checkToken('drmAppToken')
    .then(async token => {
      let res = await getPort(`${getNewsOne}?id=${id}&token=${token}`)
      if(res.code == 201) {
        this.setState({
          newsOneData: res.data,
        })
      }
    })
  }

  render() {
    let { navigation } = this.props
      , { newsOneData } = this.state
    return (
      <ScrollView style={{backgroundColor: mainColor}}>
        <HomeSwiperHeader picData={newsOneData.images ? newsOneData.images : []} navigation={navigation} />
        <Text style={[detail.titleText, {paddingHorizontal: 16}]}>{newsOneData.abstract}</Text>
        <Text style={[detail.titleTime, {paddingHorizontal: 16, paddingTop: 15}]}>
          {
            newsOneData.publish_time ? moment(newsOneData.publish_time).format('YYYY-MM-DD') : '0000-00-00'
          }
        </Text>
        <Text style={detail.ordinaryText}>
          {newsOneData.content}
        </Text>
      </ScrollView>
    )
  }
}

const HomeSwiperHeader = props => {
  let { picData, navigation } = props
    , arrpic = [uploadPic, uploadPic, uploadPic]
  return (
    <View style={seekDetail.headerView}>
      <Swiper height={230} dotColor={loginBorderColor} activeDotColor={mainColor}>
        { 
          picData[0] ? 
          picData.map((picItem, index)=> <View key={index} style={seekDetail.picsView}>
            <Image style={seekDetail.pics} source={{url: picItem.url}}/>
          </View>) : 
          <Image style={seekDetail.pics} source={uploadPic}/>
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