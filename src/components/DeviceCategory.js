import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { deviceKindClassify, deviceKindSort, deviceKindFilter } from '../common/strings'
import { device } from '../styles'
import { deviceArchivesList } from '../utils/virtualData'
import Archives from './Archives'

const dropdownNormal = require('../images/dropdown_normal.png')

export default props => {
  return(
    <View style={device.wrap}>
      <View style={device.archivesTab}>
        <TouchableOpacity style={device.touchTab}>
          <Text style={device.archivesTabText}>{deviceKindClassify}</Text>
          <Image source={dropdownNormal} />
        </TouchableOpacity>
        <TouchableOpacity style={device.touchTab}>
          <Text style={device.archivesTabText}>{deviceKindSort}</Text>
          <Image source={dropdownNormal} />
        </TouchableOpacity>
        <TouchableOpacity style={device.touchTab}>
          <Text style={device.archivesTabText}>{deviceKindFilter}</Text>
          <Image source={dropdownNormal} />
        </TouchableOpacity>
      </View>
      <Archives archivesData={deviceArchivesList} {...this.props} />
    </View>
  )
}