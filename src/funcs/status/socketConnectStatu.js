import React from 'react'
import { Alert } from 'react-native'
import socket from 'socket.io-client'
import { NavigationActions } from 'react-navigation'
import statuAC from '../../actions/statuAC'

export default (navigation)=> {
  let io = socket(`https://api.wardenger.me/socket`)
  io.on('connect', ()=> {
    console.log('connect')
  })
  io.on('news', (data) => {
    statuAC.getEquipData(data)
    // console.log(data)
  })
  io.on('orderNotice', (data) => {
    // const setParamsAction = NavigationActions.setParams({
    //   params: { msgRedShow: true },
    //   key: 'message',
    // })
    // navigation.dispatch(setParamsAction)
    console.log(data)
  })
  io.on('connect_error', (error) => {
    Alert.alert('错误', '连接错误',
      [ {text: 'OK', onPress: () => io.close()}, ],
      { cancelable: false }
    )
  })
  io.on('connect_timeout', (timeout) => {
    Alert.alert('错误', '连接超时',
      [ {text: 'OK', onPress: () => io.close()}, ],
      { cancelable: false }
    )
  })
  io.on('disconnect', ()=> { 
    console.log('disconnect')
  })

}