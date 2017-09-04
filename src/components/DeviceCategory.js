import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { deviceKindClassify, deviceKindSort, deviceKindFilter, tokenKey } from '../common/strings'
import { lightBlueColor, contentColor, mainColor } from '../common/constants'
import { device } from '../styles'
import Archives from './Archives'
import Classify from './device/Classify'
import Filter from './device/Filter'
import Sort from './device/Sort'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getDevices, getDeviceAddress } from '../apis'
import { deviceArchivesList, classifyData, sortData, filterData } from '../utils/virtualData'

import store from '../utils/store'
import deviceAC from '../actions/deviceAC'

const dropdownNormal = require('../images/dropdown_normal.png')
const dropdownSelected = require('../images/dropdown_selected.png')

export default class DeviceCategory extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState().device
  }

  componentDidMount() {
    deviceAC.deviceInitializeState(sortData, classifyData)
    this.getAllDevices()
    this.getAllDevices2()
    this.getHotCities()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().device) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  getAllDevices2() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getDevices}?token=${token}`)
      if(res.code == 200) {
        deviceAC.setAllDevices2(res.data)
      }
    })
  }

  getAllDevices() {
    let res
    checkToken(tokenKey)
    .then(async token => {
      let { 
        filterSearch, 
        filtercc, 
        filterpressure, 
        filtercombustible, 
        filteraddress,
        classKindsType, 
        classKinds,
        sortTypesNum } = this.state
      if(filterSearch) {
        res = await getPort(`${getDevices}?cc=${filtercc}&pressure=${filterpressure}&combustible=${filtercombustible}&address=${filteraddress}&token=${token}`)
      } else if(classKinds !== '全部') {
        res = await getPort(`${getDevices}?type=${classKindsType}&value=${classKinds}&token=${token}`)
      } else if(sortTypesNum == 1) {
        res = await getPort(`${getDevices}?createTime=asc&token=${token}`)
      } else if(sortTypesNum == 2) {
        res = await getPort(`${getDevices}?createTime=desc&token=${token}`)
      } else {
        res = await getPort(`${getDevices}?token=${token}`)
      }
      if(res.code == 200) {
        deviceAC.setAllDevices(res.data)
      }
    })
  }

  getHotCities() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getDeviceAddress}?token=${token}`)
      if(res.code == 200) {
        deviceAC.setAllCities(res.data)
      }
    })
  }

  pressBotton(which) {
    deviceAC.setBottonState(which)
    if(which == 'cleanPress' && !this.state[which]) this.getAllDevices()
  }

  pressConfirmReturn() {
    deviceAC.setFilterSearchTrue()
    this.getAllDevices()
  }

  pressSort(s) {
    sortData.map((sortText, index)=> {
      if(s == index) {
        deviceAC.sortTabPress(s)
      } else deviceAC.sortTabNormal(index)
    })
    this.getAllDevices()
  }

  changeClassKinds(j, k, type, kind) {
    deviceAC.selectClassKind(j, k, type, kind)
    this.getAllDevices()
  }

  onDeviceRefresh() {
    deviceAC.isRefresh()
    this.getAllDevices()
    setTimeout(() => {
      deviceAC.isnotRefresh()
    }, 2000)
  }

  render() {
    let { isRefreshing, classifyRow, sortRow, filterRow, topView, middleView, allDevicesData, allDevicesData2, allCities } = this.state
      , { openModal } = deviceAC
    return(
      <View style={device.wrap}>
        <View style={device.archivesTab}>
          <TouchableOpacity style={device.touchTab} activeOpacity={0.8} onPress={()=> openModal('classifyRow')}>
            <Text style={[device.archivesTabText, {color: classifyRow ? lightBlueColor : contentColor}]}>{deviceKindClassify}</Text>
            <Image source={classifyRow ? dropdownSelected : dropdownNormal} />
          </TouchableOpacity>
          <TouchableOpacity style={device.touchTab} activeOpacity={0.8} onPress={()=> openModal('sortRow')}>
            <Text style={[device.archivesTabText, {color: sortRow ? lightBlueColor : contentColor}]}>{deviceKindSort}</Text>
            <Image source={sortRow ? dropdownSelected : dropdownNormal} />
          </TouchableOpacity>
          <TouchableOpacity style={device.touchTab} activeOpacity={0.8} onPress={()=> openModal('filterRow')}>
            <Text style={[device.archivesTabText, {color: filterRow ? lightBlueColor : contentColor}]}>{deviceKindFilter}</Text>
            <Image source={filterRow ? dropdownSelected : dropdownNormal} />
          </TouchableOpacity>
        </View>
        <View style={{height: '100%', paddingBottom: 50}}>
          <View style={!classifyRow && !sortRow && !filterRow ? topView : middleView}>
            <Archives archivesData={allDevicesData} isRefreshing={isRefreshing} onDeviceRefresh={this.onDeviceRefresh.bind(this)} {...this.props} />
          </View>
          <View style={[topView, {height: classifyRow ? '100%' : 0}]}>
            {
              classifyRow ? <View style={{height: '100%'}}>
                <Classify data={classifyData} 
                  deviceData={allDevicesData2}
                  state={this.state} 
                  changeClassKinds={this.changeClassKinds.bind(this)}
                />
                <TouchableOpacity activeOpacity={0.8} onPress={()=> openModal('classifyRow')}>
                  <View style={device.halfOpacityView} />
                </TouchableOpacity>
              </View> : <View style={{height: 0}}/>
            }
          </View>
          <View style={[topView, {height: sortRow ? '100%' : 0}]}>
            {
              sortRow ? <View style={{height: '100%'}}>
                <Sort data={sortData} 
                  state={this.state} 
                  pressSort={this.pressSort.bind(this)}
                />
                <TouchableOpacity activeOpacity={0.8} onPress={()=> openModal('sortRow')}>
                  <View style={device.halfOpacityView} />
                </TouchableOpacity>
              </View> : <View style={{height: 0}}/>
            }
          </View>
          <View style={[topView, {height: filterRow ? '100%' : 0}]}>
            {
              filterRow ? <ScrollView style={{height: '100%'}}>
                <Filter data={filterData} 
                  cityData={allCities} 
                  state={this.state} 
                  pressBotton={this.pressBotton.bind(this)} 
                  pressConfirmReturn={this.pressConfirmReturn.bind(this)} 
                />
                <TouchableOpacity activeOpacity={0.8} onPress={()=> openModal('filterRow')}>
                  <View style={device.halfOpacityView} />
                </TouchableOpacity>
              </ScrollView> : <View style={{height: 0}}/>
            }
          </View>
        </View>
      </View>
    )
  }
}

