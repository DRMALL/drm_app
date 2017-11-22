import React from 'react'
import { Alert, AsyncStorage } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import store from '../../utils/store'
import { getPort } from '../../utils/fetchMethod'
import { getNotices } from '../../apis'

import messageAC from '../../actions/messageAC'

export default ()=> {
  checkToken(tokenKey)
  .then(async token => {
    let res = await getPort(`${getNotices}?token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 200) {
      messageAC.getAll(res.data)
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}