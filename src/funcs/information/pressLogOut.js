import React from 'react'
import { Alert } from 'react-native'
import confirmLogOut from './confirmLogOut'

export default (props)=> {
  Alert.alert('提示', '您将退出？',
    [ {text: '取消', onPress: () => 'OK'}, 
      {text: '确定', onPress: () => confirmLogOut(props)}, ],
    { cancelable: false }
  )
}