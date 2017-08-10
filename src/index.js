import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View
} from 'react-native'
import store from './utils/store'
import Launching from './components/Launching'
import Routes from './containers/Routes'
import UploadImage from './components/archives/UploadImage'

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
    // return <UploadImage />
  }
}


AppRegistry.registerComponent('drm_app', () => App);
