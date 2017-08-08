import React, { Component } from 'react'
import { View, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native'

export default class TextInputImg extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      see: false,
      imgSource: this.props.imgSourceF,
    }
  }
  onPressImg = ()=> {
    this.setState((prevState, props)=> {
      return {
        see: !prevState.see,
        imgSource: !prevState.see ? props.imgSourceT : props.imgSourceF
      }
    })
  };
  render() {
    const { viewStyle, inputStyle, imgStyle, imgSourceT, imgSourceF, placeholder, onChangeText, value, onFocus, onBlur } = this.props
    return (
      <View style={viewStyle}>
        <TextInput 
          style={inputStyle}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={!this.state.see}
          selectTextOnFocus={true}
          blurOnSubmit={true}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={onBlur}
        />
        <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 7 }} onPress={this.onPressImg}>
          <Image 
            style={imgStyle}
            source={this.state.imgSource}
          />
        </TouchableOpacity>
      </View>
    )
  }
}