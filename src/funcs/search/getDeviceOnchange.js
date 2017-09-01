import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getDevicesSearch } from '../../apis'
import store from '../../utils/store'
import deviceAC from '../../actions/deviceAC'

export default (text)=> {
  deviceAC.setJumpData({
    text: text,
    jumpData: text == '' ? false : true,
  })
  checkToken(tokenKey)
  .then(async token => {
    let dvtext = store.getState().device.text
    let res = await getPort(`${getDevicesSearch}?type=onchange&search=${dvtext}&token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 200) {
      deviceAC.getDeviceData(res.data)
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}