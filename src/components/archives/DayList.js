import React, { Component }from 'react'
import { View, Text, TouchableOpacity, ListView } from 'react-native'
import { primaryColor, mainColor, loginBackgroundColor, backgroundColor } from '../../common/constants'
import { cancel } from '../../common/strings'
import { calendars } from '../../styles'

const addZero = (num)=> {
  const num0 = num < 10 ? `0${num}` : num
  return num0
} 

export default props => {
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  })
  let dataSource = ds.cloneWithRows(props.data)
  return(
    <ListView 
      dataSource={dataSource}
      renderRow={(rowData, sectionID, rowID) => <DayRowItem rowData={rowData} rowID={rowID} state={props.state} pressDayItem={props.pressDayItem}/>}
      enableEmptySections={true}
    />
  )
}

const DayRowItem = props => {
  let { rowData, rowID, state, pressDayItem } = props
  return (
    <View style={calendars.calenView}>
      {
        rowData.map((item, index)=> <DayItem key={index} item={item} rowID={rowID} index={index} state={state} pressDayItem={pressDayItem}/>)
      }
    </View>
  )
}

const DayItem = props => {
  let { item, rowID, index, state, pressDayItem } = props
    , dayStateNumber = rowID*7 + index
    , thisDay = `${state.year}-${addZero(state.month)}-${addZero(item)}`
    , thisDayStamp = new Date(thisDay).getTime()
    , startDayStamp = state.startTimestamp
    , endDayStamp = state.endTimestamp
    , heightPointDay = thisDayStamp == startDayStamp || thisDayStamp == endDayStamp ? true : false
    , backV1 = thisDayStamp > startDayStamp && thisDayStamp <= endDayStamp ? true : false
    , backV2 = thisDayStamp >= startDayStamp && thisDayStamp < endDayStamp ? true : false
  return (
    <View style={calendars.dayGridView}>
      <View style={calendars.backView}>
        <View style={[calendars.backNextView, backV1 ? {backgroundColor: loginBackgroundColor} : {}]}/>
        <View style={[calendars.backNextView, backV2 ? {backgroundColor: loginBackgroundColor} : {}]}/>
      </View>
      <TouchableOpacity 
        style={[calendars.dayView, {backgroundColor: backV1 && backV2 ? loginBackgroundColor : (heightPointDay ? primaryColor : mainColor)}]} 
        onPress={()=> pressDayItem(thisDay, thisDayStamp)}
        disabled={item == '' || item == undefined || thisDayStamp == startDayStamp || (thisDayStamp < startDayStamp && endDayStamp == 0) ? true : false}
      >
        <Text style={[calendars.dayText, heightPointDay ? {color: mainColor} : {}]}>{item}</Text>
      </TouchableOpacity>
    </View>
  )
}