import React, { Component } from 'react'
import { View, Text, Image, Button, StatusBar } from 'react-native'
import { primaryColor, loginBackgroundColor } from '../common/constants'
import TabBarItem from '../components/units/TabBarItem'
import Loading from '../components/units/Loading'
import HomeList from '../components/HomeList'

import store from '../utils/store'
import homeDetailAC from '../actions/homeDetailAC'
import deviceAC from '../actions/deviceAC'
import getNewsList from '../funcs/home/getNewsList'
import homeLoadMore from '../actions/homeLoadMore'

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
    getNewsList(this.props.navigation)
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().home) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  async onHomeRefresh() {
    homeDetailAC.isRefresh()
    await getNewsList(this.props.navigation)
    homeDetailAC.isnotRefresh()
  }

  onScroll(e) {
    const { isLoading, newsListData, newsListDataMeta } = store.getState().home
    if (isLoading) return

    if (newsListDataMeta.offset >= newsListDataMeta.count) return

    let y = e.nativeEvent.contentOffset.y
    let height = e.nativeEvent.layoutMeasurement.height
    let contentHeight = e.nativeEvent.contentSize.height

    if(y+height>=contentHeight-20){
      homeLoadMore()
    }
  }

  render() {
    let { newsListData, isRefreshing, isLoading } = this.state
    if(!newsListData) return <Loading animating={!newsListData ? true : false}/>
    return(
      <View style={{backgroundColor: loginBackgroundColor, height: '100%'}}>
        <StatusBar hidden={false} backgroundColor={primaryColor} barStyle='light-content'/>
        <View>
          <HomeList data={newsListData} isRefreshing={isRefreshing} isLoading={isLoading} onHomeRefresh={this.onHomeRefresh.bind(this)} onScroll={this.onScroll.bind(this)} {...this.props} />
        </View>
      </View>
    )
  }
}
