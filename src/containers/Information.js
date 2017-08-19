import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, Alert } from 'react-native'
import { StackNavigator } from 'react-navigation'
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
} from '../common/strings'
import { information } from '../styles'
import TouchIntoText from '../components/units/TouchIntoText'
import { checkToken, depositToken, clearToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getInfo } from '../apis'

import store from '../utils/store'
import infoAC from '../actions/infoAC'

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
    this.state = store.getState().information
  }
  componentDidMount() {
    this.getInformation()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().information) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  getInformation() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getInfo}?token=${token}`)
      if(!res) {
        Alert.alert('❌错误', 'Internal Server Error',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        infoAC.getInfomationData({
          user_name: res.data.name,
          company_name: res.data.company_name,
          phone_number: res.data.phone,
          postal_address: res.data.address,
        })
      } else if(res.code == 404) {
        Alert.alert('❌错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else {
        Alert.alert('❌错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  render() {
    let { user_name, company_name, phone_number, postal_address } = this.state
      , { navigation } = this.props
    return (
      <View style={information.wrap}>
        <Text style={information.text} >{basicDocument}</Text>
        <TouchIntoText title={userName} 
          value={user_name} 
          activeOpacity={0.6} 
          onPress={() => navigation.navigate('username', {user_name: user_name})} 
        />
        <TouchIntoText title={companyName} 
          value={company_name} 
          activeOpacity={0.6} 
          onPress={() => navigation.navigate('companyname', {company_name: company_name})} 
        />
        <TouchIntoText title={phoneNumber} 
          value={phone_number} 
          activeOpacity={0.6} 
          onPress={() => navigation.navigate('phone', {phone_number: `${phone_number}`})} 
        />
        <TouchIntoText title={postalAddress} 
          value={postal_address} 
          activeOpacity={0.6} 
          onPress={() => navigation.navigate('address', {postal_address: postal_address})} 
        />
        <Text style={information.text} >{securitySetting}</Text>
        <TouchIntoText title={resetPassword} 
          activeOpacity={0.6} 
          onPress={() => navigation.navigate('resetpassword', {name: 'ResetPassword'})} 
        />
      </View>
    )
  }
}