import React from 'react'
import { View, Text, Image, ListView, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import { online, offline, onToOffText, onState, offState, inTheEnd } from '../common/strings'
import { lightGreenColor, lightRedColor, subTitleColor, loginBackgroundColor, mainColor, contentColor } from '../common/constants'
import { status, home } from '../styles'

import store from '../utils/store'
import statuAC from '../actions/statuAC'

export default props => {
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  })
  let finalDs = ds.cloneWithRows(props.data)
    , navigation = props.navigation
    , dataLength = props.data.length
    , { isRefreshing } = store.getState().statu
  return(
    <ListView 
      refreshControl={<RefreshControl 
        refreshing={isRefreshing}
        onRefresh={props.onStatusRefresh}
        colors={['#ff0000', '#00ff00', '#0000ff']}
        progressBackgroundColor={mainColor}
        title='下拉刷新'
        titleColor={contentColor}
      />}
      dataSource={finalDs}
      renderRow={(rowData, sectionID, rowID) => <StatusListItem rowData={rowData} rowID={rowID} dataLength={dataLength} navigation={navigation}/>}
      enableEmptySections={true}
    />
  )
}

const StatusListItem = ({ rowData, rowID, dataLength, navigation }) => {
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
      <View style={{backgroundColor: loginBackgroundColor, opacity: 1}}>
        <Text style={[home.endText, rowID == (dataLength-1) ? {} : {display: 'none' }]}>{inTheEnd}</Text>
      </View>
    </View>
  )
}

