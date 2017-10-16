import React from 'react'
import { Alert } from 'react-native'
import socket from 'socket.io-client'
import { NavigationActions } from 'react-navigation'
import statuAC from '../../actions/statuAC'

let dataArr = []
  , timeStampArr = []

export default (io, navigation)=> {
  io.on('connect', ()=> {
    console.log('connect')
  })
  io.on('news', (data) => {
    dataArr.push(data)
    timeStampArr.push(new Date().getTime())
    let len = dataArr.length
    if(timeStampArr[len - 1] - timeStampArr[0] > 2000) {
      // console.log(dataArr, timeStampArr)
      statuAC.getEquipData(dataArr)
      dataArr = []
      timeStampArr = []
    }
  })
  io.on('orderNotice', (data) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'main', params: { msgRedShow: true } }),
      ]
    })
    navigation.dispatch(resetAction)
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


// this.io = socket(`https://drmtest.sparklog.com/socket`)
    // this.io.on('connect', ()=> {
    //   console.log('connect')
    // })
    // this.io.on('news', (data) => {
    //   statuAC.getEquipData(data)
    //   console.log(data)
    // })
    // this.io.on('connect_error', (error) => {
    //   Alert.alert('错误', '连接错误',
    //     [ {text: 'OK', onPress: () => this.io.close()}, ],
    //     { cancelable: false }
    //   )
    // })
    // this.io.on('connect_timeout', (timeout) => {
    //   Alert.alert('错误', '连接超时',
    //     [ {text: 'OK', onPress: () => this.io.close()}, ],
    //     { cancelable: false }
    //   )
    // })
    // this.io.on('disconnect', ()=> {
    //   console.log('disconnect')
    // })