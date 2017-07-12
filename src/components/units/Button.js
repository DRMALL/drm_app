import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class Button extends Component {
  render() {
    const { title, titleStyle, style, onPress, activeOpacity } = this.props
    return (
      <View>
        <TouchableOpacity style={style} onPress={onPress} activeOpacity={activeOpacity}>
          <Text style={titleStyle}>{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}