import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { primaryColor, mainColor, backgroundColor, subTitleColor } from '../common/constants'
import { messageText, allSetAsRead, inTheEnd } from '../common/strings'
import { message } from '../styles'
import { messagesList } from '../utils/virtualData'

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
        { messagesList.map((msgItem, i)=> <MessageItem key={i} msgItem={msgItem} />) }
        <Text style={message.endText}>{inTheEnd}</Text>
      </ScrollView>
    )
  }
}

const MessageItem = props => {
  return (
    <View style={message.itemView}>
      <View style={props.msgItem.read ? message.empty : message.redDot} />
      <View style={message.textPart}>
        <View style={message.topLine}>
          <Text style={message.textTitle}>{props.msgItem.title}</Text>
          <Text style={message.textTime}>{props.msgItem.publish_time}</Text>
        </View>
        <Text style={message.textAbstract}>{props.msgItem.abstract}</Text>
        <Text style={message.textState}>{'状态：' + props.msgItem.state}</Text>
      </View>
    </View>
  )
}

