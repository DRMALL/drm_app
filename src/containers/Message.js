import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Loading from '../components/units/Loading'
import { primaryColor, mainColor } from '../common/constants'
import { messageText, 
        allSetAsRead, 
        inTheEnd, 
} from '../common/strings'
import { message } from '../styles'

import MessageItem from '../components/message/MessageItem'
import store from '../utils/store'
import postNoticeRead from '../funcs/message/postNoticeRead'
import getNotices from '../funcs/message/getNotices'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'main', params: { msgRedShow: false } }),
  ]
})

export default class Message extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{messageText}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} 
      onPress={() => {
        navigation.state.params.gobackParams ? navigation.goBack() : navigation.dispatch(resetAction)
      } 
    }>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 20}} onPress={()=> navigation.state.params.setAllRead()} disabled={navigation.state.params.disabledPress}>
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
        postNoticeRead(this.props)
      }, 
      disabledPress: false,
    })
    getNotices()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().message) )
  }

  componentWillUnmount(){
    this.unsubscribe()
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

