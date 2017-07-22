import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { primaryColor, mainColor, backgroundColor, subTitleColor } from '../common/constants'
import { messageText, allSetAsRead, inTheEnd } from '../common/strings'
import { message } from '../styles'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')

export default class Message extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{messageText}</Text>,
    headerLeft: <TouchableOpacity style={{paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{paddingRight: 20}} onPress={() => alert('已设为已读')}>
      <Text style={{fontSize: 14, color: mainColor}}>{allSetAsRead}</Text>
    </TouchableOpacity>,
  })
  render() {
    return (
      <ScrollView style={message.scrollView}>
        <Text style={{backgroundColor: mainColor}}>This is my messages</Text>
        <Text style={message.endText}>{inTheEnd}</Text>
      </ScrollView>
    )
  }
}