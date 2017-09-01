import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import { primaryColor, lightBlueColor, mainColor } from '../../common/constants'
import { resettingPassword, newPassword, verifyNewPassword, confirm } from '../../common/strings'
import { setPassword } from '../../styles'
import Button from '../../components/units/Button'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const emptyIcon = require('../../images/navigation_icons/empty.png')

export default class SetPassword extends Component {
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
      newWord: '',
      newWordVer: '',
    }
  }

  pressConfirm() {
    let { newWord, newWordVer } = this.state
    if(newWord != '' && newWord == newWordVer) {
      this.props.navigation.navigate('login')
    } else {
      Alert.alert('错误', '密码不一致',
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
  }

  render() {
    return (
      <View style={setPassword.wrap}>
        <Text style={setPassword.fixText}>{newPassword}</Text>
        <TextInput 
          style={setPassword.input}
          underlineColorAndroid="transparent"
          onChangeText={(newWord)=> this.setState({newWord})}
          selectTextOnFocus={true}
        />
        <Text style={setPassword.fixText}>{verifyNewPassword}</Text>
        <TextInput 
          style={setPassword.input}
          underlineColorAndroid="transparent"
          onChangeText={(newWordVer)=> this.setState({newWordVer})}
          selectTextOnFocus={true}
        />
        <View style={setPassword.buttonView}>
          <Button 
            style={setPassword.button} 
            title={confirm} 
            titleStyle={setPassword.buttonText} 
            onPress={this.pressConfirm.bind(this)}
          />
        </View>
      </View>
    )
  }
}