import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { inputPartsKeywords, inputDeviceFault, inputDeviceNumber, inputDeviceTypes } from '../common/strings'
import { headerTitle } from '../styles'

import deviceAC from '../actions/deviceAC'
import seekAC from '../actions/seekAC'

const searchIcon = require('../images/navigation_icons/search.png')

export default ({ navigation, navigate }) => {
  const title = ((navigation, navigate) => {
    if (navigation.state.index == 0) return <Title title='设备管理系统' />
    else if(navigation.state.index == 1) {
      deviceAC.setAllRowFalse()
      return <Search title={inputDeviceTypes} navigation={navigation} routerTo={'searchDevice'}/>
    }
    else if(navigation.state.index == 2) return <Search title={inputDeviceNumber} navigation={navigation} routerTo={'searchStatus'}/>
    else if(navigation.state.index == 3) return <Search title={inputDeviceFault} navigation={navigation} routerTo={'searchDiagnose'}/>
    else {
      seekAC.setAllRowFalse()
      return <Search title={inputPartsKeywords} navigation={navigation} routerTo={'searchSeek'}/>
    }
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
  let { title, navigation, routerTo } = props
  return(
    <TouchableOpacity 
      style={headerTitle.searchTouch} 
      activeOpacity={1} 
      onPress={() => props.navigation.navigate(routerTo)}
    >
      <Image style={headerTitle.searchImg} source={searchIcon}/>
      <Text style={headerTitle.searchText}>{title}</Text>
    </TouchableOpacity>
  )
}