import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { companyName, save } from '../../common/strings'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')

export default class CompanyName extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{companyName}</Text>,
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
      company_name: props.navigation.state.params.company_name,
    }
  }

  render() {
    return (
      <View style={other.wrap}>
        <TextInput style={other.textInput} 
          value={this.state.company_name} 
          onChangeText={(company_name)=> this.setState({company_name})}
          underlineColorAndroid="transparent" 
        />
      </View>
    )
  }
}