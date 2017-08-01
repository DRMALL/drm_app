import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { primaryColor, lightBlueColor, mainColor } from '../../common/constants'
import { resettingPassword, email, verificationCode, getVCode, next } from '../../common/strings'
import { emailVerify } from '../../styles'
import Button from '../units/Button'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const emptyIcon = require('../../images/navigation_icons/empty.png')

export default class EmailVerify extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: mainColor, alignSelf: 'center' }} >{resettingPassword}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <Image style={{marginLeft: 20}} source={emptyIcon}/>,
  });

  pressNext = ()=> {
    this.props.navigation.navigate('setPassword')
  };

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
            onPress={this.pressNext}
          />
        </View>
      </View>
    )
  }
}