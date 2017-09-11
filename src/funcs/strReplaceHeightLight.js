import React, { Component } from 'react'
import { Text } from 'react-native'
import { lightBlueColor } from '../common/constants'
import replaced from './replace'

export default (str, matchField)=> {
  let splitStrArr = replaced.strArr(replaced.trim(`${str}`), matchField)
    , afterStr = []
  for(var i = 0; i < splitStrArr.length; i++) {
    if(i == splitStrArr.length-1) {
      afterStr.push(<Text key={(i*2)}>{splitStrArr[i]}</Text>)
    } else {
      afterStr.push(<Text key={(i*2)}>{splitStrArr[i]}</Text>)
      afterStr.push(<Text key={(i*2+1)} style={{color: lightBlueColor}}>{matchField}</Text>)
    }
  }
  return afterStr
}
