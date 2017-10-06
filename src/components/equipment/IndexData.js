import React, { Component }from 'react'
import { View, Text, Image, ListView, TouchableOpacity, Alert } from 'react-native'
import { lightBlueColor, contentColor, mainColor, backgroundColor } from '../../common/constants'
import { equipment } from '../../styles'
import normIndexPD from '../../utils/normIndexPD'
import normIndexPDO from '../../utils/normIndexPDO'

const dropdownNormal = require('../../images/dropdown_normal.png')
const dropdownSelected = require('../../images/dropdown_selected.png')
const intoIcon = require('../../images/navigation_icons/into.png')

export default class IndexData extends Component {
  constructor(props) {
    super(props)
    this.state = (props => {
      // logic 
      let obj = {}
      props.indexData.map((item, index) => {
        obj[`row${index}`] = false
      })
      return obj
    })(props)
  }

  open(which) {
    this.setState({[which]: !this.state[which]})
  }

  render() {
    let indexDataSec = [{title: '监控状态'}, {title: '电机状态'}]
    let { equipmentItemData, indexData, eqNumberData } = this.props
    return(
      <View style={{backgroundColor: backgroundColor}}>
        {
          equipmentItemData.number || (eqNumberData.data && eqNumberData.data.length > 0) ? indexDataSec.map((item, index) => {
            return <IndexDataSecItem rowData={item} index={index} key={index} state={this.state} open={this.open.bind(this)} {...this.props}/>
          }) : indexData.map((item, index) => {
            return <IndexDataItem rowData={item} index={index} key={index} state={this.state} open={this.open.bind(this)} {...this.props}/>
          })
        }
      </View>
    )
  }
}


const IndexDataItem = ({ rowData, state, open, index, navigation, equipmentItemData, eqNumberData }) => {
  let { title, textArr } = rowData
  let selectRow = state[`row${index}`]
  textArr = selectRow ? textArr : [] 
  let eqNumberDataRe = eqNumberData ? eqNumberData : {}
  return (
    <View>
      <TouchableOpacity style={equipment.dataTouch} activeOpacity={0.8} onPress={()=> open(`row${index}`)}>
        <Text style={[equipment.textTouch, {color: selectRow ? lightBlueColor : contentColor}]}>{title}</Text>
        <Image style={equipment.imgTouch} source={selectRow ? dropdownSelected : dropdownNormal} />
      </TouchableOpacity>
      <View style={{backgroundColor: mainColor}}>
        {textArr.map((textone, i)=> <DataItemRow key={i} item={textone} navigation={navigation} equipmentItemData={equipmentItemData} eqNumberData={eqNumberDataRe}/>)}
      </View>
    </View>
  )
}

const DataItemRow = props => {
  let { item, navigation, equipmentItemData, eqNumberData } = props
  return (
    <TouchableOpacity style={equipment.iDataItemTouch} activeOpacity={0.8} onPress={()=> navigation.navigate('datagram')}>
      <Text style={equipment.iDataItemText}>{item.text}</Text>
      <Text style={[equipment.iDataItemText, {position: 'absolute', right: 70}]}>{equipmentItemData.number ? normIndexPDO(item.text, equipmentItemData.data) : normIndexPD(item.text, eqNumberData.data)}</Text>
      <Text style={[equipment.iDataItemText2, {right: 45}]}>{item.unit}</Text>
      <Image style={equipment.iDataItemImg} source={intoIcon} />
    </TouchableOpacity>
  )
}

const IndexDataSecItem = ({ rowData, state, open, index, navigation, equipmentItemData, eqNumberData }) => {
  let { title } = rowData
  let selectRow = state[`row${index}`]
  let equipDataUse = equipmentItemData.number ? equipmentItemData.data : eqNumberData.data
  let equipmentItemDataRe = []
  if(title == '监控状态') {
    equipDataUse.forEach((dataItem)=> {
      if(dataItem.quotaClass === 1) equipmentItemDataRe.push(dataItem)
    })
  } else {
    equipDataUse.forEach((dataItem)=> {
      if(dataItem.quotaClass === 2) equipmentItemDataRe.push(dataItem)
    })
  }
  let equipmentItemDataSelect = selectRow ? equipmentItemDataRe : []
  return (
    <View>
      <TouchableOpacity style={equipment.dataTouch} activeOpacity={0.8} onPress={()=> open(`row${index}`)}>
        <Text style={[equipment.textTouch, {color: selectRow ? lightBlueColor : contentColor}]}>{title}</Text>
        <Image style={equipment.imgTouch} source={selectRow ? dropdownSelected : dropdownNormal} />
      </TouchableOpacity>
      <View style={{backgroundColor: mainColor}}>
        {equipmentItemDataSelect.map((textone, i)=> <DataItemSecRow key={i} item={textone} navigation={navigation} number={equipmentItemData.number || eqNumberData.number}/>)}
      </View>
    </View>
  )
}

const DataItemSecRow = props => {
  let { item, navigation, number } = props
  return (
    <TouchableOpacity style={equipment.iDataItemTouch} activeOpacity={0.8} onPress={()=> navigation.navigate('datagram', {gramNumber: number, gramField: item.orgName})}>
      <Text style={equipment.iDataItemText}>{item.quotaName}</Text>
      {
        item.quotaClass === 1 ? <Text style={[equipment.iDataItemText, {position: 'absolute', right: 70}]}>{item.value}</Text>
         : <Text style={[equipment.iDataItemText, {position: 'absolute', right: 50}, item.value == 1 ? {color: lightBlueColor } : {}]}>{item.value == 1 ? '打开' : '关闭'}</Text>
      }
      {
        item.quotaClass === 1 ? <Text style={[equipment.iDataItemText2, {right: 45}]}>{item.unitName || '单位'}</Text>
         : <View />
      }
      <Image style={equipment.iDataItemImg} source={intoIcon} />
    </TouchableOpacity>
  )
}

//
//
