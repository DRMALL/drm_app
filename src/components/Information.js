import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { mainColor, primaryColor, loginBackgroundColor } from '../common/constants'
import { basicDocument, userName, companyName, phoneNumber, postalAddress, securitySetting, resetPassword, personalInformation } from '../common/strings'
import { information } from '../styles'
import TouchIntoText from './units/TouchIntoText'

import UserName from './information/UserName'
import CompanyName from './information/CompanyName'
import Phone from './information/Phone'
import Address from './information/Address'
import ResetPassword from './information/ResetPassword'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')
const emptyIcon = require('../images/navigation_icons/empty.png')

class Information extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: mainColor, alignSelf: 'center' }} >{personalInformation}</Text>,
    headerLeft: <Image onPress={() => 'ox'} style={{marginLeft: 20}} source={gobackWhiteIcon}/>,
    headerRight: <Image onPress={() => 'no'} style={{marginLeft: 20}} source={emptyIcon}/>,rRight: <Image onPress={() => 'no'} style={{marginLeft: 20}} source={emptyIcon}/>,
  }
  render() {
    return (
      <View style={information.wrap}>
        <Text style={information.text} >{basicDocument}</Text>
        <TouchIntoText title={userName} value={'戴永明'} onPress={() => this.props.navigation.navigate('username', {name: 'UserName'})} />
        <TouchIntoText title={companyName} value={'公司名称公司名称公司名称公司名称'} onPress={() => this.props.navigation.navigate('companyname', {name: 'CompanyName'})} />
        <TouchIntoText title={phoneNumber} value={'18888888888'} onPress={() => this.props.navigation.navigate('phone', {name: 'Phone'})} />
        <TouchIntoText title={postalAddress} value={'通讯地址通讯地址通讯'} onPress={() => this.props.navigation.navigate('address', {name: 'Address'})} />
        <Text style={information.text} >{securitySetting}</Text>
        <TouchIntoText title={resetPassword} onPress={() => this.props.navigation.navigate('resetpassword', {name: 'ResetPassword'})} />
      </View>
    )
  }
}

export default StackNavigator({
  information: {
    screen: Information,
  },
  username: {
    screen: UserName,
  },
  companyname: {
    screen: CompanyName,
  },
  phone: {
    screen: Phone,
  },
  address: {
    screen: Address,
  },
  resetpassword: {
    screen: ResetPassword,
  },
})