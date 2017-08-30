import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import { other } from '../../styles'
import { primaryColor } from '../../common/constants'
import { companyName, save, tokenKey, internalServerError } from '../../common/strings'
import replaced from '../../funcs/replace'
import { updateInfo } from '../../apis'
import { postPort } from '../../utils/fetchMethod'
import { checkToken, depositToken, clearToken } from '../../utils/handleToken'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')

export default class CompanyName extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{companyName}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => navigation.state.params.pressSaveCName()}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{save}</Text>
    </TouchableOpacity>,
  });

  constructor(props) {
    super(props)
    let { company_name } = props.navigation.state.params
    this.state = {
      company_name: company_name === 'null' || company_name === 'undefined' ? '' : replaced.trim(company_name),
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({  
      pressSaveCName: () => this.pressSaveCName(), 
    })
  }

  pressSaveCName() {
    checkToken(tokenKey)
    .then(async token => {
      let bodyData = {
        company_name: replaced.trim(this.state.company_name),
      }
      if(bodyData.company_name === '' || bodyData.company_name === 'null') {
        return Alert.alert('错误', '公司名称不能为空',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
      let res = await postPort(`${updateInfo}?token=${token}`, bodyData)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 201) {
        this.props.navigation.navigate('information')
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  onChangeCName(company_name) {
    this.setState({ company_name })
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