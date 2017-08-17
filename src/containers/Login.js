import React, { Component } from 'react'
import { AsyncStorage, View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { NavigationActions } from 'react-navigation'
import { drmOne, drmTwo, drmThree, loginInputEmail, loginInputWord, loginText, loginForgetWord, tokenKey } from '../common/strings'
import { login } from '../styles'
import Button from '../components/units/Button'
import TextInputImg from '../components/units/TextInputImg'
import { checkToken, depositToken, clearToken } from '../utils/handleToken'
import { postPort } from '../utils/fetchMethod'
import { signIn } from '../apis'

import store from '../utils/store'
import changeLoginEmail from '../actions/changeLoginEmail'
import changeLoginWord from '../actions/changeLoginWord'

const loginScreenLogo = require('../images/login_screen_logo.png')
const loginPasswordShow = require('../images/login_password_show.png')
const loginPasswordHide = require('../images/login_password_hide.png')

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'main'}),
  ]
})

export default class Login extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 0,
      top: 50,
    }
  };

  constructor(props) {
    super(props)
    this.state = store.getState().login
  }

  componentDidMount() {
    checkToken(tokenKey)
    .then(token => {
      if(token) this.props.navigation.dispatch(resetAction)
    })
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000)
    // clearToken()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().login) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  async loginPressButton() {
    let bodyData = {
      email: this.state.textEmail,
      password: this.state.textWord,
    }
    let res = await postPort(signIn, bodyData)
    if(res.code == 201) {
      depositToken(tokenKey, res.data)
      this.props.navigation.dispatch(resetAction)
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
    let { textEmail, textWord } = this.state
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
            onChangeText={changeLoginEmail}
            value={textEmail}
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
            onChangeText={changeLoginWord}
            value={textWord}
            secureTextEntry={true}
            // onFocus={this.onFocusInput}
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