import React from 'react'
import { View, Text, ListView } from 'react-native'
import { equipment } from '../../styles'

export default props => {
  return(
    <Text style={equipment.logText}>{props.log.time + '  设备点火'}</Text>
  )
}
