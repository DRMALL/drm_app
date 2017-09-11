//getSecondPartData.js
import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getPartSecond } from '../../apis'

import seekAC from '../../actions/seekAC'

export default (name)=> {
  return new Promise((resovle, reject)=> {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getPartSecond}?name=${name}&token=${token}`)
      if(!res) {
        console.log('错误seek second', internalServerError)
      } else if(res.code == 200) {
        seekAC.setSecondPart(res.data)
        resovle(res.data)
      } else {
        console.log('错误 其他', JSON.stringify(res.message))
      }
    })
  })
}