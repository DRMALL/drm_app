import React, { Component }from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { primaryColor, mainColor, subTitleColor } from '../../common/constants'
import { editDeviceRemarks, cancel, confirm, remarkPlaceholder, tokenKey, homeLabel, deviceLabel, internalServerError } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { postPort } from '../../utils/fetchMethod'
import { postDeviceRemark } from '../../apis'

export default class Remark extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: mainColor, alignSelf: 'center' }}>{editDeviceRemarks}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 15}} onPress={() => navigation.goBack()}>
      <Text style={{ fontSize: 15, color: mainColor}}>{cancel}</Text>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => navigation.state.params.postRemark()}>
      <Text style={{ fontSize: 15, color: mainColor}}>{confirm}</Text>
    </TouchableOpacity>,
  });

  constructor(props) {
    super(props)
    this.state = {
      device_remark: props.navigation.state.params.orgDeviceRemark,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      postRemark: this.postRemark.bind(this),
    })
  }

  postRemark() {
    checkToken(tokenKey)
    .then(async token => {
      let { navigation } = this.props
      let bodyData = {
        deviceId: navigation.state.params.deviceId,
        remark: this.state.device_remark,
      }
      let res = await postPort(`${postDeviceRemark}?token=${token}`, bodyData)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 201) {
        navigation.goBack()
        // const resetAction = NavigationActions.reset({
        //   index: 2,
        //   actions: [
        //     NavigationActions.navigate({ 
        //       routeName: 'main', 
        //       params: {},
        //       action: NavigationActions.navigate({ routeName: homeLabel}),
        //     }),
        //     NavigationActions.navigate({ 
        //       routeName: 'detail', 
        //       params: {
        //         deviceId: navigation.state.params.deviceId, 
        //       }, 
        //     }),
        //   ]
        // })
        // const resetAction = NavigationActions.navigate({
        //     routeName: 'detail',
        //     params: {
        //       deviceId: navigation.state.params.deviceId, 
        //     }, 
        //     action: NavigationActions.navigate({ routeName: 'detail'})               
        // })
        //navigation.dispatch(resetAction)
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  onChangeRemark(device_remark) {
    this.setState({ device_remark })
  }

  render() {
    return (
      <View style={{height: '100%', backgroundColor: mainColor}}>
        <StatusBar hidden={false} backgroundColor={primaryColor} barStyle='light-content'/>
        <TextInput 
          style={{textAlignVertical: 'top', fontSize: 16, paddingHorizontal: 16, paddingTop: 20, height: '100%'}} 
          placeholder={remarkPlaceholder} 
          placeholderTextColor={subTitleColor}
          multiline={true} 
          numberOfLines={50} 
          underlineColorAndroid='transparent' 
          autoCapitalize='none'
          value={this.state.device_remark}
          onChangeText={this.onChangeRemark.bind(this)} 
          // onSelectionChange={()=> 'onSelectionChange'} 
        />
      </View>
    )
  }
}
