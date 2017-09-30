import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getPartSearch } from '../../apis'
import store from '../../utils/store'
import seekAC from '../../actions/seekAC'

export default (text)=> {
  seekAC.setJumpData(text)
  checkToken(tokenKey)
  .then(async token => {
    let sektext = store.getState().seek.text
    let res = await getPort(`${getPartSearch}?type=onchange&search=${encodeURIComponent(sektext)}&token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 200) {
      seekAC.setSearchSeekData(res.data)
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}