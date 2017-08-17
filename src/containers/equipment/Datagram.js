import React, { Component }from 'react'
import { View, Text, Image, ListView, TouchableOpacity } from 'react-native'
import { lightBlueColor, contentColor, mainColor, backgroundColor } from '../../common/constants'
import { other } from '../../styles'

const datagramPic = require('../../images/datagram.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')

export default class Datagram extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 0,
      top: 50,
    }
  };
  render() {
    let { navigation } = this.props
    return(
      <View style={{width: '100%', paddingVertical: 10, paddingHorizontal: 20, paddingTop: 40}}>
        <TouchableOpacity style={{position: 'absolute', padding: 10}} onPress={()=> navigation.goBack()}>
          <Image style={{resizeMode: 'contain'}} source={cancelIcon}/>
        </TouchableOpacity>
        <Image style={{width: '100%', height: 200, resizeMode: 'contain'}} source={datagramPic}/>
      </View>
    )
  }
}