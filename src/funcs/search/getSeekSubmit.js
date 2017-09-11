import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { saveWord } from '../../utils/searchBuffer'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getPartSearch } from '../../apis'
import store from '../../utils/store'
import seekAC from '../../actions/seekAC'

export default ()=> {
  checkToken(tokenKey)
  .then(async token => {
    let sekState = store.getState().seek
    let res = await getPort(`${getPartSearch}?type=submit&search=${sekState.text}&token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 200) {
      let prevHistoryData = sekState.historyData
      if(res.data.text != null && res.data.text != undefined) {
        prevHistoryData = [res.data.text].concat(prevHistoryData)
        seekAC.setHistoryData(prevHistoryData)
        saveWord('seek', prevHistoryData)
      }
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}