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
import { getDevices, getDeviceAddress } from '../apis'
import { deviceArchivesList, classifyData, sortData, filterData } from '../utils/virtualData'

const dropdownNormal = require('../images/dropdown_normal.png')
const dropdownSelected = require('../images/dropdown_selected.png')

export default class DeviceCategory extends Component {
  constructor(props) {
    super(props)
    this.state = (props => {
      let stateObj = {
        isMounted: false,
        classifyRow: false,
        sortRow: false,
        filterRow: false,
        classRowNum: classifyData.length+1, 
        classRow0: true,
        classKindsType: '',
        classKinds: '全部',
        classj: 0,
        kindk: 0,
        confirmPress: false,
        cleanPress: false,
        sortTypesNum: 0,
        filtercc: 'null',
        filterpressure: 'null',
        filtercombustible: 'null',
        filteraddress: 'null',
        filterSearch: false,
        topView: {position: 'relative', zIndex: 3},
        middleView: {position: 'absolute', zIndex: 2},
        allDevicesData: [],
        allCities: [],
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
    this.setState({isMounted: true})
    this.getAllDevices()
    this.getHotCities()
  }

  componentWillUnmount(){
    this.setState({isMounted: false})
  }

  openModal(which) {
    this.setState({
      classifyRow: which == 'classifyRow' ? !this.state.classifyRow : false,
      sortRow: which == 'sortRow' ? !this.state.sortRow : false,
      filterRow: which == 'filterRow' ? !this.state.filterRow : false,
      filterSearch: false,
    })
  }

  getAllDevices() {
    let res
    checkToken('drmAppToken')
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
      } else if(sortTypesNum == 1) {
        res = await getPort(`${getDevices}?createTime=asc&token=${token}`)
      } else if(sortTypesNum == 2) {
        res = await getPort(`${getDevices}?createTime=desc&token=${token}`)
      } else if(classKinds !== '全部') {
        res = await getPort(`${getDevices}?type=${classKindsType}&value=${classKinds}&token=${token}`)
      } else {
        res = await getPort(`${getDevices}?token=${token}`)
      }
      if(res.code == 200) {
        if(this.state.isMounted) {
          this.setState({
            allDevicesData: res.data,
            filtercc: 'null',
            filterpressure: 'null',
            filtercombustible: 'null',
            filteraddress: 'null',
          })
        }
      }
    })
  }

  getHotCities() {
    checkToken('drmAppToken')
    .then(async token => {
      let res = await getPort(`${getDeviceAddress}?token=${token}`)
      if(res.code == 200) {
        if(this.state.isMounted) {
          this.setState({
            allCities: res.data,
          })
        }
      }
    })
  }

  pressClass(index) {
    let lengthNum = this.state.classRowNum
    for(let i = 0; i < lengthNum; i++) {
      if(this.state.isMounted) {
        if(index == i) {
          this.setState({[`classRow${index}`]: true})
        }
        else this.setState({[`classRow${i}`]: false})
      }
    }
  }

  pressBotton(which) {
    if(this.state.isMounted) {
      this.setState(bfoState=> {
        return {
          [which]: !this.state[which],
          filterSearch: which == 'confirmPress' ? true : false,
          filtercc: which == 'cleanPress' ? 'null' : bfoState.filtercc,
          filterpressure: which == 'cleanPress' ? 'null' : bfoState.filterpressure,
          filtercombustible: which == 'cleanPress' ? 'null' : bfoState.filtercombustible,
          filteraddress: which == 'cleanPress' ? 'null' : bfoState.filteraddress,
        }
      })
    }
  }

  pressFilterParams(type, kind) {
    if(this.state.isMounted) {
      switch(type) {
        case 'cc': {
          this.setState({filtercc: kind})
        }break
        case 'pressure': {
          this.setState({filterpressure: kind})
        }break
        case 'combustible': {
          this.setState({filtercombustible: kind})
        }break
        default: {
          this.setState({filteraddress: kind})
        }
      }
    }
  }

  pressConfirmReturn() {
    if(this.state.isMounted) {
      this.setState({
        filterRow: false,
      })
    }
    this.getAllDevices()
  }

  pressSort(s) {
    sortData.map((sortText, index)=> {
      if(this.state.isMounted) {
        if(s == index) {
          this.setState({ 
            [`sortRow${s}`]: !this.state[`sortRow${s}`], 
            sortTypesNum: !this.state[`sortRow${s}`] ? s+1 : 0,
            sortRow: !this.state[`sortRow${s}`] ? false : true,
            classj: !this.state[`sortRow${s}`] ? 0 : this.state.classj,
            kindk: !this.state[`sortRow${s}`] ? 0 : this.state.kindk,
          })
        } else this.setState({ [`sortRow${index}`]: false })
      }
    })
    this.getAllDevices()
  }

  changeClassKinds(j, k, type, kind) {
    let stNum = this.state.sortTypesNum-1
    if(this.state.isMounted) {
      this.setState({
        classj: j,
        kindk: k,
        classKindsType: type,
        classKinds: kind,
        classifyRow: false,
        sortTypesNum: 0,
        [`sortRow${stNum}`]: false,
      })
    }
    this.getAllDevices()
  }

  render() {
    let { classifyRow, sortRow, filterRow, topView, middleView, allDevicesData, allCities } = this.state
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
            <Archives archivesData={allDevicesData} {...this.props} />
          </View>
          <View style={[topView, {height: classifyRow ? '100%' : 0}]}>
            {
              classifyRow ? <View style={{height: '100%'}}>
                <Classify data={classifyData} 
                  state={this.state} 
                  pressClass={this.pressClass.bind(this)} 
                  changeClassKinds={this.changeClassKinds.bind(this)}
                />
                <TouchableOpacity activeOpacity={0.8} onPress={()=> this.openModal('classifyRow')}>
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
                <TouchableOpacity activeOpacity={0.8} onPress={()=> this.openModal('sortRow')}>
                  <View style={device.halfOpacityView} />
                </TouchableOpacity>
              </View> : <View style={{height: 0}}/>
            }
          </View>
          <View style={[topView, {height: filterRow ? '100%' : 0}]}>
            {
              filterRow ? <View style={{height: '100%'}}>
                <Filter data={filterData} 
                  cityData={allCities} 
                  state={this.state} 
                  pressBotton={this.pressBotton.bind(this)} 
                  pressConfirmReturn={this.pressConfirmReturn.bind(this)} 
                  pressFilterParams={this.pressFilterParams.bind(this)}
                />
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

