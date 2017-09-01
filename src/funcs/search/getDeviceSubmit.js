import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { saveWord } from '../../utils/searchBuffer'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getDevicesSearch } from '../../apis'
import store from '../../utils/store'
import deviceAC from '../../actions/deviceAC'

export default ()=> {
  checkToken(tokenKey)
  .then(async token => {
    let dvState = store.getState().device
    let res = await getPort(`${getDevicesSearch}?type=submit&search=${dvState.text}&token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 200) {
      let prevHistoryData = dvState.historyData
      if(res.data.text != null && res.data.text != undefined) {
        prevHistoryData = [res.data.text].concat(prevHistoryData)
        deviceAC.setHistoryData(prevHistoryData)
        saveWord('device', prevHistoryData)
      }
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}