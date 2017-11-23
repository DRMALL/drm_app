import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator, RefreshControl } from 'react-native'
import moment from 'moment'
import { NavigationActions } from 'react-navigation'
import Button from '../../components/units/Button'
import Loading from '../../components/units/Loading'
import { primaryColor, mainColor, contentColor } from '../../common/constants'
import { equipAlarm, orderDynamic, alarmContent, orderContent, orderReturn, solved, unsolved, tokenKey, internalServerError } from '../../common/strings'
import { dynamicOrder, detail } from '../../styles'
import { checkToken, depositToken } from '../../utils/handleToken'
import { getPort, postPort } from '../../utils/fetchMethod'
import { getOrderOne, getNoticesOne, setOneNoticesRead, setOrderSolved } from '../../apis'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const emptyIcon = require('../../images/navigation_icons/empty.png')

export default class DynamicOrder extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{ navigation.state.params.msgType == 'device' ? equipAlarm : orderDynamic}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <Image style={{marginLeft: 20}} source={emptyIcon}/>,
  });

  constructor(props) {
    super(props)
    this.state = {
      isMounted: false,
      isRefreshing: false,
      oneNoticeData: null,
      showdatu: false, 
      enlargeUrl: 'null',
      backLoading: false,
      isSolved: false,
    }
  }

  componentDidMount() {
    this.setState({isMounted: true})
    this.postNoticeRead()
    this.getNotice()
  }

  componentWillUnmount(){
    this.setState({isMounted: false})
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
          Alert.alert('错误', internalServerError,
            [ {text: 'OK', onPress: () => 'OK'}, ],
            { cancelable: false }
          )
        } else if(res.code == 201) {
          console.log('readed one')
        } else {
          Alert.alert('错误', JSON.stringify(res.message),
            [ {text: 'OK', onPress: () => 'OK'}, ],
            { cancelable: false }
          )
        }
      })
    }
  }

  getNotice() {
    let { msgId } = this.props.navigation.state.params
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getNoticesOne}?id=${msgId}&token=${token}`)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        this.getOrder(res.data.order.id)
        if(this.state.isMounted) {
          this.setState({
            oneNoticeData: res.data,
          })
        }
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  postOrderSolved() {
    this.setState({ backLoading: true })
    checkToken(tokenKey)
    .then(async token => {
      let { oneNoticeData } = this.state
      let bodyData = {
        id: oneNoticeData.order.id,
      }
      let res = await postPort(`${setOrderSolved}?token=${token}`, bodyData)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 201) {
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ 
              routeName: 'main',
              params: {
                msgRedShow: false, 
              },
            }),
            NavigationActions.navigate({ 
              routeName: 'message', 
              params: {
                disabledPress: true, 
                gobackParams: true,
              },
            }),
          ]
        })
        this.props.navigation.dispatch(resetAction)
        this.setState({ backLoading: false })
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  pressOrderImgEnlarge(url) {
    this.setState({
      showdatu: true,
      enlargeUrl: url,
    })
  }

  onIsRefresh() {
    this.setState({isRefreshing: true})
    this.getNotice()
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, 2000)
  }

  getOrder(id) {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getOrderOne}?id=${id}&token=${token}`)
      if(!res) {
        // Alert.alert('错误', internalServerError,
        //   [ {text: 'OK', onPress: () => 'OK'}, ],
        //   { cancelable: false }
        // )
      } else if(res.code == 200) {
        if (res.data.isDone) {
          this.setState({isSolved: true})
        }
      } else {
        // Alert.alert('错误', JSON.stringify(res.message),
        //   [ {text: 'OK', onPress: () => 'OK'}, ],
        //   { cancelable: false }
        // )
      }
    })
  }

  render() {
    let { oneNoticeData, showdatu, enlargeUrl, backLoading, isRefreshing } = this.state
      , { navigation } = this.props

    if (!oneNoticeData) return <Loading animating={!oneNoticeData ? true : false}/>
    else if(oneNoticeData.types == 'device') return (
      <View style={{height: '100%'}}>
        <ActivityIndicator style={backLoading ? detail.enlargeTouchView : {display: 'none'}} animating={backLoading} size='large'/>
        <ScrollView 
          style={dynamicOrder.wrap}
          refreshControl={<RefreshControl 
            refreshing={isRefreshing}
            onRefresh={this.onIsRefresh.bind(this)}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor={mainColor}
          />}
        >
          <Text style={dynamicOrder.fixContentText}>{alarmContent}</Text>
          <View style={dynamicOrder.orderView}>
            <Text style={dynamicOrder.titleText}>{oneNoticeData.des}</Text>
          </View>
          <View style={[dynamicOrder.returnTimeView, {borderWidth: 0}]}>
            <Text style={dynamicOrder.fixReturnText}>{''}</Text>
            <Text style={dynamicOrder.returnTime}>{moment(new Date(oneNoticeData.createdAt)).format('YYYY-MM-DD HH:mm')}</Text>
          </View>
        </ScrollView>
      </View>
    )
    return (
      <View style={{height: '100%'}}>
        <ActivityIndicator style={backLoading ? detail.enlargeTouchView : {display: 'none'}} animating={backLoading} size='large'/>
        <TouchableOpacity style={showdatu ? detail.enlargeTouchView : {display: 'none'}} onPress={()=> this.setState({showdatu: false})} >
          <Image style={detail.enlargeImg} source={{uri: enlargeUrl}}/>
        </TouchableOpacity>
        <ScrollView 
          style={dynamicOrder.wrap}
          refreshControl={<RefreshControl 
            refreshing={isRefreshing}
            onRefresh={this.onIsRefresh.bind(this)}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor={mainColor}
          />}
        >
          <Text style={dynamicOrder.fixContentText}>{orderContent}</Text>
          <View style={dynamicOrder.orderView}>
            <Text style={dynamicOrder.titleText}>{oneNoticeData.des}</Text>
            <Text style={dynamicOrder.describeText}>{oneNoticeData.order.content}</Text>
            {
              oneNoticeData.order && oneNoticeData.order.images[0] ? <View style={dynamicOrder.picsView}>
                {
                  oneNoticeData.order.images.map((picItem, p)=> <OrderImg key={p} picItem={picItem.url} index={p} pressOrderImgEnlarge={this.pressOrderImgEnlarge.bind(this)}/>)
                }
              </View> : <View />
            }
          </View>
          <View style={dynamicOrder.returnTimeView}>
            <Text style={dynamicOrder.fixReturnText}>{orderReturn}</Text>
            <Text style={dynamicOrder.returnTime}>{moment(new Date(oneNoticeData.createdAt)).format('YYYY-MM-DD')}</Text>
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
            
            {
              !this.state.isSolved && <Button 
                style={dynamicOrder.solvedButton} 
                title={solved} 
                titleStyle={{color: mainColor}} 
                activeOpacity={0.8} 
                onPress={()=> this.postOrderSolved()} 
              />
            }
            
          </View>
        </ScrollView>
      </View>
    )
  }
}

const OrderImg= props => {
  let { picItem, index, pressOrderImgEnlarge } = props
  return (
    <TouchableOpacity onPress={()=> pressOrderImgEnlarge(`${picItem}`)}>
      <Image style={dynamicOrder.img} source={{uri: picItem}}/>
    </TouchableOpacity>
  )
}