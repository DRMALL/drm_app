import React, { Component }from 'react'
import { View, Text, Image, ListView, TouchableOpacity, Alert } from 'react-native'
import { lightBlueColor, contentColor, mainColor, backgroundColor } from '../../common/constants'
import { equipment } from '../../styles'

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
    return(
      <View style={{backgroundColor: backgroundColor}}>
        {
          this.props.indexData.map((item, index) => {
            return <IndexDataItem rowData={item} index={index} key={index} state={this.state} open={this.open.bind(this)}/>
          })
        }
      </View>
    )
  }
}


const IndexDataItem = ({ rowData, state, open, index }) => {
  let { title, textArr } = rowData
  let selectRow = state[`row${index}`]
  textArr = selectRow ? textArr : [] 
  return (
    <View>
      <TouchableOpacity style={equipment.dataTouch} activeOpacity={0.8} onPress={()=> open(`row${index}`)}>
        <Text style={[equipment.textTouch, {color: selectRow ? lightBlueColor : contentColor}]}>{title}</Text>
        <Image style={equipment.imgTouch} source={selectRow ? dropdownSelected : dropdownNormal} />
      </TouchableOpacity>
      <View style={{backgroundColor: mainColor}}>
        {textArr.map((textone, i)=> <DataItemRow key={i} item={textone} />)}
      </View>
    </View>
  )
}

const DataItemRow = props => {
  return (
    <TouchableOpacity style={equipment.iDataItemTouch} activeOpacity={0.8} onPress={()=> {Alert.alert(`I don't know where to go`)}}>
      <Text style={equipment.iDataItemText}>{props.item.text}</Text>
      <Text style={[equipment.iDataItemText, {position: 'absolute', right: 70}]}>{props.item.num}</Text>
      <Text style={[equipment.iDataItemText2, {right: 45}]}>{props.item.unit}</Text>
      <Image style={equipment.iDataItemImg} source={intoIcon} />
    </TouchableOpacity>
  )
  
}
