import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View
} from 'react-native'
import store from './utils/store'
import Launching from './components/Launching'
import Routes from './containers/Routes'
import Datagram from './containers/equipment/Datagram'

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }
  
  componentWillUnmount() {

  }

  render() {
    // return <Launching />
    return <Routes />
    // return <Datagram />
  }
}


AppRegistry.registerComponent('drm_app', () => App);
