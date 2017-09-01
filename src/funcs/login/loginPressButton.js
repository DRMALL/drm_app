import React from 'react'
import { Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { tokenKey, internalServerError } from '../../common/strings'
import { depositToken } from '../../utils/handleToken'
import { postPort } from '../../utils/fetchMethod'
import { signIn } from '../../apis'

import store from '../../utils/store'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'main'}),
  ]
})

export default async (props) => {
  let loginState = store.getState().login
  let bodyData = {
    email: loginState.textEmail,
    password: loginState.textWord,
  }
  let res = await postPort(signIn, bodyData)
  if(!res) {
    Alert.alert('错误', internalServerError,
      [ {text: 'OK', onPress: () => 'OK'}, ],
      { cancelable: false }
    )
  } else if(res.code == 201) {
    depositToken(tokenKey, res.data)
    props.navigation.dispatch(resetAction)
  } else {
    Alert.alert('错误', '邮箱或密码输入有误',
      [ {text: 'OK', onPress: () => 'OK'}, ],
      { cancelable: false }
    )
  }
}