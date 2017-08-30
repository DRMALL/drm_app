import React from 'react'
import { Text } from 'react-native'

function trim(str) {    //删除左右两端的空格
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

function strArr(str, keyword) {    //替换高亮
  let keyReg = new RegExp(`${keyword}`, 'g')
  if(str !== '' && keyword !== '') {
    return str.split(`${keyword}`)
    //return str.replace(keyReg, `${<Text style={{color: 'green'}}>{keyword}</Text>}`)
  } else {
    return str
  }
}

export default {
  trim,
  strArr,
}