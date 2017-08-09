import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import moment from 'moment'
import Button from '../units/Button'
import { primaryColor, mainColor, contentColor } from '../../common/constants'
import { orderDynamic, orderContent, orderReturn, solved, unsolved, tokenKey } from '../../common/strings'
import { dynamicOrder } from '../../styles'
import { checkToken } from '../../utils/handleToken'
import { getPort, postPort } from '../../utils/fetchMethod'
import { getNoticesOne, setOneNoticesRead, setOrderSolved } from '../../apis'
// import { messagesList } from '../../utils/virtualData'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const emptyIcon = require('../../images/navigation_icons/empty.png')

export default class DynamicOrder extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{orderDynamic}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <Image style={{marginLeft: 20}} source={emptyIcon}/>,
  });

  constructor(props) {
    super(props)
    this.state = {
      oneNoticeData: null,
    }
  }

  componentDidMount() {
    this.postNoticeRead()
    this.getNotice()
  }

  postNoticeRead() {
    let { msgId, msgReaded } = this.props.navigation.state.params
    if(!msgReaded) {
      checkToken(tokenKey)
      .then(async token => {
        let bodyData = {
          id: msgId,
        }
        let res = await postPort(`${setOneNoticesRead}?token=${token}`, bodyData)
        if(!res) {
          alert('server error')
        } else if(res.code == 201) {
          console.log('readed one')
        } else alert(JSON.stringify(res))
      })
    }
  }

  getNotice() {
    let { msgId } = this.props.navigation.state.params
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getNoticesOne}?id=${msgId}&token=${token}`)
      if(!res) {
        alert('server error')
      } else if(res.code == 200) {
        this.setState({
          oneNoticeData: res.data,
        })
      } else alert(JSON.stringify(res))
    })
  }

  postOrderSolved(id) {
    checkToken(tokenKey)
    .then(async token => {
      let bodyData = {
        id: id,
      }
      let res = await postPort(`${setOrderSolved}?token=${token}`, bodyData)
      if(!res) {
        alert('server error')
      } else if(res.code == 201) {
        console.log(res)
      } else alert(JSON.stringify(res))
    })
  }

  render() {
    let { oneNoticeData } = this.state
      , { navigation } = this.props
    if (!oneNoticeData) return <View />
    return (
      <ScrollView style={dynamicOrder.wrap}>
        <Text style={dynamicOrder.fixContentText}>{orderContent}</Text>
        <View style={dynamicOrder.orderView}>
          <Text style={dynamicOrder.titleText}>{oneNoticeData.des}</Text>
          <Text style={dynamicOrder.describeText}>{oneNoticeData.order.content}</Text>
          {
            oneNoticeData.pics ? <View style={dynamicOrder.picsView}>
              {
                oneNoticeData.pics.map((picItem, p)=> <OrderImg key={p} picItem={picItem} index={p}/>)
              }
            </View> : <View />
          }
        </View>
        <View style={dynamicOrder.returnTimeView}>
          <Text style={dynamicOrder.fixReturnText}>{orderReturn}</Text>
          <Text style={dynamicOrder.returnTime}>{moment(new Date(oneNoticeData.order.time)).format('YYYY-MM-DD')}</Text>
        </View>
        <Text style={dynamicOrder.returnDescribe}>{oneNoticeData.order.feedback}</Text>
        <View style={dynamicOrder.buttonView}>
          <Button 
            style={dynamicOrder.unsolvedButton} 
            title={unsolved} 
            titleStyle={{color: contentColor}} 
            activeOpacity={0.8} 
            onPress={()=> navigation.navigate('pushOrder')} 
          />
          <Button 
            style={dynamicOrder.solvedButton} 
            title={solved} 
            titleStyle={{color: mainColor}} 
            activeOpacity={0.8} 
            onPress={()=> alert('已解决')} 
          />
        </View>
      </ScrollView>
    )
  }
}

const OrderImg= props => {
  let { picItem, index } = props
  return (
    <Image style={dynamicOrder.img} source={picItem}/>
  )
}