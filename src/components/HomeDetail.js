import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import Swiper from 'react-native-swiper'
import moment from 'moment'
import { primaryColor, mainColor, loginBorderColor, loginBackgroundColor } from '../common/constants'
import {  } from '../common/strings'
import Loading from './units/Loading'
import ShareModal from './units/ShareModal'
import { seekDetail, detail } from '../styles'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getNewsOne } from '../apis'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')
const shareIcon = require('../images/navigation_icons/share.png')
const icInsertPhotoIcon = require('../images/navigation_icons/ic_insert_photo.png')
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
      newsOneData: null,
      shareShow: false,
      topView: {position: 'relative', zIndex: 3},
      nextView: {position: 'absolute', zIndex: 2},
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

  pressShareShow() {
    this.setState({
      shareShow: true,
    })
  }

  pressShareCancel() {
    this.setState({
      shareShow: false,
    })
  }

  render() {
    let { navigation } = this.props
      , { newsOneData, shareShow, topView, nextView } = this.state

    if(!newsOneData) return <Loading animating={!newsOneData ? true : false}/>
    return (
      <View>
        <ScrollView style={[{backgroundColor: mainColor}, shareShow ? nextView : topView]}>
          <StatusBar hidden={true}/>
          <HomeSwiperHeader picData={newsOneData.images} navigation={navigation} pressShareShow={this.pressShareShow.bind(this)}/>
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
        <ShareModal state={this.state} pressShareCancel={this.pressShareCancel.bind(this)}/>
      </View>
    )
  }
}


const HomeSwiperHeader = props => {
  let { picData, navigation, pressShareShow } = props
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
      <TouchableOpacity style={seekDetail.shareIcon} onPress={() => pressShareShow()}>
        <Image source={shareIcon}/>
      </TouchableOpacity>
    </View>
  )
}

const TouchUploadPic =  props => {
  let { navigation } = props
  return (
    <TouchableOpacity style={detail.picsView} activeOpacity={0.8} disabled={true} onPress={()=> alert('upload')}>
      <Image style={[detail.pics, {resizeMode: 'center', backgroundColor: loginBackgroundColor}]} source={icInsertPhotoIcon}/>
    </TouchableOpacity>
  )
}
