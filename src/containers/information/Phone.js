import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { phoneNumber, save, tokenKey } from '../../common/strings'
import { updateInfo } from '../../apis'
import { postPort } from '../../utils/fetchMethod'
import { checkToken, depositToken, clearToken } from '../../utils/handleToken'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')

export default class Phone extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{phoneNumber}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => navigation.state.params.pressSavePhone()}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{save}</Text>
    </TouchableOpacity>,
  });

  constructor(props) {
    super(props)
    let { phone_number } = props.navigation.state.params
    this.state = {
      phone_number: phone_number == null || phone_number == 'null' ? '' : phone_number,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({  
      pressSavePhone: () => this.pressSavePhone(), 
    })
  }

  pressSavePhone() {
    checkToken(tokenKey)
    .then(async token => {
      let bodyData = {
        phone: this.state.phone_number,
      }
      let res = await postPort(`${updateInfo}?token=${token}`, bodyData)
      if(!res) {
        Alert.alert('错误', 'Internal Server Error',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 201) {
        this.props.navigation.navigate('information')
      } else if(res.code == 402) {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  onChangePhone(phone_number) {
    this.setState({ phone_number })
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
            maxLength={15}
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