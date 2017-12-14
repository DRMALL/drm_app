//getSecondPartData.js
import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getPartSecond } from '../../apis'

import seekAC from '../../actions/seekAC'

export default async (categoryOneID)=> {
  let token = await checkToken(tokenKey)

  let res = await getPort(`${getPartSecond}?token=${token}&id=${categoryOneID}`)
  if(!res) {
    console.log('错误seek second', internalServerError)
  } else if(res.code == 200) {
    seekAC.setSecondPart(res.data)
  } else {
    console.log('错误 其他', JSON.stringify(res.message))
  }
}