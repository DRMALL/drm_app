import React, { Component } from 'react'
import { View, Text, Image, ListView, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import moment from 'moment'
import { subTitleColor, primaryColor, loginBackgroundColor, mainColor, contentColor } from '../common/constants'
import { inTheEnd } from '../common/strings'
import { device, home } from '../styles'

export default props => {
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  })
  let archivesDataDs = ds.cloneWithRows(props.archivesData)
    , navigation = props.navigation
    , archivesDataLength = props.archivesData.length
  return(
    <ListView 
      refreshControl={<RefreshControl 
        refreshing={props.isRefreshing}
        onRefresh={props.onDeviceRefresh}
        colors={['#ff0000', '#00ff00', '#0000ff']}
        progressBackgroundColor={mainColor}
        title='下拉刷新'
        titleColor={contentColor}
      />}
      style={{height: '100%'}}
      dataSource={archivesDataDs}
      renderRow={(rowData, sectionID, rowID) => <ArchivesDataItem rowData={rowData} rowID={rowID} archivesDataLength={archivesDataLength} navigation={navigation} />}
      enableEmptySections={true}
    />
  )
}

const ArchivesDataItem = ({ rowData, rowID, archivesDataLength, navigation }) => {
  const { _id, name, number, images, cc, pressure, combustible, description, createdAt } = rowData
    , nameNumLength = `${name + number}`.split('').length
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={device.archivesItemTouch} activeOpacity={0.8} onPress={()=> navigation.navigate('detail', {deviceId: _id})}> 
        <Image style={device.archivesItemImg} source={{uri: images[0].url}} />
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
      <View style={{backgroundColor: loginBackgroundColor, opacity: 1}}>
        <Text style={[home.endText, rowID == (archivesDataLength-1) ? {} : {display: 'none' }]}>{inTheEnd}</Text>
      </View>
    </View>
  )
}

