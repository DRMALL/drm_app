//getPartOneData.js
import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getPartOne } from '../../apis'

import seekAC from '../../actions/seekAC'

export default (id, props)=> {
  checkToken(tokenKey)
  .then(async token => {
    let res = await getPort(`${getPartOne}?id=${id}&token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 200) {
      if(res.data === null) {
        Alert.alert('提示', '暂无内容,请刷新再试',
          [ {text: 'OK', onPress: () => 'ok'}, ],
          { cancelable: false }
        )
        props.navigation.goBack()
      } else seekAC.setOnePart(res.data)
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}