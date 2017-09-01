import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { postPort } from '../../utils/fetchMethod'
import { setAllNoticesRead } from '../../apis'
import getNotices from './getNotices'

export default (props)=> {
  props.navigation.setParams({ 
    disabledPress: true,
  })
  checkToken(tokenKey)
  .then(async token => {
    let res = await postPort(`${setAllNoticesRead}?token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 201) {
      Alert.alert('通知', '全部已设置成已读',
        [ {text: 'OK', onPress: () => props.navigation.setParams({ disabledPress: false }) }, ],
        { cancelable: false }
      )
      getNotices()
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}