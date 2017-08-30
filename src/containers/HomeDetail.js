import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, Alert, Platform, WebView, Dimensions } from 'react-native'
import moment from 'moment'
import { primaryColor, mainColor, loginBorderColor, loginBackgroundColor } from '../common/constants'
import { tokenKey, internalServerError } from '../common/strings'
import Loading2 from '../components/units/Loading2'
import ShareModal from '../components/units/ShareModal'
import { seekDetail, detail } from '../styles'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getNewsOne } from '../apis'

import HomeSwiperHeader from '../components/home/HomeSwiperHeader'
import store from '../utils/store'
import homeDetailAC from '../actions/homeDetailAC'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')
const shareIcon = require('../images/navigation_icons/share.png')
const icInsertPhotoIcon = require('../images/navigation_icons/ic_insert_photo.png')
const uploadPic = require('../images/uploadPic.png')

let windowWidth = Math.round((Dimensions.get('window').width-60))

export default class HomeDetail extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 0,
      top: 50,
    }
  };

  constructor(props) {
    super(props)
    this.state = store.getState().home
  }

  componentDidMount() {
    homeDetailAC.getOneData({})
    this.getNewsOne()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().home) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  getNewsOne() {
    let id = this.props.navigation.state.params.newsId
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getNewsOne}?id=${id}&token=${token}`)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 201) {
        homeDetailAC.getOneData(res.data)
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  onLoadFinish() {

  }

  handleDom() {
    const injectdScript = `
      (function () {
        const arr = document.getElementsByTagName(\"img\")
        let height = null
        for (let i = 0; i < arr.length; i ++) {
          arr[i].width = ${windowWidth}
        }
        function changeHeight() {
          if (document.body.scrollHeight != height) {
            height = document.body.scrollHeight
            if (window.postMessage) {
              window.postMessage(JSON.stringify({
                type: 'setHeight',
                height: height,
              }))
            }
          }
        }
        setInterval(changeHeight, 100)
      } () )`
    // return [...].join('\n')
    return injectdScript
  }

  onMessage(event) {
    try {
      const postMsgData = JSON.parse(event.nativeEvent.data)
      if (postMsgData.type === 'setHeight' && postMsgData.height > 0) {
        homeDetailAC.changeWVHeight(postMsgData.height)
      }
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    let { navigation } = this.props
      , { newsOneData, shareShow, topView, nextView, height } = this.state
      , { hiddenShare } = homeDetailAC
      , contentLength = newsOneData.content ? newsOneData.content.split('').length : 0
    return (
      <View style={Platform.OS === 'ios' ? {top: -20, height: '103.5%'} : {height: '100%'}}>
        <ScrollView style={[{backgroundColor: mainColor}, shareShow ? nextView : topView]}>
          <StatusBar hidden={true}/>
          {
            !newsOneData.images ? <Loading2 animating={!newsOneData.images ? true : false} /> : 
            <HomeSwiperHeader picData={newsOneData.images} navigation={navigation} />
          }
          <Text style={[detail.titleText, {paddingHorizontal: 16}]}>{newsOneData.abstract}</Text>
          <Text style={[detail.titleTime, {paddingHorizontal: 16, paddingTop: 15}]}>
            {
              newsOneData.publish_time ? moment(newsOneData.publish_time).format('YYYY-MM-DD') : '0000-00-00'
            }
          </Text>
          <View style={{height: Math.round(contentLength*17/12), paddingHorizontal: 16}}>
            <WebView 
              style={{height: '100%'}}
              automaticallyAdjustContentInsets={false}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scrollEnabled={false}
              onMessage={this.onMessage.bind(this)}
              injectedJavaScript={this.handleDom()}
              source={{html: newsOneData.content}}
            />
          </View>
        </ScrollView>
        <ShareModal state={this.state} pressShareCancel={hiddenShare}/>
      </View>
    )
  }
}

// <Text style={detail.ordinaryText}>
//             {newsOneData.content}
//           </Text>
// const TouchUploadPic =  props => {
//   let { navigation } = props
//   return (
//     <TouchableOpacity style={detail.picsView} activeOpacity={0.8} disabled={true} onPress={()=> alert('upload')}>
//       <Image style={[detail.pics, {resizeMode: 'center', backgroundColor: loginBackgroundColor}]} source={icInsertPhotoIcon}/>
//     </TouchableOpacity>
//   )
// }
