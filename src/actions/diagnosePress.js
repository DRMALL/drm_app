import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../common/strings'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getBugs } from '../apis'
import dispatch from './dispatch'

export default async category_id => {
	dispatch('DIAGNOSE_CATEGORY_PRESS_START', category_id)
  try {
    const token = await checkToken(tokenKey)
    let res = await getPort(`${getBugs}?token=${token}&category_id=${category_id}`)

    if (res.code == 200) {
			dispatch('DIAGNOSE_CATEGORY_PRESS_SUCCESS', res)
    } else {
      Alert.alert('错误', JSON.stringify(res.message),
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  } catch (e) {
		dispatch('DIAGNOSE_CATEGORY_PRESS_FAILURE')
    Alert.alert('错误', internalServerError,
      [ {text: 'OK', onPress: () => 'OK'}, ],
      { cancelable: false }
    )
  }
}
