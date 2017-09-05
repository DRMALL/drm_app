import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { other, search } from '../../styles'
import { primaryColor } from '../../common/constants'
import { userName, save, tokenKey, internalServerError } from '../../common/strings'
import replaced from '../../funcs/replace'
import { updateInfo } from '../../apis'
import { postPort } from '../../utils/fetchMethod'
import { checkToken, depositToken, clearToken } from '../../utils/handleToken'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')

export default class UserName extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{userName}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => navigation.state.params.pressSaveName()}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{save}</Text>
    </TouchableOpacity>,
  });

  constructor(props) {
    super(props)
    let { user_name } = props.navigation.state.params
    this.state = {
      user_name: user_name === 'null' ? '' : replaced.trim(user_name),
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({  
      pressSaveName: () => this.pressSaveName(), 
    })
  }

  pressSaveName() {
    let { infoRecordMsgRed } = this.props.navigation.state.params
    const illCharRE = /[`~!@#$%^&*+<>?:"{},.\/;'[\]\\|]/im
    checkToken(tokenKey)
    .then(async token => {
      let bodyData = {
        name: replaced.trim(this.state.user_name),
      }
      if(bodyData.name === '' || bodyData.name === 'null') {
        return Alert.alert('错误', '用户名不能为空',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(illCharRE.test(bodyData.name)) {
        return Alert.alert('错误', '用户名含非法字符',
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
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ 
              routeName: 'main',
              params: {
                msgRedShow: infoRecordMsgRed, 
              },
            }),
            NavigationActions.navigate({ 
              routeName: 'information', 
              params: {
                recordMsgRed: infoRecordMsgRed,
              },
            }),
          ]
        })
        this.props.navigation.dispatch(resetAction)
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  onChangeName(user_name) {
    this.setState({ user_name })
  }

  cleanText() {
    this.setState({
      user_name: '',
    })
  }

  render() {
    let { user_name } = this.state
    return (
      <View style={other.wrap}>
        <View style={other.inputView}>
          <TextInput style={other.textInput} 
            value={user_name} 
            onChangeText={this.onChangeName.bind(this)}
            underlineColorAndroid='transparent' 
            autoCapitalize='none'
          />
          {
            user_name != '' ? <TouchableOpacity style={other.cancelTouch} onPress={this.cleanText.bind(this)}>
              <Image style={other.cancelIcon} source={cancelIcon}/>
            </TouchableOpacity> : <Image style={{height: 0}}/>
          }
        </View>
      </View>
    )
  }
}