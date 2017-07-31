import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import TabBarItem from '../components/units/TabBarItem'
import SeekCategory from '../components/SeekCategory'
import SeekTab from '../components/units/SeekTab'
import { lightBlueColor, contentColor } from '../common/constants'
import { allParts, allTypes } from '../common/strings'
import { seek } from '../styles'
import { seekPartsData, seekTypesData } from '../utils/virtualData'

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
    this.state = (props => {
      let seekStateObj = {
        seekPartRow: false,
        seekTypeRow: false,
        selectedPart: allParts,
        selectedType: allTypes,
        topView: {position: 'relative', zIndex: 3},
        secondView: {position: 'absolute', zIndex: 2},
      }
      seekPartsData.map((partItem, indexp)=> {
        seekStateObj[`partColumn${indexp}`] = false
      })

      seekTypesData.map((typeItem, indext)=> {
        seekStateObj[`typeColumn${indext}`] = false
      })
      return seekStateObj
    })(props)
  }

  openModal(which) {
    this.setState({
      seekPartRow: which == 'seekPartRow' ? !this.state.seekPartRow : false,
      seekTypeRow: which == 'seekTypeRow' ? !this.state.seekTypeRow : false,
    })
  }

  pressPartColumn(p) {
    let partColumnOne = !this.state[`partColumn${p}`]
    seekPartsData.map((partItem, index)=> {
      if(p == index) {
        this.setState({
          selectedPart: partColumnOne ? partItem.parts : allParts,
          [`partColumn${p}`]: partColumnOne,
        })
      }
      else this.setState({[`partColumn${index}`]: false})
    })
  }

  pressTypeColumn(t) {
    let typeColumnOne = !this.state[`typeColumn${t}`]
    seekTypesData.map((typeItem, index)=> {
      if(t == index) {
        this.setState({
          selectedType: typeColumnOne ? typeItem.types : allTypes,
          [`typeColumn${t}`]: typeColumnOne,
        })
      }
      else this.setState({[`typeColumn${index}`]: false})
    })
  }

  render() {
    let selectPartRow = this.state.seekPartRow
      , selectTypeRow = this.state.seekTypeRow
      , topView = this.state.topView
      , secondView = this.state.secondView
    return(
      <View style={{paddingBottom: 80}}>
        <SeekTab partsData={seekPartsData} typesData={seekTypesData} state={this.state} openModal={this.openModal.bind(this)} />
        <View style={{height: '100%'}}>
          <View style={[!selectPartRow && !selectTypeRow ? topView : secondView, {height: '100%', paddingBottom: 50}]}>
            <SeekCategory {...this.props} />
          </View>
          <View style={[topView, {height: selectPartRow ? '100%' : 0}]}>
            <SeekPartsColumn partsData={seekPartsData} state={this.state} openModal={this.openModal.bind(this)} pressPartColumn={this.pressPartColumn.bind(this)}/>
          </View>
          <View style={[topView, {height: selectTypeRow ? '100%' : 0}]}>
            <SeekTypesColumn typesData={seekTypesData} state={this.state} openModal={this.openModal.bind(this)} pressTypeColumn={this.pressTypeColumn.bind(this)}/>
          </View>
        </View>
      </View>
    )
  }
}

const SeekPartsColumn = props => {
  let { partsData, state, openModal, pressPartColumn } = props
  return (
    <View style={{height: '100%'}}>
      <View style={seek.dataColumnView}>
        <ScrollView>
          {
            partsData.map((partItem, p)=> <TouchableOpacity key={p} 
              style={seek.itemTouch} 
              activeOpacity={0.8}
              onPress={()=> pressPartColumn(p)}
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
  let { typesData, state, openModal, pressTypeColumn } = props
  return (
    <View style={{height: '100%'}}>
      <View style={seek.dataColumnView}>
        <ScrollView>
          {
            typesData.map((typeItem, t)=> <TouchableOpacity key={t} 
              style={seek.itemTouch} 
              activeOpacity={0.8}
              onPress={()=> pressTypeColumn(t)}
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
