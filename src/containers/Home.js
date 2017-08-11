import React, { Component } from 'react'
import { View, Text, Image, Button, StatusBar } from 'react-native'
import { primaryColor, loginBackgroundColor } from '../common/constants'
import TabBarItem from '../components/units/TabBarItem'
import store from '../utils/store'
import HomeList from '../components/HomeList'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getNews } from '../apis'
import { homeList } from '../utils/virtualData'

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
    this.state = {
      isMounted: false,
      newsListData: {},
    }
  }

  componentDidMount() {
    this.setState({isMounted: true})
    this.getNewsList()
  }

  componentWillUnmount(){
    this.setState({isMounted: false})
  }

  getNewsList() {
    checkToken('drmAppToken')
    .then(async token => {
      let res = await getPort(`${getNews}?token=${token}`)
      if(res.code == 200) {
        if(this.state.isMounted) {
          this.setState({
            newsListData: res.data,
          })
        }
      }
    })
  }

  render() {
    let { newsListData } = this.state
    return(
      <View style={{backgroundColor: loginBackgroundColor}}>
        <StatusBar backgroundColor={primaryColor} />
        <HomeList data={newsListData} {...this.props} />
      </View>
    )
  }
}

