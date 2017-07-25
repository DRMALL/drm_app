import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { confirm, cleanUp } from '../../common/strings'
import { mainColor, lightBlueColor, contentColor, loginBorderColor } from '../../common/constants'
import { filter } from '../../styles'
import Button from '../units/Button'

export default class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmState: false,
      confirmPress: false,
      cleanState: false,
      cleanPress: false,
    }
  }

  pressBotton(which) {
    this.setState({[which]: !this.state[which]})
  }

  pressConfirmReturn() {
    alert(this.state.confirmPress)
  }

  render() {
    let { data } = this.props
      , confirmState = this.state.confirmState
      , confirmPress = this.state.confirmPress
      , cleanState = this.state.cleanState
      , cleanPress = this.state.cleanPress
    return (
      <View style={filter.modalWrap}>
        <View>
          {
            data.map((item, i)=> <FilterClassItem key={i} classItem={item} state={this.state}/>)
          }
        </View>
        <View style={filter.buttonView}>
          <Button 
            style={[filter.button, cleanPress ? {backgroundColor: lightBlueColor, borderColor: lightBlueColor} : {} ]} 
            title={cleanUp} 
            titleStyle={[filter.buttonTitle, {color: cleanPress ? mainColor : contentColor} ]} 
            onPressIn={()=> this.pressBotton(`cleanPress`)} 
            delayPressOut={50}
            onPressOut={()=> this.pressBotton(`cleanPress`)} 
            activeOpacity={0.8}
          />
          <Button 
            style={[filter.button, confirmPress ? {backgroundColor: lightBlueColor, borderColor: lightBlueColor} : {} ]} 
            title={confirm} 
            titleStyle={[filter.buttonTitle, {color: confirmPress ? mainColor : contentColor} ]} 
            onPressIn={()=> this.pressBotton(`confirmPress`)} 
            delayPressOut={200}
            onPressOut={()=> this.pressBotton(`confirmPress`)} 
            onPress={()=> this.pressConfirmReturn()}
            activeOpacity={0.8}
          />
        </View>
      </View>
    )
  }
}

class FilterClassItem extends Component {
  constructor(props) {
    super(props)
    this.state = (props => {
      let filterStateObj = {}
      props.classItem.kinds.map((kind, k)=> {
        filterStateObj[`filterRow${k}`] = false
      })
      return filterStateObj
    })(props)
  }

  pressFilter(f) {
    this.props.classItem.kinds.map((kind, k)=> {
      if(f == k) {
        this.setState({ [`filterRow${f}`]: !this.state[`filterRow${f}`] })
      } else this.setState({ [`filterRow${k}`]: false })
    })
  }

  componentWillUpdate() {
    console.log(this.props.state.cleanPress)
    if(this.props.state.cleanPress) {
      this.pressFilter()
    }
  }

  render() {
    let { classItem } = this.props
    return (
      <View style={classItem.class == '排量' ? filter.pailiangView : filter.otherView}>
        <View style={classItem.class == '排量' ? filter.pailiangSecondView : filter.secondView}>
          <Text style={filter.classText}>{'按' + classItem.class}</Text>
          <Text style={classItem.class == '排量' ? filter.attachText : {height: 0}}>{classItem.class == '排量' ? '单发生器热载体质量3t/h' : ''}</Text>
        </View>
        <ScrollView style={{marginHorizontal: 15}} horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={filter.kindView}>
            {classItem.kinds.map((kindItem, f)=> <FilterKindItem key={f} kindItem={kindItem} f={f} state={this.state} pressFilter={this.pressFilter.bind(this)} />)}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const FilterKindItem = props => {
  let { kindItem, f, state, pressFilter } = props
    , selectFilterRow = state[`filterRow${f}`]
  return (
    <TouchableOpacity style={[filter.kindTouch, {borderColor: selectFilterRow ? lightBlueColor : loginBorderColor}]} activeOpacity={0.8} onPress={()=> pressFilter(f)}>
      <Text style={[filter.kindText, {color: selectFilterRow ? lightBlueColor : loginBorderColor}]}>{kindItem.title}</Text>
    </TouchableOpacity>
  )
}