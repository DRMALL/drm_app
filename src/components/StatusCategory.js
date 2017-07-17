import React from 'react'
import { View, Text, Image, ListView, TouchableOpacity } from 'react-native'
import { online, offline, onToOffText, onState, offState } from '../common/strings'
import { status } from '../styles'

export default props => {
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  })
  let finalDs = ds.cloneWithRows(props.data)
  return(
    <ListView 
      dataSource={finalDs}
      renderRow={rowData => <StatusListItem rowData={rowData} />}
    />
  )
}

const StatusListItem = ({ rowData }) => {
  const { photo, deviceNo, deviceState, stopTime } = rowData
  return(
    <View style={[status.wrap, {height: deviceState ? 90 : 120}]}>
      <Image source={photo} style={status.img} />
      <View style={status.cover}>
        <Text style={status.NoText} numberOfLines={2}>{deviceNo}</Text>
        <Text style={[status.text, {lineHeight: deviceState ? 20 : 28}]} numberOfLines={2}>{deviceState ? online : offline}</Text>
        <Text style={[status.text, {lineHeight: deviceState ? 20 : 28}]} numberOfLines={3}>{deviceState ? '' : onToOffText + stopTime}</Text>
      </View>
      <TouchableOpacity style={[status.touch, {borderColor: deviceState ? '#3BDE86' : '#FF6260'}]}>
        <Text style={[status.touchText, {color: deviceState ? '#3BDE86' : '#FF6260'}]}>{deviceState ? onState : offState}</Text>
      </TouchableOpacity>
    </View>
  )
}