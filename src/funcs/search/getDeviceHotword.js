import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, inTheEnd, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getDevicesHots } from '../../apis'
import deviceAC from '../../actions/deviceAC'

export default ()=> {
  checkToken(tokenKey)
  .then(async token => {
    let res = await getPort(`${getDevicesHots}?token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 200) {
      deviceAC.getHotword(res.data)
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}