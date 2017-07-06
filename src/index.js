import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View
} from 'react-native'
import store from './utils/store'
import Launching from './components/Launching'
import Routes from './containers/Routes'

export default class App extends Component {
  render() {
    // return <Launching />
    return <Routes />
  }
}


AppRegistry.registerComponent('drm_app', () => App);
