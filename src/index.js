import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View
} from 'react-native'
import store from './utils/store'
import Launching from './components/Launching'
import Routes from './containers/Routes'
import ShareModal from './components/units/ShareModal'

export default class App extends Component {
  constructor() {
    super()
  }

  componentDidMount() {

  }
  
  componentWillUnmount() {

  }

  render() {
    // return <Launching />
    return <Routes />
    // return <ShareModal />
  }
}


AppRegistry.registerComponent('drm_app', () => App);
