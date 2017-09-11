import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken, clearToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getNews } from '../../apis'
import getHomeData from '../../actions/getHomeData'

export default (navigation)=> {
  checkToken(tokenKey)
  .then(async token => {
    let res = await getPort(`${getNews}?token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 200) {
      getHomeData(res.data)
    } else if(res.code == 5050) {
      clearToken()
      navigation.navigate('login')
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}