import React, { Component } from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { postalAddress } from '../../common/strings'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const emptyIcon = require('../../images/navigation_icons/empty.png')

export default class Address extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{postalAddress}</Text>,
    // headerLeft: <Image onPress={() => 'ox'} style={{marginLeft: 20}} source={gobackWhiteIcon}/>,
    headerRight: <Text style={{ fontSize: 15, color: '#FFF', marginRight: 15 }} >保存</Text>,
  }
  render() {
    return (
      <View>
        <TextInput style={other.textInput} underlineColorAndroid="transparent" />
      </View>
    )
  }
}