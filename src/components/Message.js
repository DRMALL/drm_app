import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import moment from 'moment'
import { primaryColor, mainColor, backgroundColor, subTitleColor } from '../common/constants'
import { messageText, allSetAsRead, inTheEnd, tokenKey, orderInformat, equipMonitorin, 
        unknown, replyAlready, replyWaiting, abnormal, normal } from '../common/strings'
import { message } from '../styles'
import { checkToken } from '../utils/handleToken'
import { getPort, postPort } from '../utils/fetchMethod'
import { getNotices, setAllNoticesRead } from '../apis'
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
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 20}} onPress={()=> navigation.state.params.setAllRead()}>
      <Text style={{fontSize: 14, color: mainColor}}>{allSetAsRead}</Text>
    </TouchableOpacity>,
  });

  constructor(props) {
    super(props)
    this.state = {
      noticeData: null,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({  
      setAllRead: () => {
        this.postNoticeRead()
      }, 
    })
    this.getNotices()
  }

  postNoticeRead() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await postPort(`${setAllNoticesRead}?token=${token}`)
      if(!res) {
        alert('server error')
      } else if(res.code == 201) {
        alert('全部已设置成已读')
        this.getNotices()
      } else alert(JSON.stringify(res))
    })
  }

  getNotices() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getNotices}?token=${token}`)
      if(!res) {
        alert('server error')
      } else if(res.code == 200) {
        this.setState({
          noticeData: res.data,
        })
      } else alert(JSON.stringify(res))
    })
  }

  render() {
    let { navigation } = this.props
      , { noticeData } = this.state
    if(!noticeData) return <View />
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

const MessageItem = props => {
  let { navigation, msgItem } = props
  return (
    <View style={message.itemView}>
      <TouchableOpacity style={message.itemTouchView} activeOpacity={0.8} onPress={()=> navigation.navigate('dynamicOrder', { msgId: msgItem._id, msgReaded: msgItem.readed })}>
        <View style={msgItem.readed ? message.empty : message.redDot} />
        <View style={message.textPart}>
          <View style={message.topLine}>
            <Text style={message.textTitle}>
              {msgItem.types == 'order' ? orderInformat : (msgItem.types == 'order' ? equipMonitorin : unknown)}
            </Text>
            <Text style={message.textTime}>{moment(new Date(msgItem.order.time)).format('YYYY-MM-DD')}</Text>
          </View>
          <Text style={message.textAbstract}>{msgItem.des}</Text>
          <Text style={[message.textState, { color: msgItem.readed ? subTitleColor : lightBlueColor }]}>状态：
            {
              msgItem.types == 'order' && msgItem.status ? replyAlready : (
                msgItem.types == 'order' && !msgItem.status ? replyWaiting : (
                  !msgItem.status ? abnormal : normal
                )
              )
            }
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

