import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import { deviceKindClassify, deviceKindSort, deviceKindFilter } from '../common/strings'
import { lightBlueColor, contentColor } from '../common/constants'
import { device } from '../styles'
import { deviceArchivesList, classifyData, sortData } from '../utils/virtualData'
import Archives from './Archives'
import Classify from './device/Classify'
import Filter from './device/Filter'
import Sort from './device/Sort'

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
        <View style={{height: '100%', paddingBottom: 50}}>
          <View style={!classifyRow && !sortRow && !filterRow ? topView : middleView}>
            <Archives archivesData={deviceArchivesList} {...this.props} />
          </View>
          <View style={[topView, {height: classifyRow ? '100%' : 0}]}>
            {
              classifyRow ? <View style={{height: '100%'}}>
                <Classify data={classifyData} />
                <TouchableOpacity activeOpacity={0.8} onPress={()=> this.openModal('classifyRow')}>
                  <View style={device.halfOpacityView} />
                </TouchableOpacity>
              </View> : <View style={{height: 0}}/>
            }
          </View>
          <View style={[topView, {height: sortRow ? '100%' : 0}]}>
            {
              sortRow ? <View style={{height: '100%'}}>
                <Sort data={sortData} />
                <TouchableOpacity activeOpacity={0.8} onPress={()=> this.openModal('sortRow')}>
                  <View style={device.halfOpacityView} />
                </TouchableOpacity>
              </View> : <View style={{height: 0}}/>
            }
          </View>
          <View style={[topView, {height: filterRow ? '100%' : 0}]}>
            {
              filterRow ? <View style={{height: '100%'}}>
                <Filter data={classifyData} />
                <TouchableOpacity activeOpacity={0.8} onPress={()=> this.openModal('filterRow')}>
                  <View style={device.halfOpacityView} />
                </TouchableOpacity>
              </View> : <View style={{height: 0}}/>
            }
          </View>
        </View>
      </View>
    )
  }
}

