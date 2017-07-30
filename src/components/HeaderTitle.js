import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { inputPartsKeywords } from '../common/strings'
import { headerTitle } from '../styles'

const searchIcon = require('../images/navigation_icons/search.png')

export default ({ navigation, navigate }) => {
  const title = ((navigation, navigate) => {
    if (navigation.state.index == 0) return <Title title='设备管理系统' />
    else if(navigation.state.index == 1) return <Title title='设备档案' />
    else if(navigation.state.index == 2) return <Title title='设备监控' />
    else return <Search navigation={navigation} />
  })(navigation)
  return(
    <View style={headerTitle.wrap}>
      {title}
    </View>
  )
}

const Title = props => {
  return(
    <Text style={headerTitle.titleText}>{props.title}</Text>
  )
}

const Search = props => {
  return(
    <TouchableOpacity 
      style={headerTitle.searchTouch} 
      activeOpacity={1} 
      onPress={() => props.navigation.navigate('main', {name: 'Main'})}
    >
      <Image style={headerTitle.searchImg} source={searchIcon}/>
      <Text style={headerTitle.searchText}>{inputPartsKeywords}</Text>
    </TouchableOpacity>
  )
}