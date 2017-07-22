import React, { Component }from 'react'
import { View, Text, Image, ListView, TouchableOpacity, Alert } from 'react-native'
import { equipment } from '../../styles'

const dropdownNormal = require('../../images/dropdown_normal.png')
const intoIcon = require('../../images/navigation_icons/into.png')

export default class IndexData extends Component {
  constructor(props) {
    super(props)
    this.state = (props => {
      // logic
      let obj = {}
      props.indexData.map((item, index) => {
        obj[`row${index}`] = true
      })
      return obj
    })(props)
  }

  open(which) {
    this.setState({[which]: !this.state[which]})
  }

  render() {

    return(
      <View>
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
  textArr = state[`row${index}`] ? [] : textArr 
  return (
    <View>
      <TouchableOpacity style={equipment.dataTouch} onPress={()=> open(`row${index}`)}>
        <Text style={equipment.textTouch}>{title}</Text>
        <Image style={equipment.imgTouch} source={dropdownNormal} />
      </TouchableOpacity>
      <View>
        {textArr.map((textone, i)=> <DataItemRow key={i} item={textone} />)}
      </View>
    </View>
  )
}

const DataItemRow = props => {
  return (
    <TouchableOpacity style={equipment.iDataItemTouch} onPress={()=> {Alert.alert('I do not where to go')}}>
      <Text style={equipment.iDataItemText}>{props.item.text}</Text>
      <Text style={[equipment.iDataItemText, {position: 'absolute', right: 70}]}>{props.item.num}</Text>
      <Text style={[equipment.iDataItemText2, {right: 45}]}>{props.item.unit}</Text>
      <Image style={equipment.iDataItemImg} source={intoIcon} />
    </TouchableOpacity>
  )
  
}
