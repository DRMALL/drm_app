import React, { Component }from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { primaryColor, mainColor, subTitleColor } from '../../common/constants'
import { pushOrder, cancel, publish, pushOrderPlaceholder1, pushOrderPlaceholder2 } from '../../common/strings'
import { pushOrderS } from '../../styles'

export default class PushOrder extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{pushOrder}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 15}} onPress={() => navigation.goBack()}>
     <Text style={{ fontSize: 15, color: '#FFF'}} >{cancel}</Text>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => alert('ok')}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{publish}</Text>
    </TouchableOpacity>,
  })

  render() {
    return (
      <View style={pushOrderS.wrap}>
        <TextInput 
          style={pushOrderS.textInput}
          placeholder={pushOrderPlaceholder1} 
          placeholderTextColor={subTitleColor}
          underlineColorAndroid="transparent"
          onChangeText={(text)=> 'this.setState({})'}
          selectTextOnFocus={true}
        />
        <View style={pushOrderS.empty}/>
        <TextInput 
          style={[pushOrderS.textInput, {marginTop: 15}]}
          placeholder={pushOrderPlaceholder2} 
          placeholderTextColor={subTitleColor}
          multiline={true} 
          numberOfLines={50} 
          underlineColorAndroid="transparent"
          onChangeText={(text)=> 'this.setState({})'}
          selectTextOnFocus={true}
        />
      </View>
    )
  }
}