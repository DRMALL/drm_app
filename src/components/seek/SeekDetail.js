import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper'
import ShareModal from '../units/ShareModal'
import { primaryColor, mainColor, loginBorderColor } from '../../common/constants'
import { partParameter, applicableEquipment, inventoryStatus, materialLongCode, materialName, materialModels, materialUnites } from '../../common/strings'
import { seekDetail } from '../../styles'
// import { seekData } from '../../utils/virtualData'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const shareIcon = require('../../images/navigation_icons/share.png')
const pic5 = require('../../images/pic5.png')
const pic6 = require('../../images/pic6.png')
const pic7 = require('../../images/pic7.png')

export default class SeekDetail extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 0,
      top: 50,
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      shareShow: false,
      topView: {position: 'relative', zIndex: 3},
      nextView: {position: 'absolute', zIndex: 2},
    }
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
    let { seekItem } = this.props.navigation.state.params
    let { navigation } = this.props
      , { shareShow, topView, nextView } = this.state
      // , seekItem = seekData[0]
    return (
      <View>
        <ScrollView style={[{width: '100%'}, shareShow ? nextView : topView]}>
          <StatusBar hidden={true}/>
          <SeekSwiperHeader navigation={navigation} pressShareShow={this.pressShareShow.bind(this)}/>
          <View style={{top: -20}}>
            <Text style={seekDetail.fixText}>{partParameter}</Text>
            <View style={seekDetail.textView}>
              <Text style={seekDetail.fixItemText}>{materialLongCode}</Text>
              <Text style={seekDetail.seekItemText}>{seekItem.longCode}</Text>
            </View>
            <View style={seekDetail.textView}>
              <Text style={seekDetail.fixItemText}>{materialName}</Text>
              <Text style={seekDetail.seekItemText}>{seekItem.materialName}</Text>
            </View>
            <View style={seekDetail.textView}>
              <Text style={seekDetail.fixItemText}>{materialModels}</Text>
              <Text style={seekDetail.seekItemText}>{seekItem.models}</Text>
            </View>
            <View style={seekDetail.textView}>
              <Text style={seekDetail.fixItemText}>{materialUnites}</Text>
              <Text style={seekDetail.seekItemText}>{seekItem.unites}</Text>
            </View>
            <Text style={seekDetail.fixText}>{applicableEquipment}</Text>
            <Text style={seekDetail.itemText}>纯氧复合热载体发生器</Text>
            <Text style={seekDetail.fixText}>{inventoryStatus}</Text>
            <Text style={seekDetail.itemText}>库存充分</Text>
          </View>
        </ScrollView>
        <ShareModal state={this.state} pressShareCancel={this.pressShareCancel.bind(this)}/>
      </View>
    )
  }
}

const SeekSwiperHeader = props => {
  let { navigation, pressShareShow } = props
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
      <TouchableOpacity style={seekDetail.shareIcon} onPress={() => pressShareShow()}>
        <Image source={shareIcon}/>
      </TouchableOpacity>
    </View>
  )
}

