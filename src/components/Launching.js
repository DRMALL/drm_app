import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { drmOne, drmTwo, drmThree } from '../common/strings'
import { launch } from '../styles'

const loadingScreenLogo = require('../images/loading_screen_logo.png')

export default (props) => {
  return (
    <View style={launch.wrap}>
      <Image style={launch.image} source={loadingScreenLogo}/>
      <Text style={launch.text}>{drmOne}</Text>
      <Text style={launch.text}>{drmTwo}</Text>
      <Text style={[launch.text, {lineHeight: 50}]}>{drmThree}</Text>
    </View>
  )
}
