import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getInfo } from '../../apis'
import infoAC from '../../actions/infoAC'

export default ()=> {
  checkToken(tokenKey)
  .then(async token => {
    let res = await getPort(`${getInfo}?token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 200) {
      infoAC.getInfomationData({
        user_name: res.data.name,
        company_name: res.data.company_name,
        phone_number: res.data.phone,
        postal_address: res.data.address,
      })
    } else if(res.code == 404) {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}