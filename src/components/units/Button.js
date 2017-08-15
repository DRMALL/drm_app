import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class Button extends Component {
  render() {
    const { title, titleStyle, style, delayPressIn, delayPressOut, onPressIn, onPressOut, onPress, activeOpacity, disabled } = this.props
    return (
      <TouchableOpacity style={style} delayPressIn={delayPressIn} delayPressOut={delayPressOut} onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress} disabled={disabled} activeOpacity={activeOpacity}>
        <Text style={titleStyle}>{title}</Text>
      </TouchableOpacity>
    )
  }
}