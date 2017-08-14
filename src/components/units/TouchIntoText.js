import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { touchIntoText } from '../../styles'

const intoIcon = require('../../images/navigation_icons/into.png')

export default class TouchIntoText extends Component {
  render() {
    const { title, value, onPress, activeOpacity, numberOfLines } = this.props
    return (
      <View style= {touchIntoText.wrap}>
        <TouchableOpacity style={touchIntoText.touchable} onPress={onPress} activeOpacity={activeOpacity}>
          <Text style={touchIntoText.textkey}>{title}</Text>
          <Text style={touchIntoText.textvalue} numberOfLines={2}>{value}</Text>
          <Image style={touchIntoText.image} source={intoIcon} />
        </TouchableOpacity>
      </View>
    )
  }
}