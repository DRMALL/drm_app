import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
// import Modal from 'react-native-root-modal'
import { deviceKindClassify, deviceKindSort, deviceKindFilter } from '../common/strings'
import { lightBlueColor, contentColor } from '../common/constants'
import { device } from '../styles'
import { deviceArchivesList, classifyData } from '../utils/virtualData'
import Archives from './Archives'
import Classify from './device/Classify'

const dropdownNormal = require('../images/dropdown_normal.png')
const dropdownSelected = require('../images/dropdown_selected.png')

export default class DeviceCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classifyRow: false,
      sortRow: false,
      filterRow: false,
      topView: {position: 'relative', zIndex: 3},
      middleView: {position: 'absolute', zIndex: 2},
      bottomView: {position: 'absolute', zIndex: 1},
    }
  }
  openModal(which) {
    this.setState({
      classifyRow: which == 'classifyRow' ? !this.state.classifyRow : false,
      sortRow: which == 'sortRow' ? !this.state.sortRow : false,
      filterRow: which == 'filterRow' ? !this.state.filterRow : false,
    })
  }
  render() {
    let classifyRow = this.state.classifyRow
      , sortRow = this.state.sortRow
      , filterRow = this.state.filterRow
      , topView = this.state.topView
      , middleView = this.state.middleView
      , bottomView = this.state.bottomView
    return(
      <View style={device.wrap}>
        <View style={device.archivesTab}>
          <TouchableOpacity style={device.touchTab} activeOpacity={0.8} onPress={()=> this.openModal('classifyRow')}>
            <Text style={[device.archivesTabText, {color: classifyRow ? lightBlueColor : contentColor}]}>{deviceKindClassify}</Text>
            <Image source={classifyRow ? dropdownSelected : dropdownNormal} />
          </TouchableOpacity>
          <TouchableOpacity style={device.touchTab} activeOpacity={0.8} onPress={()=> this.openModal('sortRow')}>
            <Text style={[device.archivesTabText, {color: sortRow ? lightBlueColor : contentColor}]}>{deviceKindSort}</Text>
            <Image source={sortRow ? dropdownSelected : dropdownNormal} />
          </TouchableOpacity>
          <TouchableOpacity style={device.touchTab} activeOpacity={0.8} onPress={()=> this.openModal('filterRow')}>
            <Text style={[device.archivesTabText, {color: filterRow ? lightBlueColor : contentColor}]}>{deviceKindFilter}</Text>
            <Image source={filterRow ? dropdownSelected : dropdownNormal} />
          </TouchableOpacity>
        </View>
        <View>
          <View style={!classifyRow && !sortRow && !filterRow ? topView : middleView}>
            <Archives archivesData={deviceArchivesList} {...this.props} />
          </View>
          <View style={classifyRow ? topView : bottomView}>
            <Classify data={classifyData} />
            <View style={device.halfOpacityView} />
          </View>
          <View style={sortRow ? topView : bottomView}>
            <Text>sort</Text>
            <View style={device.halfOpacityView} />
          </View>
          <View style={filterRow ? topView : bottomView}>
            <Text>filter</Text>
            <View style={device.halfOpacityView} />
          </View>
        </View>
      </View>
    )
  }
}

