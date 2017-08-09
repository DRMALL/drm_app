import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { phoneNumber, save } from '../../common/strings'
import { updateInfo } from '../../apis'
import { postPort } from '../../utils/fetchMethod'
import { checkToken, depositToken, clearToken } from '../../utils/handleToken'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')
let phoneData

export default class Phone extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{phoneNumber}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => Phone.pressSavePhone(navigation)}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{save}</Text>
    </TouchableOpacity>,
  });

  static pressSavePhone(navigation) {
    checkToken('drmAppToken')
    .then(async token => {
      let bodyData = {
        phone: phoneData,
      }
      let res = await postPort(`${updateInfo}?token=${token}`, bodyData)
      if(res.code == 201) {
        navigation.navigate('information')
      }
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      phone_number: props.navigation.state.params.phone_number,
    }
  }

  onChangePhone(phone_number) {
    this.setState({ phone_number })
    phoneData = phone_number
  }

  cleanText() {
    this.setState({
      phone_number: '',
    })
  }

  render() {
    let { phone_number } = this.state
    return (
      <View style={other.wrap}>
        <View style={other.inputView}>
          <TextInput style={other.textInput} 
            value={phone_number} 
            onChangeText={this.onChangePhone.bind(this)}
            underlineColorAndroid='transparent' 
            autoCapitalize='none'
          />
          {
            phone_number != '' ? <TouchableOpacity style={other.cancelTouch} onPress={this.cleanText.bind(this)}>
              <Image style={other.cancelIcon} source={cancelIcon}/>
            </TouchableOpacity> : <Image style={{height: 0}}/>
          }
        </View>
      </View>
    )
  }
}