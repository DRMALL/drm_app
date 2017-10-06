import React from 'react'
import { View, Text, Image, ListView, TouchableOpacity, Alert, RefreshControl, ScrollView } from 'react-native'
import moment from 'moment'
import { online, offline, onToOffText, onState, offState, inTheEnd } from '../common/strings'
import { lightGreenColor, lightRedColor, subTitleColor, loginBackgroundColor, mainColor, contentColor } from '../common/constants'
import { status, home } from '../styles'
import EmptyContent from '../components/units/EmptyContent'

import store from '../utils/store'
import statuAC from '../actions/statuAC'

export default props => {
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  })
  let finalDs = ds.cloneWithRows(props.data)
    , navigation = props.navigation
    , dataLength = props.data.length
    , equipmentData = props.equipmentData
    , { isRefreshing } = store.getState().statu
  if(dataLength == 0) return (
    <ScrollView
      refreshControl={<RefreshControl 
        refreshing={isRefreshing}
        onRefresh={props.onStatusRefresh}
        colors={['#ff0000', '#00ff00', '#0000ff']}
        progressBackgroundColor={mainColor}
        title='下拉刷新'
        titleColor={contentColor}
      />}
    >
      <EmptyContent />
    </ScrollView>
  )
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
      renderRow={(rowData, sectionID, rowID) => <StatusListItem rowData={rowData} rowID={rowID} dataLength={dataLength} equipmentData={equipmentData} navigation={navigation}/>}
      enableEmptySections={true}
    />
  )
}

const StatusListItem = ({ rowData, rowID, dataLength, equipmentData, navigation }) => {
  const { _id, images, name, number, ts, createdAt } = rowData
  let deviceState = false
  equipmentData.map((eqItem, index)=> {
    if(number == eqItem.number) {
      deviceState = true
    }
  })
  return(
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={status.wrap} activeOpacity={0.8} onPress={() => navigation.navigate('equipment', {statuItemId: _id, statuItemNumber: number})}>
        <Image source={{uri: images[0].url}} style={status.img} />
        <View style={status.nextView}>
          <View style={status.cover}>
            <Text style={status.NoText} numberOfLines={1}>{`${name} (${number})`}</Text>
            <TouchableOpacity style={[status.touch, {borderColor: deviceState ? lightGreenColor : lightRedColor}]}>
              <Text style={[status.touchText, {color: deviceState ? lightGreenColor : lightRedColor}]}>{deviceState ? onState : offState}</Text>
            </TouchableOpacity>
          </View>
          <Text style={[status.text, {lineHeight: deviceState ? 20 : 22}]} numberOfLines={2}>{deviceState ? online : offline}</Text>
          <Text style={[status.text, {lineHeight: deviceState ? 20 : 22}]} numberOfLines={3}>{deviceState ? '' : onToOffText + (ts ? moment(new Date(ts)).format('YYYY-MM-DD') : moment(createdAt).format('YYYY-MM-DD'))}</Text>
        </View>
      </TouchableOpacity>
      <View style={{backgroundColor: loginBackgroundColor, opacity: 1}}>
        <Text style={[home.endText, rowID == (dataLength-1) ? {} : {display: 'none' }]}>{inTheEnd}</Text>
      </View>
    </View>
  )
}

