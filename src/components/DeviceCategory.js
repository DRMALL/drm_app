import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { deviceKindClassify, deviceKindSort, deviceKindFilter } from '../common/strings'
import { lightBlueColor, contentColor, mainColor } from '../common/constants'
import { device } from '../styles'
import Archives from './Archives'
import Classify from './device/Classify'
import Filter from './device/Filter'
import Sort from './device/Sort'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getDevices } from '../apis'
import { deviceArchivesList, classifyData, sortData } from '../utils/virtualData'

const dropdownNormal = require('../images/dropdown_normal.png')
const dropdownSelected = require('../images/dropdown_selected.png')

export default class DeviceCategory extends Component {
  constructor(props) {
    super(props)
    this.state = (props => {
      let stateObj = {
        classifyRow: false,
        sortRow: false,
        filterRow: false,
        classRowNum: classifyData.length+1, 
        classRow0: true,
        confirmPress: false,
        cleanPress: false,
        topView: {position: 'relative', zIndex: 3},
        middleView: {position: 'absolute', zIndex: 2},
        allDevicesData: [],
      }
      sortData.map((sortText, index)=> {
        stateObj[`sortRow${index}`] = false
      })
      classifyData.map((item, index) => {
        stateObj[`classRow${index+1}`] = false
      })
      return stateObj
    })(props)
  }

  componentDidMount() {
    this.getAllDevices()
  }

  openModal(which) {
    this.setState({
      classifyRow: which == 'classifyRow' ? !this.state.classifyRow : false,
      sortRow: which == 'sortRow' ? !this.state.sortRow : false,
      filterRow: which == 'filterRow' ? !this.state.filterRow : false,
    })
  }

  getAllDevices() {
    checkToken('drmAppToken')
    .then(async token => {
      let res = await getPort(`${getDevices}?token=${token}`)
      if(res.code == 200) {
        this.setState({
          allDevicesData: res.data,
        })
      }
    })
  }

  pressClass(index) {
    let lengthNum = this.state.classRowNum
    for(let i = 0; i < lengthNum; i++) {
      if(index == i) {
        this.setState({[`classRow${index}`]: true})
      }
      else this.setState({[`classRow${i}`]: false})
    }
  }

  pressBotton(which) {
    this.setState({[which]: !this.state[which]})
  }

  pressConfirmReturn() {
    alert(this.state.confirmPress)
  }

  pressSort(s) {
    sortData.map((sortText, index)=> {
      if(s == index) {
        this.setState({ [`sortRow${s}`]: !this.state[`sortRow${s}`] })
      } else this.setState({ [`sortRow${index}`]: false })
    })
  }

  render() {
    let { classifyRow, sortRow, filterRow, topView, middleView, allDevicesData } = this.state
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
          <View style={allDevicesData[0] ? {height: 0} : {height: '100%', backgroundColor: mainColor}}/>
          <View style={!classifyRow && !sortRow && !filterRow ? topView : middleView}>
            <Archives archivesData={allDevicesData} {...this.props} />
          </View>
          <View style={[topView, {height: classifyRow ? '100%' : 0}]}>
            {
              classifyRow ? <View style={{height: '100%'}}>
                <Classify data={classifyData} state={this.state} pressClass={this.pressClass.bind(this)} />
                <TouchableOpacity activeOpacity={0.8} onPress={()=> this.openModal('classifyRow')}>
                  <View style={device.halfOpacityView} />
                </TouchableOpacity>
              </View> : <View style={{height: 0}}/>
            }
          </View>
          <View style={[topView, {height: sortRow ? '100%' : 0}]}>
            {
              sortRow ? <View style={{height: '100%'}}>
                <Sort data={sortData} state={this.state} pressSort={this.pressSort.bind(this)}/>
                <TouchableOpacity activeOpacity={0.8} onPress={()=> this.openModal('sortRow')}>
                  <View style={device.halfOpacityView} />
                </TouchableOpacity>
              </View> : <View style={{height: 0}}/>
            }
          </View>
          <View style={[topView, {height: filterRow ? '100%' : 0}]}>
            {
              filterRow ? <View style={{height: '100%'}}>
                <Filter data={classifyData} state={this.state} pressBotton={this.pressBotton.bind(this)} pressConfirmReturn={this.pressConfirmReturn.bind(this)} />
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

