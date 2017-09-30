import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getBugs } from '../../apis'
import store from '../../utils/store'
import diagnoseAC from '../../actions/diagnoseAC'

export default (text)=> {
  diagnoseAC.setJumpData({
    text: text,
    jumpData: text == '' ? false : true,
  })
  checkToken(tokenKey)
  .then(async token => {
    let diagtext = store.getState().diagnose.text
    let res = await getPort(`${getBugs}?type=onchange&search=${encodeURIComponent(diagtext)}&token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 200) {
      diagnoseAC.getBugsData(res.data)
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}