import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { saveWord } from '../../utils/searchBuffer'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getBugs } from '../../apis'
import store from '../../utils/store'
import diagnoseAC from '../../actions/diagnoseAC'

export default ()=> {
  checkToken(tokenKey)
  .then(async token => {
    let diagState = store.getState().diagnose
    let res = await getPort(`${getBugs}?type=submit&search=${diagState.text}&token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 200) {
      let prevHistoryData = diagState.historyData
      if(res.data.text != null && res.data.text != undefined) {
        prevHistoryData = [res.data.text].concat(prevHistoryData)
        diagnoseAC.setHistoryData(prevHistoryData)
        saveWord('diagnose', prevHistoryData)
      }
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}