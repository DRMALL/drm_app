import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import { primaryColor, lightBlueColor, mainColor } from '../../common/constants'
import { resettingPassword, email, verificationCode, getVCode, next } from '../../common/strings'
import { emailVerify } from '../../styles'
import Button from '../../components/units/Button'

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

  constructor(props) {
    super(props)
    this.state = {
      emailVer: '',
      codeVer: '',
    }
  }

  pressNext() {
    if(this.state.codeVer == '666666' && this.state.emailVer.indexOf('@') > 0) {
      this.props.navigation.navigate('setPassword')
    } else {
      Alert.alert('错误', '验证错误',
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  }

  pressSendCode() {
    if(this.state.emailVer != '') {
      if(this.state.emailVer.indexOf('@') > 0) {
        Alert.alert('提示', '已发送验证码！',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else {
        Alert.alert('错误', '无效的邮箱！',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    } else {
      Alert.alert('提示', '请输入邮箱！',
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  }

  render() {
    return (
      <View style={emailVerify.wrap}>
        <Text style={emailVerify.fixText}>{email}</Text>
        <View style={{justifyContent: 'center'}}>
          <TextInput 
            style={emailVerify.emailInput}
            underlineColorAndroid="transparent"
            onChangeText={(emailVer)=> this.setState({emailVer})}
            selectTextOnFocus={true}
            maxLength={30}
          />
          <View style={emailVerify.getVCodeView}>
            <Button 
              style={emailVerify.getVCodeButton} 
              title={getVCode} 
              titleStyle={{color: lightBlueColor}}
              activeOpacity={0.6} 
              onPress={this.pressSendCode.bind(this)}
            />
          </View>
        </View>
        <Text style={emailVerify.fixText}>{verificationCode}</Text>
        <TextInput 
          style={emailVerify.vCodeInput}
          underlineColorAndroid="transparent"
          onChangeText={(codeVer)=> this.setState({codeVer})}
          selectTextOnFocus={true}
          maxLength={10}
          placeholder={'eg: 666666'}
        />
        <View style={emailVerify.nextButtonView}>
          <Button 
            style={emailVerify.nextButton} 
            title={next} 
            titleStyle={emailVerify.nextButtonText} 
            activeOpacity={0.6}
            onPress={()=> this.pressNext()}
          />
        </View>
      </View>
    )
  }
}