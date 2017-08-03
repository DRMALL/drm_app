import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { userName, save } from '../../common/strings'
import { updateInfo } from '../../apis'
import { postPort } from '../../utils/fetchMethod'
import { checkToken, depositToken, clearToken } from '../../utils/handleToken'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
let nameData

export default class UserName extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{userName}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => UserName.pressSaveName(navigation)}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{save}</Text>
    </TouchableOpacity>,
  });

  static pressSaveName(navigation) {
    checkToken('drmAppToken')
    .then(async token => {
      let bodyData = {
        name: nameData,
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
      user_name: props.navigation.state.params.user_name,
    }
  }

  onChangeName(user_name) {
    this.setState({ user_name })
    nameData = user_name
  }

  render() {
    return (
      <View style={other.wrap}>
        <TextInput style={other.textInput} 
          value={this.state.user_name} 
          onChangeText={this.onChangeName.bind(this)}
          underlineColorAndroid='transparent' 
          autoCapitalize='none'
        />
      </View>
    )
  }
}