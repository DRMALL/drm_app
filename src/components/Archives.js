import React, { Component } from 'react'
import { View, Text, Image, ListView, ScrollView, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { subTitleColor, primaryColor } from '../common/constants'
import { device } from '../styles'

export default props => {
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  })
  let archivesDataDs = ds.cloneWithRows(props.archivesData)
  let navigation = props.navigation
  return(
    <ListView 
      style={{height: '100%'}}
      dataSource={archivesDataDs}
      renderRow={(rowData) => <ArchivesDataItem rowData={rowData} navigation={navigation} />}
      enableEmptySections={true}
    />
  )
}

const ArchivesDataItem = ({ rowData, navigation }) => {
  const { _id, name, number, images, cc, pressure, combustible, description, createdAt } = rowData
    , nameNumLength = `${name + number}`.split('').length
  return (
    <TouchableOpacity style={device.archivesItemTouch} activeOpacity={0.8} onPress={()=> navigation.navigate('detail', {deviceId: _id})}> 
      <Image style={device.archivesItemImg} source={{url: images[0].url}} />
      <View style={device.archivesItemOther}>
        <View style={nameNumLength < 16 ? device.archivesNoTime : device.archivesNoTime2}>
          <Text style={device.archivesItemNo}>{name + number}</Text>
          <Text style={device.archivesItemTime}>{moment(createdAt).format('YYYY-MM-DD')}</Text>
        </View>
        <View style={device.archivesItemLabsView}>
          <View style={device.archivesItemLabBorder}>
            <Text style={device.archivesItemLab}>{cc}</Text>
          </View>
          <View style={device.archivesItemLabBorder}>
            <Text style={device.archivesItemLab}>{pressure}</Text>
          </View>
          <View style={device.archivesItemLabBorder}>
            <Text style={device.archivesItemLab}>{combustible}</Text>
          </View>
        </View>
        <Text style={device.archivesItemDetail}>{description}</Text>
      </View>
    </TouchableOpacity>
  )
}

