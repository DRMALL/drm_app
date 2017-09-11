import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { mainColor, subTitleColor } from '../../common/constants'
import { inTheEnd } from '../../common/strings'
import { device, home } from '../../styles'

export default props => {
  let { deviceOne, index, deviceDataLength, navigation } = props
    , nameNumLength = `${deviceOne.name + deviceOne.number}`.split('').length
  return (
    <View style={{backgroundColor: subTitleColor}}>
      <TouchableOpacity style={device.archivesItemTouch} activeOpacity={0.8} onPress={()=> navigation.navigate('detail', {deviceId: deviceOne._id})}> 
        <Image style={device.archivesItemImg} source={{uri: deviceOne.images[0].url}} />
        <View style={device.archivesItemOther}>
          <View style={nameNumLength < 16 ? device.archivesNoTime : device.archivesNoTime2}>
            <Text style={device.archivesItemNo}>{`${deviceOne.name} (${deviceOne.number})`}</Text>
            <Text style={device.archivesItemTime}>{moment(deviceOne.createdAt).format('YYYY-MM-DD')}</Text>
          </View>
          <View style={device.archivesItemLabsView}>
            <View style={device.archivesItemLabBorder}>
              <Text style={device.archivesItemLab}>{deviceOne.cc}</Text>
            </View>
            <View style={device.archivesItemLabBorder}>
              <Text style={device.archivesItemLab}>{deviceOne.pressure}</Text>
            </View>
            <View style={device.archivesItemLabBorder}>
              <Text style={device.archivesItemLab}>{deviceOne.combustible}</Text>
            </View>
          </View>
          <Text style={device.archivesItemDetail}>{deviceOne.description}</Text>
        </View>
      </TouchableOpacity>
      <View style={{backgroundColor: mainColor, opacity: 1}}>
        <Text style={[home.endText, index == (deviceDataLength-1) ? {} : {display: 'none' }]}>{inTheEnd}</Text>
      </View>
    </View>
  )
}
