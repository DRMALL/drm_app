import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View
} from 'react-native'
import store from './utils/store'
import Launching from './components/Launching'
import Routes from './containers/Routes'
import HomeDetail from './components/HomeDetail'

export default class App extends Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
      console.log('active', store.getState().home)
    })
  }
  
  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    // return <Launching />
    return <Routes screenProps={this.state}/>
    // return <HomeDetail />
  }
}


AppRegistry.registerComponent('drm_app', () => App);
