import React, { Component } from 'react'
import { AsyncStorage, View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { drmOne, drmTwo, drmThree, loginInputEmail, loginInputWord, loginText, loginForgetWord } from '../common/strings'
import { login } from '../styles'
import Button from './units/Button'
import TextInputImg from './units/TextInputImg'
import { checkToken, depositToken, clearToken } from '../utils/handleToken'
import { postPort } from '../utils/fetchMethod'
import { signIn } from '../apis'


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

  componentDidMount() {
    checkToken('drmAppToken')
    .then(token => {
      if(token) this.props.navigation.navigate('main')
    })
    SplashScreen.hide()
    // clearToken()
  }

  async loginPressButton() {
    let bodyData = {
      email: this.state.textEmail,
      password: this.state.textWord,
    }
    let res = await postPort(signIn, bodyData)
    if(res.code == 201) {
      depositToken('drmAppToken', res.data)
      this.props.navigation.navigate('main')
    } else {
      Alert.alert('❌错误', '邮箱或密码输入有误',
        [
          {text: 'OK', onPress: () => 'OK'},
        ],
        { cancelable: false }
      )
    }
  }

  forgetPressButton() {
    this.props.navigation.navigate('emailVerify')
  }

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
            // keyboardType='numeric'
            selectTextOnFocus={true}
            blurOnSubmit={true}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
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
          onPress={this.loginPressButton.bind(this)}
        />
        <Button 
          title={loginForgetWord}
          titleStyle={login.touchForgetText}
          style={{height: 40, margin: 20, justifyContent: "center" }} 
          onPress={this.forgetPressButton.bind(this)}
        />
      </View>
    )
  }
}