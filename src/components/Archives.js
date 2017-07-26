import React, { Component } from 'react'
import { View, Text, Image, ListView, ScrollView, TouchableOpacity } from 'react-native'
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
      dataSource={archivesDataDs}
      renderRow={(rowData) => <ArchivesDataItem rowData={rowData} navigation={navigation} />}
    />
  )
}

const ArchivesDataItem = ({ rowData, navigation }) => {
  const { number, images, cc, pressure, combustible, description, createdAt } = rowData
  return (
    <TouchableOpacity style={device.archivesItemTouch} activeOpacity={0.8} onPress={()=> navigation.navigate('detail', {name: 'Detail'})}>
      <Image style={device.archivesItemImg} source={images} />
      <View style={device.archivesItemOther}>
        <View style={device.archivesNoTime}>
          <Text style={device.archivesItemNo}>{number}</Text>
          <Text style={device.archivesItemTime}>{createdAt}</Text>
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

