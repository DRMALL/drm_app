import React, { Component }from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native'
import { primaryColor, mainColor, subTitleColor } from '../../common/constants'
import { editDeviceRemarks, cancel, confirm, remarkPlaceholder, tokenKey } from '../../common/strings'
import { checkToken } from '../../utils/handleToken'
import { postPort } from '../../utils/fetchMethod'
import { postDeviceRemark } from '../../apis'

let remarkData

export default class Remark extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: mainColor, alignSelf: 'center' }}>{editDeviceRemarks}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 15}} onPress={() => navigation.goBack()}>
      <Text style={{ fontSize: 15, color: mainColor}}>{cancel}</Text>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => Remark.postRemark(navigation)}>
      <Text style={{ fontSize: 15, color: mainColor}}>{confirm}</Text>
    </TouchableOpacity>,
  });

  static postRemark(navigation) {
    checkToken(tokenKey)
    .then(async token => {
      let bodyData = {
        deviceId: navigation.state.params.deviceId,
        remark: remarkData,
      }
      let res = await postPort(`${postDeviceRemark}?token=${token}`, bodyData)
      if(!res) {
        alert('result is null')
      } else if(res.code == 201) {
        navigation.goBack() //.navigate('detail', {deviceId: bodyData.deviceId})
      } else alert(JSON.stringify(res))
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      device_remark: props.navigation.state.params.orgDeviceRemark,
    }
  }

  onChangeRemark(device_remark) {
    this.setState({ device_remark })
    remarkData = device_remark
  }

  render() {
    return (
      <View style={{height: '100%', backgroundColor: mainColor}}>
        <StatusBar backgroundColor={primaryColor} />
        <TextInput 
          style={{textAlignVertical: 'top', fontSize: 16, paddingHorizontal: 16, paddingTop: 20}} 
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
