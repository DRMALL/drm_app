import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { resetPassword, save, originalPassword, newPassword, verifyNewPassword } from '../../common/strings'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')

export default class ResetPassword extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{resetPassword}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => alert('ok')}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{save}</Text>
    </TouchableOpacity>,
  })
  render() {
    return (
      <View style={other.wrap}>
        <TextInput style={other.textInput} placeholder={originalPassword} secureTextEntry={true} underlineColorAndroid="transparent" />
        <TextInput style={other.textInput} placeholder={newPassword} secureTextEntry={true} underlineColorAndroid="transparent" />
        <TextInput style={other.textInput} placeholder={verifyNewPassword} secureTextEntry={true} underlineColorAndroid="transparent" />
      </View>
    )
  }
}