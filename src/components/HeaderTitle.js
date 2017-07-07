import React from 'react'
import { View, Text, Image } from 'react-native'

export default ({ navigation }) => {
  console.log(navigation)
  const title = () => {
    if (navigation.state.index == 0) return '设备管理系统'
    else if(navigation.state.index == 1) return '设备档案'
    else if(navigation.state.index == 2) return '设备监控'
    else return <Text>ooxx</Text>
  }
  return(
    <View style={{width: '100%'}}>
      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18, textAlign:'center'}}>{title()}</Text>
    </View>
  )
}