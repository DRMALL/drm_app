import React from 'react'
import { View, Text, ListView } from 'react-native'
import { equipment } from '../../styles'

export default props => {
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  })
  let logDataDs = ds.cloneWithRows(props.logData)
  return(
    <ListView 
      dataSource={logDataDs}
      renderRow={rowData => <RunningLogItem rowData={rowData} />}
    />
  )
}

const RunningLogItem = ({ rowData }) => {
  const { time } = rowData
  return(
    <Text style={equipment.logText}>{time + '  设备点火'}</Text>
  )
}
