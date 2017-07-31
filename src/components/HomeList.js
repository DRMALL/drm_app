import React from 'react'
import { View, Text, Image, ListView, TouchableOpacity } from 'react-native'
import { home } from '../styles'

export default props => {
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  })
  let finalDs = ds.cloneWithRows(props.data)
  return(
    <ListView 
      dataSource={finalDs}
      renderRow={rowData => <HomeListItem rowData={rowData} navigation={props.navigation}/>}
    />
  )
}

const HomeListItem = ({ rowData, navigation }) => {
  const { title, img, } = rowData
  return(
    <TouchableOpacity 
      style={home.wrap} 
      activeOpacity={0.8} 
      onPress={()=> navigation.navigate('homeDetail')}
    >
      <Image source={img} style={home.img} />
      <View style={home.cover}>
        <Text style={home.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}


