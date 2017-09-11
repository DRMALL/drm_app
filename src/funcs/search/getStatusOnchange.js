import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getMoniterdevsSearch } from '../../apis'

import store from '../../utils/store'
import statuAC from '../../actions/statuAC'

export default (text)=> {
  statuAC.setJumpData(text)
  checkToken(tokenKey)
  .then(async token => {
    let statuText = store.getState().statu.text
    let res = await getPort(`${getMoniterdevsSearch}?search=${statuText}&token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 200) {
      statuAC.setStatusData(res.data)
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}