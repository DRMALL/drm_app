import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getPartFirst } from '../../apis'

import seekAC from '../../actions/seekAC'

export default ()=> {
  return new Promise((resovle, reject)=> {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getPartFirst}?token=${token}`)
      if(!res) {
        console.log('错误seek first', internalServerError)
      } else if(res.code == 200) {
        seekAC.setFirstPart(res.data)
        resovle(res.data)
      } else {
        console.log('错误 其他', JSON.stringify(res.message))
      }
    })
  })
}