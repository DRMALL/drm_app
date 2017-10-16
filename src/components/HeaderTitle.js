import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { inputPartsKeywords, inputDeviceFault, inputDeviceNumber, inputDeviceTypes } from '../common/strings'
import { headerTitle } from '../styles'
// import io from '../utils/socket'

import deviceAC from '../actions/deviceAC'
import statuAC from '../actions/statuAC'
import seekAC from '../actions/seekAC'
import socketConnectStatu from '../funcs/status/socketConnectStatu'

const searchIcon = require('../images/navigation_icons/search.png')
// let socketIo = io()

export default ({ navigation, navigate }) => {
  const title = ((navigation, navigate) => {
    if (navigation.state.index == 0) {
      // socketIo.close()
      return <Title title='设备管理系统' />
    }
    else if(navigation.state.index == 1) {
      // socketIo.close()
      deviceAC.setAllRowFalse()
      return <Search title={inputDeviceTypes} navigation={navigation} routerTo={'searchDevice'}/>
    }
    else if(navigation.state.index == 2) {
      // socketIo = io()
      // statuAC.saveSocketIo(socketIo)
      // socketConnectStatu(socketIo, navigation)
      return <Search title={inputDeviceNumber} navigation={navigation} routerTo={'searchStatus'}/>
    }
    else if(navigation.state.index == 3) {
      // socketIo.close()
      return <Search title={inputDeviceFault} navigation={navigation} routerTo={'searchDiagnose'}/>
    }
    else {
      // socketIo.close()
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