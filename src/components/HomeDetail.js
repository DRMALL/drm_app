import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper'
import moment from 'moment'
import { primaryColor, mainColor, loginBorderColor, loginBackgroundColor } from '../common/constants'
import {  } from '../common/strings'
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
        <StatusBar hidden={true}/>
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
  return (
    <View style={seekDetail.headerView}>
      <Swiper height={230} horizontal={true} dotColor={loginBorderColor} activeDotColor={mainColor}>
        {renderSwiper(picData)}
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

const renderSwiper = (picData)=> {
  return (
    // picData[0] ? 
    picData.map((picItem, index)=> <View key={index} style={seekDetail.picsView}>
      <Image style={seekDetail.pics} source={{uri: picItem.url}}/>
    </View>)
     // : <TouchUploadPic />
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


// {
//           picData[0] ? <View style={seekDetail.picsView}>
//             <Image style={seekDetail.pics} source={{uri: picData[0].url}}/>
//           </View> : <TouchUploadPic />
//         }
//         {
//           picData[1] ? <View style={seekDetail.picsView}>
//             <Image style={seekDetail.pics} source={{uri: picData[1].url}}/>
//           </View> : <TouchUploadPic />
//         }
//         {
//           picData[2] ? <View style={seekDetail.picsView}>
//             <Image style={seekDetail.pics} source={{uri: picData[2].url}}/>
//           </View> : <TouchUploadPic />
//         }
//         {
//           picData[3] ? <View style={seekDetail.picsView}>
//             <Image style={seekDetail.pics} source={{uri: picData[3].url}}/>
//           </View> : <TouchUploadPic />
//         }
//         {
//           picData[4] ? <View style={seekDetail.picsView}>
//             <Image style={seekDetail.pics} source={{uri: picData[4].url}}/>
//           </View> : <TouchUploadPic />
//         }