import React, { Component } from 'react'
import { View, Text, Image, Button, StatusBar } from 'react-native'
import { primaryColor, loginBackgroundColor } from '../common/constants'
import TabBarItem from '../components/units/TabBarItem'
import Loading from '../components/units/Loading'
import HomeList from '../components/HomeList'

import store from '../utils/store'
import homeDetailAC from '../actions/homeDetailAC'
import getNewsList from '../funcs/home/getNewsList'

const homeIconSelected = require('../images/tabbar_icons/tabbar_home_selected.png')
    , homeIconNormal = require('../images/tabbar_icons/tabbar_home_normal.png')

export default class Home extends Component {
  static navigationOptions = (props) => ({
    tabBarIcon: ({ focused, tintColor }) => (
      <TabBarItem
        tintColor={tintColor}
        focused={focused}
        normalImage={homeIconNormal} 
        selectedImage={homeIconSelected} 
      />
    )
  });

  constructor(props) {
    super(props)
    this.state = store.getState().home
  }

  componentDidMount() {
    getNewsList()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().home) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  onHomeRefresh() {
    homeDetailAC.isRefresh()
    this.getNewsList()
    setTimeout(() => {
      homeDetailAC.isnotRefresh()
    }, 2000)
  }

  render() {
    let { newsListData, isRefreshing } = this.state
    if(!newsListData) return <Loading animating={!newsListData ? true : false}/>
    return(
      <View style={{backgroundColor: loginBackgroundColor}}>
        <StatusBar hidden={false} backgroundColor={primaryColor} barStyle='light-content'/>
        <View>
          <HomeList data={newsListData} isRefreshing={isRefreshing} onHomeRefresh={this.onHomeRefresh.bind(this)} {...this.props} />
        </View>
      </View>
    )
  }
}

