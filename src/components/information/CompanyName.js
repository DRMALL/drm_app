import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { companyName, save } from '../../common/strings'
import { updateInfo } from '../../apis'
import { postPort } from '../../utils/fetchMethod'
import { checkToken, depositToken, clearToken } from '../../utils/handleToken'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')
let companynameData

export default class CompanyName extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{companyName}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => CompanyName.pressSaveCName(navigation)}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{save}</Text>
    </TouchableOpacity>,
  });

  static pressSaveCName(navigation) {
    checkToken('drmAppToken')
    .then(async token => {
      let bodyData = {
        company_name: companynameData,
      }
      let res = await postPort(`${updateInfo}?token=${token}`, bodyData)
      if(!res) {
        Alert.alert('❌错误', 'Internal Server Error',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 201) {
        navigation.navigate('information')
      } else {
        Alert.alert('❌错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      company_name: props.navigation.state.params.company_name,
    }
  }

  onChangeCName(company_name) {
    this.setState({ company_name })
    companynameData = company_name
  }

  cleanText() {
    this.setState({
      company_name: '',
    })
  }

  render() {
    let { company_name } = this.state
    return (
      <View style={other.wrap}>
        <View style={other.inputView}>
          <TextInput style={other.textInput} 
            value={company_name} 
            onChangeText={this.onChangeCName.bind(this)}
            underlineColorAndroid='transparent' 
            autoCapitalize='none'
          />
          {
            company_name != '' ? <TouchableOpacity style={other.cancelTouch} onPress={this.cleanText.bind(this)}>
              <Image style={other.cancelIcon} source={cancelIcon}/>
            </TouchableOpacity> : <Image style={{height: 0}}/>
          }
        </View>
      </View>
    )
  }
}