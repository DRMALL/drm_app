import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { primaryColor, lightBlueColor, mainColor } from '../../common/constants'
import { resettingPassword, email, verificationCode, getVCode, next } from '../../common/strings'
import { emailVerify } from '../../styles'
import Button from '../units/Button'

export default class EmailVerify extends Component {
  render() {
    return (
      <View style={emailVerify.wrap}>
        <Text style={emailVerify.fixText}>{email}</Text>
        <View style={{justifyContent: 'center'}}>
          <TextInput 
            style={emailVerify.emailInput}
            underlineColorAndroid="transparent"
            onChangeText={(text)=> 'this.setState({})'}
            selectTextOnFocus={true}
          />
          <View style={emailVerify.getVCodeView}>
            <Button 
              style={emailVerify.getVCodeButton} 
              title={getVCode} 
              titleStyle={{color: lightBlueColor}}
              activeOpacity={0.6} 
              onPress={()=> alert('send code')}
            />
          </View>
        </View>
        <Text style={emailVerify.fixText}>{verificationCode}</Text>
        <TextInput 
          style={emailVerify.vCodeInput}
          underlineColorAndroid="transparent"
          onChangeText={(text)=> 'this.setState({})'}
          selectTextOnFocus={true}
        />
        <View style={emailVerify.nextButtonView}>
          <Button 
            style={emailVerify.nextButton} 
            title={next} 
            titleStyle={emailVerify.nextButtonText} 
            activeOpacity={0.6}
            onPress={()=> alert('next')}
          />
        </View>
      </View>
    )
  }
}