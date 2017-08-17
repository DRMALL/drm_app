import React, { Component } from 'react'
import { View, Text, Image, Button, StatusBar } from 'react-native'
import { primaryColor, loginBackgroundColor } from '../common/constants'
import { tokenKey } from '../common/strings'
import TabBarItem from '../components/units/TabBarItem'
import Loading from '../components/units/Loading'
import HomeList from '../components/HomeList'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getNews } from '../apis'
import { homeList } from '../utils/virtualData'

import store from '../utils/store'

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
    this.state = store.getState()
  }

  componentDidMount() {
    this.getNewsList()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState()) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  getNewsList() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getNews}?token=${token}`)
      if(res.code == 200) {
        store.dispatch({
          type: 'HOME_DATA_GET',
          payload: res.data,
        })
      }
    })
  }

  render() {
    let { newsListData } = this.state.home
    if(!newsListData) return <Loading animating={!newsListData ? true : false}/>
    return(
      <View style={{backgroundColor: loginBackgroundColor}}>
        <StatusBar backgroundColor={primaryColor} />
        <HomeList data={newsListData} {...this.props} />
      </View>
    )
  }
}

