import React, { Component } from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { userName } from '../../common/strings'

export default class UserName extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{userName}</Text>,
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