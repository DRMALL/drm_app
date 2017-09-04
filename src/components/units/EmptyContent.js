import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { other } from '../../styles'

export default class EmptyContent extends Component {
  render() {
    let { animating, color } = this.props
    return (
      <View style={other.emptyView}>
        <Text style={other.emptyText}>暂无内容</Text>
      </View>
    )
  }
}