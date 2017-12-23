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
import { getDevices, getDeviceAddress, getDeviceCcsort, getDevicePresort, getDeviceFuelsort } from '../apis'
import { classifyData, sortData, filterData } from '../utils/virtualData'

import store from '../utils/store'
import deviceAC from '../actions/deviceAC'

const dropdownNormal = require('../images/dropdown_normal.png')
const dropdownSelected = require('../images/dropdown_selected.png')

export default class DeviceCategory extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    let ccsort = await this.getCcsort()
    let presort = await this.getPresort()
    let fuelsort = await this.getFuelsort()
    let mergeData = [ccsort, presort, fuelsort]
    deviceAC.deviceInitializeState(sortData, mergeData)

    //this.getAllDevices()
    this.getAllDevices2()
    this.getHotCities()
  }

  async getAllDevices2() {
    let token = await checkToken(tokenKey)
    let res = await getPort(`${getDevices}?token=${token}`)
    if(res.code == 200) {
      deviceAC.setAllDevices2(res)
    }
  }

  async getAllDevices() {
    let token = await checkToken(tokenKey)
    let res
    let {
      filterSearch,
      filtercc,
      filterpressure,
      filtercombustible,
      filteraddress,
      classKindsType,
      classKinds,
      sortTypesNum,
    } = store.getState().device

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
      deviceAC.setAllDevices(res)
    }
  }

  getCcsort() {
    return new Promise((resovle, reject)=> {
      checkToken(tokenKey)
      .then(async token => {
        let res = await getPort(`${getDeviceCcsort}?token=${token}`)
        if(res.code == 200) {
          deviceAC.setCcsort(res.data).then((newdata)=> {
            resovle(newdata)
          })
        }
      })
    })
  }

  getPresort() {
    return new Promise((resovle, reject)=> {
      checkToken(tokenKey)
      .then(async token => {
        let res = await getPort(`${getDevicePresort}?token=${token}`)
        if(res.code == 200) {
          deviceAC.setPresort(res.data).then((newdata)=> {
            resovle(newdata)
          })
        }
      })
    })
  }

  getFuelsort() {
    return new Promise((resovle, reject)=> {
      checkToken(tokenKey)
      .then(async token => {
        let res = await getPort(`${getDeviceFuelsort}?token=${token}`)
        if(res.code == 200) {
          deviceAC.setFuelsort(res.data).then((newdata)=> {
            resovle(newdata)
          })
        }
      })
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
    if(which == 'cleanPress' && !store.getState().device[which]) this.getAllDevices()
  }

  pressConfirmReturn() {
    deviceAC.setFilterSearchTrue(sortData)
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

  async onDeviceRefresh() {
    deviceAC.isRefresh()
    await this.getAllDevices()
    deviceAC.isnotRefresh()
  }

  render() {
    let { isRefreshing, classifyRow, sortRow, filterRow, topView, middleView, allDevicesData, allCities, ccsort, presort, fuelsort, isLoading } = store.getState().device
      , { openModal } = deviceAC
    let mergeData = ccsort.class == undefined ? classifyData : [ccsort, presort, fuelsort]
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
            <Archives archivesData={allDevicesData} isRefreshing={isRefreshing} isLoading={isLoading} onDeviceRefresh={this.onDeviceRefresh.bind(this)} onScroll={this.props.onScroll} {...this.props} />
          </View>
          <View style={[topView, {height: classifyRow ? '100%' : 0}]}>
            {
              classifyRow ? <View style={{height: '100%'}}>
                <Classify data={mergeData}
                  deviceData={allDevicesData}
                  state={store.getState().device}
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
                  state={store.getState().device}
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
                <Filter data={mergeData}
                  cityData={allCities}
                  state={store.getState().device}
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
