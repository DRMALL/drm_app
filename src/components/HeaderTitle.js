import React from 'react'
import { View, Text, Image } from 'react-native'

export default ({ navigation }) => {
  const title = (navigation => {
    if (navigation.state.index == 0) return <Title title='设备管理系统' />
    else if(navigation.state.index == 1) return <Title title='设备档案' />
    else if(navigation.state.index == 2) return <Title title='设备监控' />
    else return <Text>There will be a search bar</Text>
  })(navigation)
  return(
    <View style={{width: '100%'}}>
      {title}
    </View>
  )
}

const Title = props => {
  return(
    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18, textAlign:'center'}}>{props.title}</Text>
  )
}