import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { postalAddress, save, tokenKey } from '../../common/strings'
import { updateInfo } from '../../apis'
import { postPort } from '../../utils/fetchMethod'
import { checkToken, depositToken, clearToken } from '../../utils/handleToken'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')

export default class Address extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{postalAddress}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => navigation.state.params.pressSaveAddress()}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{save}</Text>
    </TouchableOpacity>,
  });

  

  constructor(props) {
    super(props)
    let { postal_address } = props.navigation.state.params
    this.state = {
      postal_address: postal_address === 'null' || postal_address === 'undefined' ? '' : postal_address,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({  
      pressSaveAddress: () => this.pressSaveAddress(), 
    })
  }

  pressSaveAddress() {
    checkToken(tokenKey)
    .then(async token => {
      let bodyData = {
        address: this.state.postal_address,
      }
      let res = await postPort(`${updateInfo}?token=${token}`, bodyData)
      if(!res) {
        Alert.alert('错误', 'Internal Server Error',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 201) {
        this.props.navigation.navigate('information')
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  onChangeAddress(postal_address) {
    this.setState({ postal_address })
  }

  cleanText() {
    this.setState({
      postal_address: '',
    })
  }

  render() {
    let { postal_address } = this.state
    return (
      <View style={other.wrap}>
        <View style={other.inputView}>
          <TextInput style={other.textInput} 
            value={postal_address} 
            onChangeText={this.onChangeAddress.bind(this)}
            underlineColorAndroid='transparent' 
            autoCapitalize='none'
          />
          {
            postal_address != '' ? <TouchableOpacity style={other.cancelTouch} onPress={this.cleanText.bind(this)}>
              <Image style={other.cancelIcon} source={cancelIcon}/>
            </TouchableOpacity> : <Image style={{height: 0}}/>
          }
        </View>
      </View>
    )
  }
}