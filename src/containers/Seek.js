import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import TabBarItem from '../components/units/TabBarItem'
import SeekCategory from '../components/SeekCategory'
import SeekTab from '../components/units/SeekTab'
import { lightBlueColor, contentColor } from '../common/constants'
import { allParts, allTypes } from '../common/strings'
import { seek } from '../styles'
import { seekPartsData, seekTypesData } from '../utils/virtualData'

import store from '../utils/store'
import seekAC from '../actions/seekAC'
import getAllPartsData from '../funcs/seek/getAllPartsData'
import getFirstPartData from '../funcs/seek/getFirstPartData'
import getSecondPartData from '../funcs/seek/getSecondPartData'

const seekIconSelected = require('../images/tabbar_icons/tabbar_search_selected_x.png')
    , seekIconNormal = require('../images/tabbar_icons/tabbar_search_normal.png')

export default class Seek extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => (
      <TabBarItem
        tintColor={tintColor}
        focused={focused}
        normalImage={seekIconNormal} 
        selectedImage={seekIconSelected} 
      />
    )
  });
  constructor(props) {
    super(props)
    this.state = store.getState().seek
  }

  componentDidMount() {
    //getAllPartsData()
    getFirstPartData().then((seekFirstData)=> {
      seekAC.createPartTypeState(seekFirstData, [])
    })
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().seek) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  onSeekRefresh() {
    seekAC.isRefresh()
    // this.getNewsList()
    setTimeout(() => {
      seekAC.isnotRefresh()
    }, 2000)
  }

  render() {
    let { seekPartRow, seekTypeRow, topView, secondView, isRefreshing, 
          seekPartsFirstData, seekTypesSecondData, allSeekPartData 
        } = this.state
      , { openModal } = seekAC

    return(
      <View style={{paddingBottom: 80}}>
        <SeekTab state={this.state} openModal={openModal} />
        <View style={{height: '100%'}}>
          <View style={[!seekPartRow && !seekTypeRow ? topView : secondView, {height: '100%', paddingBottom: 50}]}>
            <SeekCategory isRefreshing={isRefreshing} allSeekData={allSeekPartData} onSeekRefresh={this.onSeekRefresh.bind(this)} {...this.props} />
          </View>
          <View style={[topView, {height: seekPartRow ? '100%' : 0}]}>
            <SeekPartsColumn partsData={seekPartsFirstData} state={this.state} />
          </View>
          <View style={[topView, {height: seekTypeRow ? '100%' : 0}]}>
            <SeekTypesColumn typesData={seekTypesSecondData} state={this.state} />
          </View>
        </View>
      </View>
    )
  }
}

const SeekPartsColumn = props => {
  let { partsData, state } = props
    , { openModal, pressPartColumn } = seekAC

  partsData[0] && partsData[0].name != allParts && partsData.unshift({name: allParts})

  return (
    <View style={{height: '100%'}}>
      <View style={seek.dataColumnView}>
        <ScrollView>
          {
            partsData.map((partItem, p)=> <TouchableOpacity key={p} 
              style={seek.itemTouch} 
              activeOpacity={0.8}
              onPress={()=> pressPartColumn(p, partsData)}
            >
              <Text style={[seek.itemText, state[`partColumn${p}`] ? {color: lightBlueColor} : {}]}>{partItem.name}</Text>
            </TouchableOpacity>)
          }
        </ScrollView>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={()=> openModal('seekPartRow')}>
        <View style={seek.halfOpacityView}/>
      </TouchableOpacity>
    </View>
  )
}

const SeekTypesColumn = props => {
  let { typesData, state } = props
    , { openModal, pressTypeColumn } = seekAC  

  return (
    <View style={{height: '100%'}}>
      <View style={seek.dataColumnView}>
        <ScrollView>
          {
            typesData.map((typeItem, t)=> <TouchableOpacity key={t} 
              style={seek.itemTouch} 
              activeOpacity={0.8}
              onPress={()=> pressTypeColumn(t, typesData)}
            >
              <Text style={[seek.itemText, state[`typeColumn${t}`] ? {color: lightBlueColor} : {}]}>{typeItem.model}</Text>
            </TouchableOpacity>)
          }
        </ScrollView>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={()=> openModal('seekTypeRow')}>
        <View style={seek.halfOpacityView}/>
      </TouchableOpacity>
    </View>
  )
}
