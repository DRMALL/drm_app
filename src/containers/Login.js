import React, { Component } from 'react'
import { View, Text, TextInput, Image, KeyboardAvoidingView, StatusBar, Platform, ActivityIndicator } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { NavigationActions } from 'react-navigation'
import { 
  drmOne, 
  drmTwo, 
  drmThree, 
  loginInputEmail, 
  loginInputWord, 
  loginText, 
  loginForgetWord, 
  tokenKey,
} from '../common/strings'
import { login } from '../styles'
import Button from '../components/units/Button'
import TextInputImg from '../components/units/TextInputImg'
import { checkToken, clearToken } from '../utils/handleToken'

import store from '../utils/store'
import loginAC from '../actions/loginAC'
import getMsgReadAll from '../funcs/login/getMsgReadAll'
import loginPressButton from '../funcs/login/loginPressButton'

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
    this.state = store.getState().login
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
  }

  componentDidMount() {
    checkToken(tokenKey)
    .then(token => {
      if(token) {
        getMsgReadAll(token).then((readed)=> {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'main', params: { msgRedShow: readed ? false : true } }),
            ]
          })
          this.props.navigation.dispatch(resetAction)
        })
      }
    })
    loginAC.changeLoginEmail('')
    loginAC.changeLoginWord('')
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

  forgetPressButton() {
    this.props.navigation.navigate('emailVerify')
  }

  render() {
    let { textEmail, textWord, showSchedule } = this.state
      , { changeLoginEmail, changeLoginWord, changeShowSchedule } = loginAC
    return (
      <View style={[login.wrap, Platform.OS === 'ios' ? {top: -20, height: '103.5%'} : {height: '100%'}]}>
        <StatusBar hidden={true}/>
        <View style={{ height: Platform.OS === 'ios' ? 60 : 40 }} />
        <Image style={login.image} source={loginScreenLogo}/>
        <Text style={login.text}>{drmOne}</Text>
        <Text style={login.text}>{drmTwo}</Text>
        <Text style={[login.text, {lineHeight: 48, marginBottom: 40}]}>{drmThree}</Text>
        <ActivityIndicator animating={showSchedule} size='large'/>
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
          onPress={()=> {
            changeShowSchedule(true)
            loginPressButton(this.props)
          }}
        />
        <View style={{height: 40, margin: 20, justifyContent: "center" }}/>
      </View>
    )
  }
}

// {
//           <Button 
//           title={loginForgetWord}
//           titleStyle={login.touchForgetText}
//           style={{height: 40, margin: 20, justifyContent: "center" }} 
//           onPress={this.forgetPressButton.bind(this)}
//         />
//         }