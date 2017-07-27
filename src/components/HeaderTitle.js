import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

export default ({ navigation, navigate }) => {
  const title = ((navigation, navigate) => {
    if (navigation.state.index == 0) return <Title title='设备管理系统' />
    else if(navigation.state.index == 1) return <Title title='设备档案' />
    else if(navigation.state.index == 2) return <Title title='设备监控' />
    else return <Search navigation={navigation} />
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

const Search = props => {
  return(
    <TouchableOpacity 
      onPress={() => props.navigation.navigate('main', {name: 'Main'})}
      style={{width:'96%', height:'70%', marginTop:5, marginLeft: '2%', borderRadius:3, backgroundColor: '#fff'}}
    >

    </TouchableOpacity>
  )
}