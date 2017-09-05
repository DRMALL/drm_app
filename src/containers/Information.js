import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { primaryColor, loginBackgroundColor } from '../common/constants'
import { basicDocument, 
        userName, 
        companyName, 
        phoneNumber, 
        postalAddress, 
        securitySetting, 
        resetPassword, 
        personalInformation, 
        tokenKey,
        logOut,
        internalServerError,
} from '../common/strings'
import { information } from '../styles'
import TouchIntoText from '../components/units/TouchIntoText'
import Button from '../components/units/Button'

import store from '../utils/store'
import infoAC from '../actions/infoAC'
import getInformation from '../funcs/information/getInformation'
import confirmLogOut from '../funcs/information/confirmLogOut'
import pressLogOut from '../funcs/information/pressLogOut'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')
const emptyIcon = require('../images/navigation_icons/empty.png')

export default class Information extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{personalInformation}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} 
      onPress={() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'main', params: { msgRedShow: navigation.state.params.recordMsgRed } }),
          ]
        })
        navigation.state.params.recordMsgRed ? navigation.dispatch(resetAction) : navigation.goBack()
      }}
    >
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <Image style={{marginLeft: 20}} source={emptyIcon}/>,
  });

  constructor(props) {
    super(props)
    this.state = store.getState().information
  }
  componentDidMount() {
    getInformation()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().information) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  render() {
    let { user_name, company_name, phone_number, postal_address } = this.state
      , { navigation } = this.props
      , { recordMsgRed } = navigation.state.params
    return (
      <View style={information.wrap}>
        <Text style={information.text} >{basicDocument}</Text>
        <TouchIntoText title={userName} 
          value={user_name === 'null' ? '' : user_name} 
          activeOpacity={0.6} 
          onPress={() => navigation.navigate('username', { user_name: user_name, infoRecordMsgRed: recordMsgRed })} 
        />
        <TouchIntoText title={companyName} 
          value={company_name === 'null' || company_name === 'undefined' ? '' : company_name} 
          activeOpacity={0.6} 
          onPress={() => navigation.navigate('companyname', { company_name: company_name, infoRecordMsgRed: recordMsgRed })} 
        />
        <TouchIntoText title={phoneNumber} 
          value={phone_number} 
          activeOpacity={0.6} 
          onPress={() => navigation.navigate('phone', { phone_number: `${phone_number}`, infoRecordMsgRed: recordMsgRed })} 
        />
        <TouchIntoText title={postalAddress} 
          value={postal_address === 'null' || postal_address === 'undefined' ? '' : postal_address} 
          activeOpacity={0.6} 
          onPress={() => navigation.navigate('address', { postal_address: postal_address, infoRecordMsgRed: recordMsgRed })} 
        />
        <Text style={information.text} >{securitySetting}</Text>
        <TouchIntoText title={resetPassword} 
          activeOpacity={0.6} 
          onPress={() => navigation.navigate('resetpassword', {name: 'ResetPassword'})} 
        />
        <View style={{alignItems: 'center'}}>
          <Button title={logOut} 
            titleStyle={information.buttonText} 
            style={information.buttonView} 
            activeOpacity={0.8}
            onPress={()=> pressLogOut(this.props)}
          />
        </View>
      </View>
    )
  }
}