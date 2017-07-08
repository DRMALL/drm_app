import React from 'react'
import { View, Text, Image, ListView } from 'react-native'

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
    <View style={list.wrap}>
      <Image source={img} style={list.img} />
      <View style={list.cover}>
        <Text style={list.title}>{title}</Text>
      </View>
    </View>
  )
}

const list = {
  wrap: {
    width: '100%',
  },
  img: {
    position: 'absolute',
    width: '100%',
    height: 240,
  },
  cover: {
    zIndex: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: 240,
    backgroundColor: 'rgba(0,0,0,.2)'
  },
  title: {
    padding: 16,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    color: '#fff'
  },
}


