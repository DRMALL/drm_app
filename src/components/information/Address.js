import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { postalAddress, save } from '../../common/strings'
import { updateInfo } from '../../apis'
import { postPort } from '../../utils/fetchMethod'
import { checkToken, depositToken, clearToken } from '../../utils/handleToken'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
let addressData

export default class Address extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{postalAddress}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => Address.pressSaveAddress(navigation)}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{save}</Text>
    </TouchableOpacity>,
  });

  static pressSaveAddress(navigation) {
    checkToken('drmAppToken')
    .then(async token => {
      let bodyData = {
        address: addressData,
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
      postal_address: props.navigation.state.params.postal_address,
    }
  }

  onChangeAddress(postal_address) {
    this.setState({ postal_address })
    addressData = postal_address
  }

  render() {
    return (
      <View style={other.wrap}>
        <TextInput style={other.textInput} 
          value={this.state.postal_address} 
          onChangeText={this.onChangeAddress.bind(this)}
          underlineColorAndroid='transparent' 
          autoCapitalize='none'
        />
      </View>
    )
  }
}