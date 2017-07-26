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
  })
  render() {
    return (
      <View style={information.wrap}>
        <Text style={information.text} >{basicDocument}</Text>
        <TouchIntoText title={userName} value={'戴永明'} activeOpacity={0.6} onPress={() => this.props.navigation.navigate('username', {name: 'UserName'})} />
        <TouchIntoText title={companyName} value={'公司名称公司名称公司名称公司名称'} activeOpacity={0.6} onPress={() => this.props.navigation.navigate('companyname', {name: 'CompanyName'})} />
        <TouchIntoText title={phoneNumber} value={'18888888888'} activeOpacity={0.6} onPress={() => this.props.navigation.navigate('phone', {name: 'Phone'})} />
        <TouchIntoText title={postalAddress} value={'通讯地址通讯地址通讯'} activeOpacity={0.6} onPress={() => this.props.navigation.navigate('address', {name: 'Address'})} />
        <Text style={information.text} >{securitySetting}</Text>
        <TouchIntoText title={resetPassword} activeOpacity={0.6} onPress={() => this.props.navigation.navigate('resetpassword', {name: 'ResetPassword'})} />
      </View>
    )
  }
}