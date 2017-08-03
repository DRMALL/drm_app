import React from 'react'
import { View, Text, Image, ListView, TouchableOpacity, Alert } from 'react-native'
import { online, offline, onToOffText, onState, offState } from '../common/strings'
import { lightGreenColor, lightRedColor } from '../common/constants'
import { status } from '../styles'

export default props => {
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  })
  let finalDs = ds.cloneWithRows(props.data)
  let navigation = props.navigation
  return(
    <ListView 
      dataSource={finalDs}
      renderRow={(rowData) => <StatusListItem rowData={rowData} navigation={navigation}/>}
      enableEmptySections={true}
    />
  )
}

const StatusListItem = ({ rowData, navigation }) => {
  const { photo, deviceNo, deviceState, stopTime } = rowData
  return(
    <TouchableOpacity style={[status.wrap, {height: deviceState ? 90 : 120}]} activeOpacity={0.8} onPress={() => navigation.navigate('equipment', {name: 'Equipment'})}>
      <Image source={photo} style={status.img} />
      <View style={status.cover}>
        <Text style={status.NoText} numberOfLines={2}>{deviceNo}</Text>
        <Text style={[status.text, {lineHeight: deviceState ? 20 : 28}]} numberOfLines={2}>{deviceState ? online : offline}</Text>
        <Text style={[status.text, {lineHeight: deviceState ? 20 : 28}]} numberOfLines={3}>{deviceState ? '' : onToOffText + stopTime}</Text>
      </View>
      <TouchableOpacity style={[status.touch, {borderColor: deviceState ? lightGreenColor : lightRedColor}]}>
        <Text style={[status.touchText, {color: deviceState ? lightGreenColor : lightRedColor}]}>{deviceState ? onState : offState}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}