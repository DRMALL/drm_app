import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { resetPassword, save } from '../../common/strings'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')

export default class ResetPassword extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{resetPassword}</Text>,
    headerLeft: <TouchableOpacity style={{paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{paddingRight: 15}} onPress={() => alert('ok')}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{save}</Text>
    </TouchableOpacity>,
  })
  render() {
    return (
      <View>
        <TextInput style={other.textInput} placeholder={'原密码'} secureTextEntry={true} underlineColorAndroid="transparent" />
        <TextInput style={other.textInput} placeholder={'新密码'} secureTextEntry={true} underlineColorAndroid="transparent" />
        <TextInput style={other.textInput} placeholder={'确认新密码'} secureTextEntry={true} underlineColorAndroid="transparent" />
      </View>
    )
  }
}