import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { primaryColor } from '../../common/constants'
import { statusTab } from '../../styles'

export default class StatusTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textStyle1: {color: primaryColor},
      textStyle2: {},
      textStyle3: {},
      vuStyle1: statusTab.vuline,
      vuStyle2: statusTab.vunoline,
      vuStyle3: statusTab.vunoline,
    }
  }
  pressAllStatus = ()=> {
    this.setState((prevState) => {
      return {
        textStyle1: {color: primaryColor},
        textStyle2: {},
        textStyle3: {},
        vuStyle1: statusTab.vuline,
        vuStyle2: statusTab.vunoline,
        vuStyle3: statusTab.vunoline,
      }
    })
  };
  pressOnLine = ()=> {
    this.setState((prevState) => {
      return {
        textStyle1: {},
        textStyle2: {color: primaryColor},
        textStyle3: {},
        vuStyle1: statusTab.vunoline,
        vuStyle2: statusTab.vuline,
        vuStyle3: statusTab.vunoline,
      }
    })
  };
  pressOffLine = ()=> {
    this.setState((prevState) => {
      return {
        textStyle1: {},
        textStyle2: {},
        textStyle3: {color: primaryColor},
        vuStyle1: statusTab.vunoline,
        vuStyle2: statusTab.vunoline,
        vuStyle3: statusTab.vuline,
      }
    })
  };
  render() {
    return(
      <View style={statusTab.wrap}>
        <TouchableOpacity style={statusTab.touchHighlignt} onPress={this.pressAllStatus} activeOpacity={0.9}>
          <Text style={[statusTab.text, this.state.textStyle1]}>全部</Text>
          <View style={this.state.vuStyle1} />
        </TouchableOpacity>
        <TouchableOpacity style={statusTab.touchHighlignt} onPress={this.pressOnLine} activeOpacity={0.9}>
          <Text style={[statusTab.text, this.state.textStyle2]}>在线</Text>
          <View style={this.state.vuStyle2} />
        </TouchableOpacity>
        <TouchableOpacity style={statusTab.touchHighlignt} onPress={this.pressOffLine} activeOpacity={0.9}>
          <Text style={[statusTab.text, this.state.textStyle3]}>离线</Text>
          <View style={this.state.vuStyle3} />
        </TouchableOpacity>
      </View>
    )
  }
}