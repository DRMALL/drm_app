import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { primaryColor, mainColor } from '../../common/constants'
import { unsolvedGoToPushOrder } from '../../common/strings'
import { diagDetail } from '../../styles'
import Button from '../units/Button'
import { diagnosisData } from '../../utils/virtualData'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const shareIcon = require('../../images/navigation_icons/share.png')

export default class DiagDetail extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <Text style={{ fontSize: 18, color: '#FFF', alignSelf: 'center' }} >设备忽然有较大噪音的原因设备忽然有较大噪音的原因</Text>
    </ScrollView>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 20}} onPress={() => alert('share')}>
      <Image source={shareIcon}/>
    </TouchableOpacity>,
  })
  render() {
    // let {  } = this.props.navigation.state.params
    let { navigation } = this.props
    let diagItemData = diagnosisData[0]
    return (
      <ScrollView style={diagDetail.wrap}>
        <Text style={diagDetail.titleText}>{diagItemData.title}</Text>
        <Text style={diagDetail.kindText}>{diagItemData.kinds}</Text>
        <Text style={diagDetail.contentText}>{diagItemData.describe}</Text>
        <Image style={diagDetail.img} source={diagItemData.pic}/>
        <Text style={diagDetail.contentText}>{diagItemData.returnDescribe}</Text>
        <View style={diagDetail.buttonView}>
          <Button 
            style={diagDetail.button} 
            title={unsolvedGoToPushOrder} 
            titleStyle={{fontSize: 14, color: mainColor}} 
            activeOpacity={0.8} 
            onPress={()=> navigation.navigate('pushOrder', {name: 'PushOrder'})}
          />
        </View>
      </ScrollView>
    )
  }
}