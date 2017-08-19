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
    seekAC.createPartTypeState(seekPartsData, seekTypesData)
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().seek) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  render() {
    let { seekPartRow, seekTypeRow, topView, secondView } = this.state
      , { openModal } = seekAC
    return(
      <View style={{paddingBottom: 80}}>
        <SeekTab partsData={seekPartsData} typesData={seekTypesData} state={this.state} openModal={openModal} />
        <View style={{height: '100%'}}>
          <View style={[!seekPartRow && !seekTypeRow ? topView : secondView, {height: '100%', paddingBottom: 50}]}>
            <SeekCategory {...this.props} />
          </View>
          <View style={[topView, {height: seekPartRow ? '100%' : 0}]}>
            <SeekPartsColumn partsData={seekPartsData} state={this.state} />
          </View>
          <View style={[topView, {height: seekTypeRow ? '100%' : 0}]}>
            <SeekTypesColumn typesData={seekTypesData} state={this.state} />
          </View>
        </View>
      </View>
    )
  }
}

const SeekPartsColumn = props => {
  let { partsData, state } = props
    , { openModal, pressPartColumn } = seekAC
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
              <Text style={[seek.itemText, state[`partColumn${p}`] ? {color: lightBlueColor} : {}]}>{partItem.parts}</Text>
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
              <Text style={[seek.itemText, state[`typeColumn${t}`] ? {color: lightBlueColor} : {}]}>{typeItem.types}</Text>
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
