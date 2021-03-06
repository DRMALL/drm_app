import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, Platform, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
import ShareModal from '../../components/units/ShareModal'
import { primaryColor, mainColor, loginBorderColor } from '../../common/constants'
import { partParameter, applicableEquipment, inventoryStatus, materialLongCode, materialName, materialModels, materialUnites } from '../../common/strings'
import { seekDetail } from '../../styles'
// import { seekData } from '../../utils/virtualData'

import store from '../../utils/store'
import seekAC from '../../actions/seekAC'
import getPartOneData from '../../funcs/seek/getPartOneData'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const shareIcon = require('../../images/navigation_icons/share.png')
const picMaskIcon = require('../../images/navigation_icons/pic_mask.png')
const pic5 = require('../../images/pic5.png')
const pic6 = require('../../images/pic6.png')
const pic7 = require('../../images/pic7.png')
let swiperHeight = (Dimensions.get('window').width)/3*2

export default class SeekDetail extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 0,
      top: 50,
    }
  };

  constructor(props) {
    super(props)
    this.state = store.getState().seek
  }

  componentDidMount() {
    let { seekId } = this.props.navigation.state.params
    getPartOneData(seekId, this.props)
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().seek) )
  }

  componentWillUnmount(){
    seekAC.setOnePart({})
    this.unsubscribe()
  }

  render() {
    let { navigation } = this.props
      , { shareShow, topView, secondView, oneSeekPartData } = this.state
      , { pressShareCancel } = seekAC
    return (
      <View style={Platform.OS === 'ios' ? {top: -20, height: '103.5%'} : {height: '100%'}}>
        <ScrollView style={[{width: '100%'}, shareShow ? secondView : topView]}>
          <StatusBar hidden={true}/>
          <SeekSwiperHeader navigation={navigation} />
          <View style={{top: -5}}>
            <Text style={seekDetail.fixText}>{partParameter}</Text>
            <View style={seekDetail.textView}>
              <Text style={seekDetail.fixItemText}>{materialLongCode}</Text>
              <Text style={seekDetail.seekItemText}>{oneSeekPartData.code || '0.0.0'}</Text>
            </View>
            <View style={seekDetail.textView}>
              <Text style={seekDetail.fixItemText}>{materialName}</Text>
              <Text style={seekDetail.seekItemText}>{oneSeekPartData.name || ''}</Text>
            </View>
            <View style={seekDetail.textView}>
              <Text style={seekDetail.fixItemText}>{materialModels}</Text>
              <Text style={seekDetail.seekItemText}>{oneSeekPartData.model || 'a-b-c'}</Text>
            </View>
            <View style={seekDetail.textView}>
              <Text style={seekDetail.fixItemText}>{materialUnites}</Text>
              <Text style={seekDetail.seekItemText}>{oneSeekPartData.unit || ''}</Text>
            </View>
            <Text style={seekDetail.fixText}>{applicableEquipment}</Text>
            <Text style={seekDetail.itemText}>纯氧复合热载体发生器</Text>
            <Text style={seekDetail.fixText}>{inventoryStatus}</Text>
            <Text style={seekDetail.itemText}>库存充分</Text>
          </View>
        </ScrollView>
        <ShareModal state={this.state} pressShareCancel={pressShareCancel}/>
      </View>
    )
  }
}

const SeekSwiperHeader = props => {
  let { navigation } = props
    , picArr = [pic5, pic6, pic5, pic6, pic7]  //图片数组
    , { pressShareShow } = seekAC
  return (
    <View style={seekDetail.headerView}>
      <Swiper height={swiperHeight} dotColor={loginBorderColor} activeDotColor={mainColor}>
        {
          picArr.map((picItem, index)=> <View key={index} style={seekDetail.picsView}>
            <Image style={seekDetail.pics} source={picItem}/>
            <Image style={{width: '100%', height: '100%', resizeMode: 'stretch', position: 'absolute' }} source={picMaskIcon}/>
          </View>)
        }
      </Swiper>
      <TouchableOpacity style={seekDetail.gobackIcon} onPress={() => navigation.goBack()}>
        <Image source={gobackWhiteIcon}/>
      </TouchableOpacity>
      {
      // <TouchableOpacity style={seekDetail.shareIcon} onPress={() => pressShareShow()}>
      //   <Image source={shareIcon}/>
      // </TouchableOpacity>
      }
    </View>
  )
}

