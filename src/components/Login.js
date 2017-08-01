import React, { Component } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { drmOne, drmTwo, drmThree, loginInputEmail, loginInputWord, loginText, loginForgetWord } from '../common/strings'
import { login } from '../styles'
import Button from './units/Button'
import TextInputImg from './units/TextInputImg'

const loginScreenLogo = require('../images/login_screen_logo.png')
const loginPasswordShow = require('../images/login_password_show.png')
const loginPasswordHide = require('../images/login_password_hide.png')

export default class Login extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 0,
      top: 50,
    }
  };

  constructor(props) {
    super(props)
    this.state = { 
      textEmail: '', 
      textWord: '',
    }
  }
  loginPressButton = ()=> {
    this.props.navigation.navigate('main')
  };
  forgetPressButton = ()=> {
    this.props.navigation.navigate('emailVerify')
  };
  render() {
    return (
      <View style={login.wrap}>
        <Image style={login.image} source={loginScreenLogo}/>
        <Text style={login.text}>{drmOne}</Text>
        <Text style={login.text}>{drmTwo}</Text>
        <Text style={[login.text, {lineHeight: 48, marginBottom: 40}]}>{drmThree}</Text>
        <KeyboardAvoidingView behavior={'padding'} >
          <TextInput 
            style={login.textInput}
            placeholder={loginInputEmail}
            onChangeText={(textEmail) => this.setState({textEmail})}
            value={this.state.textEmail}
            keyboardType="numeric"
            selectTextOnFocus={true}
            blurOnSubmit={true}
            underlineColorAndroid="transparent"
          />
          <TextInputImg 
            viewStyle={{position: 'relative'}}
            inputStyle={login.textInput}
            placeholder={loginInputWord}
            onChangeText={(textWord) => this.setState({textWord})}
            value={this.state.textWord}
            secureTextEntry={true}
            onFocus={this.onFocusInput}
            imgStyle={{width: 25, resizeMode: 'contain', marginBottom: 10 }}
            imgSourceT={loginPasswordShow}
            imgSourceF={loginPasswordHide}
          />
        </KeyboardAvoidingView>
        <Button 
          title={loginText}
          titleStyle={login.touchLoginText}
          style={login.touchOpacity} 
          onPress={this.loginPressButton}
        />
        <Button 
          title={loginForgetWord}
          titleStyle={login.touchForgetText}
          style={{height: 40, margin: 20, justifyContent: "center" }} 
          onPress={this.forgetPressButton}
        />
      </View>
    )
  }
}