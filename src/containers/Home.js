import React, { Component } from 'react'
import { View, Text, Image, Button, StatusBar, Alert } from 'react-native'
import { primaryColor, loginBackgroundColor } from '../common/constants'
import { tokenKey, internalServerError } from '../common/strings'
import TabBarItem from '../components/units/TabBarItem'
import Loading from '../components/units/Loading'
import HomeList from '../components/HomeList'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getNews } from '../apis'
import { homeList } from '../utils/virtualData'

import store from '../utils/store'
import getHomeData from '../actions/getHomeData'
import homeDetailAC from '../actions/homeDetailAC'

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
    this.getNewsList()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().home) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  getNewsList() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getNews}?token=${token}`)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        getHomeData(res.data)
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
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

