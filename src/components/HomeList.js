import React from 'react'
import { View, Text, Image, ListView } from 'react-native'
import { home } from '../styles'

export default props => {
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  })
  let finalDs = ds.cloneWithRows(props.data)
  return(
    <ListView 
      dataSource={finalDs}
      renderRow={rowData => <HomeListItem rowData={rowData} />}
    />
  )
}

const HomeListItem = ({ rowData }) => {
  const { title, img } = rowData
  return(
    <View style={home.wrap}>
      <Image source={img} style={home.img} />
      <View style={home.cover}>
        <Text style={home.title}>{title}</Text>
      </View>
    </View>
  )
}


