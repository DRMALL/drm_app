import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import TabBarItem from '../components/units/TabBarItem'
import DeviceCategory from '../components/DeviceCategory'
import deviceLoadMore from '../actions/deviceLoadMore'
import store from '../utils/store'


const deviceIconSelected = require('../images/tabbar_icons/tabbar_archives_selected.png')
    , deviceIconNormal = require('../images/tabbar_icons/tabbar_archives_normal.png')

export default class Device extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => (
      <TabBarItem
        tintColor={tintColor}
        focused={focused}
        normalImage={deviceIconNormal}
        selectedImage={deviceIconSelected}
      />
    )
  })

  constructor(props) {
    super(props)
    this.state = store.getState().device
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().device) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  onScroll(e) {
    const { isLoading, allDevicesData, allDevicesDataMeta } = store.getState().device
    if (isLoading) return

    if (allDevicesDataMeta.offset >= allDevicesDataMeta.count) return

    let y = e.nativeEvent.contentOffset.y
    let height = e.nativeEvent.layoutMeasurement.height
    let contentHeight = e.nativeEvent.contentSize.height

    if(y+height>=contentHeight-20){
      deviceLoadMore()
    }
  }

  render() {
    return(
      <View style={{paddingBottom: 100}}>
        <DeviceCategory {...this.props} onScroll={this.onScroll.bind(this)}/>
      </View>
    )
  }
}
