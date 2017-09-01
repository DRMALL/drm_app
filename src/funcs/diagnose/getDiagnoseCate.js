import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getCate } from '../../apis'
import diagnoseAC from '../../actions/diagnoseAC'

export default ()=> {
  checkToken(tokenKey)
  .then(async token => {
    let res = await getPort(`${getCate}?token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 200) {
      diagnoseAC.getDiagCate({
        allCateData: res.data,
        selectedCate: res.data[0].text,
      })
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}