import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getNewsOne } from '../../apis'
import homeDetailAC from '../../actions/homeDetailAC'

export default (props)=> {
  let id = props.navigation.state.params.newsId
  checkToken(tokenKey)
  .then(async token => {
    let res = await getPort(`${getNewsOne}?id=${id}&token=${token}`)
    if(!res) {
      Alert.alert('错误', internalServerError,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(res.code == 201) {
      homeDetailAC.getOneData(res.data)
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  })
}