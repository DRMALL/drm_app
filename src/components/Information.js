import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { primaryColor, loginBackgroundColor } from '../common/constants'
import { basicDocument, userName, companyName, phoneNumber, postalAddress, securitySetting, resetPassword, personalInformation } from '../common/strings'
import { information } from '../styles'
import TouchIntoText from './units/TouchIntoText'
import { checkToken, depositToken, clearToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getInfo } from '../apis'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')
const emptyIcon = require('../images/navigation_icons/empty.png')

export default class Information extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{personalInformation}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.navigate('main')}>
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
    this.getInformation()
  }

  getInformation() {
    checkToken('drmAppToken')
    .then(async token => {
      let res = await getPort(`${getInfo}?token=${token}`)
      if(res.code == 200) {
        this.setState({
          user_name: res.data.name,
          company_name: res.data.company_name,
          phone_number: res.data.phone,
          postal_address: res.data.address,
        })
      }
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