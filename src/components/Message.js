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
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 20}} onPress={() => alert('已设为已读')}>
      <Text style={{fontSize: 14, color: mainColor}}>{allSetAsRead}</Text>
    </TouchableOpacity>,
  })
  render() {
    let { navigation } = this.props
    return (
      <ScrollView style={message.scrollView}>
        { messagesList.map((msgItem, i)=> <MessageItem key={i} msgItem={msgItem} navigation={navigation}/>) }
        <Text style={message.endText}>{inTheEnd}</Text>
      </ScrollView>
    )
  }
}

const MessageItem = props => {
  let { navigation, msgItem } = props
  return (
    <View style={message.itemView}>
      <TouchableOpacity style={message.itemTouchView} activeOpacity={0.8} onPress={()=> navigation.navigate('dynamicOrder', {name: 'DynamicOrder', msgItem: msgItem})}>
        <View style={msgItem.read ? message.empty : message.redDot} />
        <View style={message.textPart}>
          <View style={message.topLine}>
            <Text style={message.textTitle}>{msgItem.title}</Text>
            <Text style={message.textTime}>{msgItem.publish_time}</Text>
          </View>
          <Text style={message.textAbstract}>{msgItem.abstract}</Text>
          <Text style={message.textState}>{'状态：' + msgItem.state}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

