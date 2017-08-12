import React, { Component } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { other } from '../../styles'

export default class Loading extends Component {
  render() {
    let { animating, color } = this.props
    return (
      <ScrollView>
        <View style={other.loadingView}>
          <ActivityIndicator
            animating={animating}
            color={color}
            style={other.activityInd}
            size='large'
          />
          <Text style={other.loadingText}>加载中...</Text>
        </View>
      </ScrollView>
    )
  }
}