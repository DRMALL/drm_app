import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { primaryColor, loginBackgroundColor } from '../common/constants'
import { basicDocument, userName, companyName, phoneNumber, postalAddress, securitySetting, resetPassword, personalInformation } from '../common/strings'
import { information } from '../styles'
import TouchIntoText from './units/TouchIntoText'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')
const emptyIcon = require('../images/navigation_icons/empty.png')

export default class Information extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{personalInformation}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <Image style={{marginLeft: 20}} source={emptyIcon}/>,
  });

  constructor(props) {
    super(props)
    this.state = {
      user_name: '',
      company_name: '',
      phone_number: '',
      postal_address: '',
    }
  }
  componentDidMount() {
    return fetch('https://api.wardenger.me/app/user?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Njc0NzdjYjJjYzc0MzJhNDM0OGI4NyIsImlhdCI6MTUwMTUwNjYyN30.8PaoVD9s6ICu2Jfrj4xVBa3zLAOqbjwCkks0d9y4-LM')
    .then((response)=> response.json())
    .then((responseJson)=> {
      let userInfo = responseJson.data
      this.setState({
        user_name: userInfo.name,
        company_name: userInfo.company_name,
        phone_number: userInfo.phone,
        postal_address: userInfo.address,
      })
    })
    .catch((error)=> {
      console.error(error)
    })
  }

  render() {
    return (
      <View style={information.wrap}>
        <Text style={information.text} >{basicDocument}</Text>
        <TouchIntoText title={userName} 
          value={this.state.user_name} 
          activeOpacity={0.6} 
          onPress={() => this.props.navigation.navigate('username', {user_name: this.state.user_name})} 
        />
        <TouchIntoText title={companyName} 
          value={this.state.company_name} 
          activeOpacity={0.6} 
          onPress={() => this.props.navigation.navigate('companyname', {company_name: this.state.company_name})} 
        />
        <TouchIntoText title={phoneNumber} 
          value={this.state.phone_number} 
          activeOpacity={0.6} 
          onPress={() => this.props.navigation.navigate('phone', {phone_number: `${this.state.phone_number}`})} 
        />
        <TouchIntoText title={postalAddress} 
          value={this.state.postal_address} 
          activeOpacity={0.6} 
          onPress={() => this.props.navigation.navigate('address', {postal_address: this.state.postal_address})} 
        />
        <Text style={information.text} >{securitySetting}</Text>
        <TouchIntoText title={resetPassword} 
          activeOpacity={0.6} 
          onPress={() => this.props.navigation.navigate('resetpassword', {name: 'ResetPassword'})} 
        />
      </View>
    )
  }
}