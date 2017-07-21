import React, { Component }from 'react'
import { View, Text, Image, ListView, TouchableOpacity, Alert } from 'react-native'
import { equipment } from '../../styles'

const dropdownNormal = require('../../images/dropdown_normal.png')
const intoIcon = require('../../images/navigation_icons/into.png')

export default props => {
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  })
  let indexDataDs = ds.cloneWithRows(props.indexData)
  return(
    <ListView 
      dataSource={indexDataDs}
      renderRow={(rowData) => <IndexDataItem rowData={rowData} />}
    />
  )
}

const IndexDataItem = ({ rowData }) => {
  const { title, textArr } = rowData
  return (
    <View>
      <TouchableOpacity style={equipment.dataTouch} onPress={()=> 'touch'}>
        <Text style={equipment.textTouch}>{title}</Text>
        <Image style={equipment.imgTouch} source={dropdownNormal} />
      </TouchableOpacity>
      <IndexDataItemList indexDataDetail={textArr} />
    </View>
  )
}

class IndexDataItemList extends Component {
  constructor(props) {
    super(props)
    let ds2 = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })
    this.state = {
      indexDataDetailDs: ds2.cloneWithRows(props.indexDataDetail),
      textStyle : props.textStyle,
    }
  }
  render() {
    return (
      <ListView
        dataSource={this.state.indexDataDetailDs}
        renderRow={(rowData) => <DataItemList rowData={rowData} />}
      />
    )
  }
}

const DataItemList = ({ rowData }) => {
  const { text, num, unit } = rowData
  return (
    <TouchableOpacity style={equipment.iDataItemTouch} onPress={()=> {Alert.alert('I don not go to where')}}>
      <Text style={equipment.iDataItemText}>{text}</Text>
      <Text style={[equipment.iDataItemText, {position: 'absolute', right: 70}]}>{num}</Text>
      <Text style={[equipment.iDataItemText2, {right: 45}]}>{unit}</Text>
      <Image style={equipment.iDataItemImg} source={intoIcon} />
    </TouchableOpacity>
  )
}