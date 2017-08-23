import React, { Component } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { other } from '../../styles'

export default class Loading extends Component {
  render() {
    let { animating, color } = this.props
    return (
      <View style={other.loadingView2}>
        <ActivityIndicator
          animating={animating}
          color={color}
          style={other.activityInd2}
          size='large'
        />
      </View>
    )
  }
}