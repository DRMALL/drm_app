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
      renderRow={rowData => <Text>{rowData.title}</Text>}
    />
  )
}