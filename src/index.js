import store from './utils/store'
import Launching from './components/Launching'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class App extends Component {
  render() {
    return <Launching />
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.welcome}>
    //       Hi I aooxx222221
    //     </Text>
    //   </View>
    // )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('drm_app', () => App);
