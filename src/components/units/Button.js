import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class Button extends Component {
  render() {
    const { title, titleStyle, style, delayPressIn, delayPressOut, onPressIn, onPressOut, onPress, activeOpacity, accessible } = this.props
    return (
      <View>
        <TouchableOpacity style={style} delayPressIn={delayPressIn} delayPressOut={delayPressOut} onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress} activeOpacity={activeOpacity}>
          <Text style={titleStyle}>{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}