import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { primaryColor, lightBlueColor, mainColor } from '../../common/constants'
import { resettingPassword, newPassword, verifyNewPassword, confirm } from '../../common/strings'
import { setPassword } from '../../styles'
import Button from '../units/Button'

export default class SetPassword extends Component {
  render() {
    return (
      <View style={setPassword.wrap}>
        <Text style={setPassword.fixText}>{newPassword}</Text>
        <TextInput 
          style={setPassword.input}
          underlineColorAndroid="transparent"
          onChangeText={(text)=> 'this.setState({})'}
          selectTextOnFocus={true}
        />
        <Text style={setPassword.fixText}>{verifyNewPassword}</Text>
        <TextInput 
          style={setPassword.input}
          underlineColorAndroid="transparent"
          onChangeText={(text)=> 'this.setState({})'}
          selectTextOnFocus={true}
        />
        <View style={setPassword.buttonView}>
          <Button 
            style={setPassword.button} 
            title={confirm} 
            titleStyle={setPassword.buttonText} 
            onPress={()=> alert('confirm')}
          />
        </View>
      </View>
    )
  }
}