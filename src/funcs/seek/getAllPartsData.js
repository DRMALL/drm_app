//getAllPartsData.js
import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getPartSearch } from '../../apis'

import seekAC from '../../actions/seekAC'

export default async () => {

  const token = await checkToken(tokenKey)
  let res = await getPort(`${getPartSearch}?token=${token}`)
  if(!res) {
    Alert.alert('错误', internalServerError,
      [ {text: 'OK', onPress: () => 'OK'}, ],
      { cancelable: false }
    )
  } else if(res.code == 200) {
    seekAC.setAllPart(res)
  } else {
    Alert.alert('错误', JSON.stringify(res.message),
      [ {text: 'OK', onPress: () => 'OK'}, ],
      { cancelable: false }
    )
  }
}