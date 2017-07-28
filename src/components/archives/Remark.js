import React, { Component }from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { primaryColor, mainColor, subTitleColor } from '../../common/constants'
import { editDeviceRemarks, cancel, confirm, remarkPlaceholder } from '../../common/strings'

export default class Remark extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: mainColor, alignSelf: 'center' }}>{editDeviceRemarks}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 15}} onPress={() => navigation.goBack()}>
      <Text style={{ fontSize: 15, color: mainColor}}>{cancel}</Text>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => alert('ok')}>
      <Text style={{ fontSize: 15, color: mainColor}}>{confirm}</Text>
    </TouchableOpacity>,
  })
  render() {
    return (
      <View style={{height: '100%', backgroundColor: mainColor}}>
        <TextInput 
          style={{textAlignVertical: 'top', fontSize: 16, paddingHorizontal: 16, paddingTop: 20}} 
          placeholder={remarkPlaceholder} 
          placeholderTextColor={subTitleColor}
          multiline={true} 
          numberOfLines={50} 
          underlineColorAndroid="transparent" 
          onChange={()=> 'onChange'} 
          // onSelectionChange={()=> 'onSelectionChange'} 
        />
      </View>
    )
  }
}

// <KeyboardAvoidingView behavior={'padding'} >
        // </KeyboardAvoidingView>
