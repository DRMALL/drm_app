import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { resetPassword, save, originalPassword, newPassword, verifyNewPassword } from '../../common/strings'
import { updatePassword } from '../../apis'
import { postPort } from '../../utils/fetchMethod'
import { checkToken, depositToken, clearToken } from '../../utils/handleToken'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
let origPwData
  , newPwData
  , verifyNewPwData

export default class ResetPassword extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{resetPassword}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => ResetPassword.pressSavePassword(navigation)}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{save}</Text>
    </TouchableOpacity>,
  });

  static pressSavePassword(navigation) {
    checkToken('drmAppToken')
    .then(async token => {
      let bodyData = {
        password: origPwData,
        newPass: newPwData,
        confirmPass: verifyNewPwData,
      }
      if(bodyData.password == undefined || bodyData.password == '') {
        return Alert.alert('❌错误', '原密码不能为空',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(bodyData.newPass == undefined || bodyData.newPass == '') {
        return Alert.alert('❌错误', '新密码不能为空',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(bodyData.confirmPass == undefined || bodyData.confirmPass == '') {
        return Alert.alert('❌错误', '确认新密码不能为空',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }

      let res = await postPort(`${updatePassword}?token=${token}`, bodyData)
      
      if(res == null) {
        Alert.alert('❌错误', 'Internal Server Error',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
        clearToken()
        navigation.navigate('login')
      } else if(res.code == 201) {
        Alert.alert('✅成功', '修改成功',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
        clearToken()
        navigation.navigate('login')
      } else {
        Alert.alert('❌错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      original_password: '',
      new_password: '',
      verify_password: '',
    }
  }

  onChangeOP(original_password) {
    this.setState({ original_password })
    origPwData = original_password
  }

  onChangeNP(new_password) {
    this.setState({ new_password })
    newPwData = new_password
  }

  onChangeVP(verify_password) {
    this.setState({ verify_password })
    verifyNewPwData = verify_password
  }

  render() {
    return (
      <View style={other.wrap}>
        <KeyboardAvoidingView behavior={'padding'} >
          <View style={other.inputView}>
            <TextInput style={other.textInput} 
              placeholder={originalPassword} 
              secureTextEntry={true} 
              underlineColorAndroid='transparent' 
              autoCapitalize='none'
              onChangeText={this.onChangeOP.bind(this)}
            />
            <TextInput style={other.textInput} 
              placeholder={newPassword} 
              secureTextEntry={true} 
              underlineColorAndroid='transparent' 
              autoCapitalize='none'
              onChangeText={this.onChangeNP.bind(this)}
            />
            <TextInput style={other.textInput} 
              placeholder={verifyNewPassword} 
              secureTextEntry={true} 
              underlineColorAndroid='transparent' 
              autoCapitalize='none'
              onChangeText={this.onChangeVP.bind(this)}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}