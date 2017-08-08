import React from 'react'
import { View, Text, Image, ListView, TouchableOpacity, Alert } from 'react-native'
import { online, offline, onToOffText, onState, offState } from '../common/strings'
import { lightGreenColor, lightRedColor, subTitleColor } from '../common/constants'
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
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={status.wrap} activeOpacity={0.8} onPress={() => navigation.navigate('equipment', {statuItemData: rowData})}>
        <Image source={photo} style={status.img} />
        <View style={status.nextView}>
          <View style={status.cover}>
            <Text style={status.NoText} numberOfLines={2}>{deviceNo}</Text>
            <TouchableOpacity style={[status.touch, {borderColor: deviceState ? lightGreenColor : lightRedColor}]}>
              <Text style={[status.touchText, {color: deviceState ? lightGreenColor : lightRedColor}]}>{deviceState ? onState : offState}</Text>
            </TouchableOpacity>
          </View>
          <Text style={[status.text, {lineHeight: deviceState ? 20 : 28}]} numberOfLines={2}>{deviceState ? online : offline}</Text>
          <Text style={[status.text, {lineHeight: deviceState ? 20 : 28}]} numberOfLines={3}>{deviceState ? '' : onToOffText + stopTime}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

