import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { mainColor, subTitleColor, lightGreenColor, lightRedColor } from '../../common/constants'
import { onState, offState, online, offline, onToOffText, inTheEnd } from '../../common/strings'
import { status, home } from '../../styles'

import store from '../../utils/store'

export default props => {
  let { statuOne, navigation, dataLength, rowID } = props
  const { _id, images, name, number, stopTime } = statuOne
  let equipmentData = store.getState().statu.equipmentData
  let deviceState = false
  equipmentData.map((eqItem, index)=> {
    if(number == eqItem.number) {
      deviceState = true
    }
  })
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={status.wrap} activeOpacity={0.8} onPress={() => navigation.navigate('equipment', {statuItemId: _id, statuItemNumber: number})}>
        <Image source={{uri: images[0].url}} style={status.img} />
        <View style={status.nextView}>
          <View style={status.cover}>
            <Text style={status.NoText} numberOfLines={2}>{`${name} (${number})`}</Text>
            <TouchableOpacity style={[status.touch, {borderColor: deviceState ? lightGreenColor : lightRedColor}]}>
              <Text style={[status.touchText, {color: deviceState ? lightGreenColor : lightRedColor}]}>{deviceState ? onState : offState}</Text>
            </TouchableOpacity>
          </View>
          <Text style={[status.text, {lineHeight: deviceState ? 20 : 28}]} numberOfLines={2}>{deviceState ? online : offline}</Text>
          <Text style={[status.text, {lineHeight: deviceState ? 20 : 28}]} numberOfLines={3}>{deviceState ? '' : onToOffText + (stopTime || '2017-09-04')}</Text>
        </View>
      </TouchableOpacity>
      <View style={{backgroundColor: mainColor, opacity: 1}}>
        <Text style={[home.endText, rowID == (dataLength-1) ? {} : {display: 'none' }]}>{inTheEnd}</Text>
      </View>
    </View>
  )
}
