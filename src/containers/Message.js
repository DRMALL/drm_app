import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Loading from '../components/units/Loading'
import { primaryColor, mainColor } from '../common/constants'
import { messageText, 
        allSetAsRead, 
        inTheEnd, 
        tokenKey, 
} from '../common/strings'
import { message } from '../styles'
import { checkToken } from '../utils/handleToken'
import { getPort, postPort } from '../utils/fetchMethod'
import { getNotices, setAllNoticesRead } from '../apis'

import MessageItem from '../components/message/MessageItem'
import store from '../utils/store'
import messageAC from '../actions/messageAC'

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
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 20}} onPress={()=> navigation.state.params.setAllRead()}>
      <Text style={{fontSize: 14, color: mainColor}}>{allSetAsRead}</Text>
    </TouchableOpacity>,
  });

  constructor(props) {
    super(props)
    this.state = store.getState().message
  }

  componentDidMount() {
    this.props.navigation.setParams({  
      setAllRead: () => {
        this.postNoticeRead()
      }, 
    })
    this.getNotices()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().message) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  postNoticeRead() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await postPort(`${setAllNoticesRead}?token=${token}`)
      if(!res) {
        Alert.alert('❌错误', 'Internal Server Error',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 201) {
        Alert.alert('通知', '全部已设置成已读',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
        this.getNotices()
      } else {
        Alert.alert('❌错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  getNotices() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getNotices}?token=${token}`)
      if(!res) {
        Alert.alert('❌错误', 'Internal Server Error',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        messageAC.getAll(res.data)
      } else {
        Alert.alert('❌错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  render() {
    let { navigation } = this.props
      , { noticeData } = this.state

    if(!noticeData) return <Loading animating={!noticeData ? true : false}/>
    noticeData.sort((a, b)=> {
      return new Date(b.order.time) - new Date(a.order.time)
    })
    return (
      <ScrollView style={message.scrollView}>
        { noticeData.map((msgItem, i)=> <MessageItem key={i} msgItem={msgItem} navigation={navigation}/>) }
        <Text style={message.endText}>{inTheEnd}</Text>
      </ScrollView>
    )
  }
}

