import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { userName, save } from '../../common/strings'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')

export default class UserName extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{userName}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={UserName.pressSaveName}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{save}</Text>
    </TouchableOpacity>,
  });

  static pressSaveName() {
    alert('ok')
  }

  constructor(props) {
    super(props)
    this.state = {
      user_name: props.navigation.state.params.user_name,
    }
  }

  render() {
    return (
      <View style={other.wrap}>
        <TextInput style={other.textInput} 
          value={this.state.user_name} 
          onChangeText={(user_name)=> this.setState({user_name})}
          underlineColorAndroid="transparent" 
        />
      </View>
    )
  }
}