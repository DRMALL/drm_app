import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { phoneNumber, save } from '../../common/strings'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')

export default class Phone extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{phoneNumber}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => alert('ok')}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{save}</Text>
    </TouchableOpacity>,
  });

  constructor(props) {
    super(props)
    this.state = {
      phone_number: props.navigation.state.params.phone_number,
    }
  }

  render() {
    return (
      <View style={other.wrap}>
        <TextInput style={other.textInput} 
          value={this.state.phone_number} 
          onChangeText={(phone_number)=> this.setState({phone_number})}
          underlineColorAndroid="transparent" 
        />
      </View>
    )
  }
}