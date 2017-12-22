import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken, clearToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getNews } from '../../apis'
import getHomeData from '../../actions/getHomeData'

export default async navigation => {
  try {
    const token = await checkToken(tokenKey)
    let res = await getPort(`${getNews}?token=${token}`)
      
    if (res.code == 200) {
      getHomeData(res)
    } else if(res.code == 5050) {
      clearToken()
      navigation.navigate('login')
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  } catch (e) {
    Alert.alert('错误', internalServerError,
      [ {text: 'OK', onPress: () => 'OK'}, ],
      { cancelable: false }
    )
  }
}
