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
      renderRow={rowData => <HomeListItem rowData={rowData} navigation={props.navigation} />} 
      enableEmptySections={true}
    />
  )
}

const HomeListItem = ({ rowData, navigation }) => {
  const { _id, title, images, } = rowData
  return(
    <TouchableOpacity 
      style={home.wrap} 
      activeOpacity={0.8} 
      onPress={()=> navigation.navigate('homeDetail', {newsId: _id})}
    >
      <Image source={{uri: images[0].url}} style={home.img} />
      <View style={home.cover}>
        <Text style={home.title} numberOfLines={2}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}


