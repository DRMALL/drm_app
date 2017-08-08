import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { confirm, cleanUp } from '../../common/strings'
import { mainColor, lightBlueColor, contentColor, loginBorderColor } from '../../common/constants'
import { filter } from '../../styles'
import Button from '../units/Button'

export default props => {
  let { data, cityData, state, pressBotton, pressConfirmReturn, pressFilterParams } = props
    , { confirmPress, cleanPress } = state
    , citiesData = [{class: '所在地', kinds: cityData}]
  data = data.concat(citiesData)
  return (
    <View style={filter.modalWrap}>
      <View>
        {
          data.map((item, i)=> <FilterClassItem key={i} classItem={item} state={state} pressFilterParams={pressFilterParams}/>)
        }
      </View>
      <View style={filter.buttonView}>
        <Button 
          style={[filter.button, cleanPress ? {backgroundColor: lightBlueColor, borderColor: lightBlueColor} : {} ]} 
          title={cleanUp} 
          titleStyle={[filter.buttonTitle, {color: cleanPress ? mainColor : contentColor} ]} 
          onPressIn={()=> pressBotton(`cleanPress`)} 
          delayPressOut={50}
          onPressOut={()=> pressBotton(`cleanPress`)} 
          activeOpacity={0.8}
        />
        <Button 
          style={[filter.button, confirmPress ? {backgroundColor: lightBlueColor, borderColor: lightBlueColor} : {} ]} 
          title={confirm} 
          titleStyle={[filter.buttonTitle, {color: confirmPress ? mainColor : contentColor} ]} 
          onPressIn={()=> pressBotton(`confirmPress`)} 
          delayPressOut={0}
          onPressOut={()=> pressBotton(`confirmPress`)} 
          onPress={()=> pressConfirmReturn()}
          activeOpacity={0.8}
        />
      </View>
    </View>
  )
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
        this.props.pressFilterParams(kind.type, kind.text)
      } else this.setState({ [`filterRow${k}`]: false })
    })
  }

  componentWillUpdate() {
    if(this.props.state.cleanPress) {
      this.pressFilter()
    }
  }

  render() {
    let { classItem, state } = this.props
    return (
      <View style={classItem.class == '排量' ? filter.pailiangView : filter.otherView}>
        <View style={classItem.class == '排量' ? filter.pailiangSecondView : filter.secondView}>
          <Text style={filter.classText}>{'按' + classItem.class}</Text>
          <Text style={classItem.class == '排量' ? filter.attachText : {height: 0}}>{classItem.class == '排量' ? '单发生器热载体质量3t/h' : ''}</Text>
        </View>
        <ScrollView style={{marginHorizontal: 15}} horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={filter.kindView}>
            {classItem.kinds.map((kindItem, f)=> <FilterKindItem key={f} kindItem={kindItem} f={f} state={state} sonstate={this.state} pressFilter={this.pressFilter.bind(this)} />)}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const FilterKindItem = props => {
  let { kindItem, f, state, sonstate, pressFilter } = props
    , selectFilterRow = sonstate[`filterRow${f}`]
    , pointedExist = kindExist(kindItem, state)
  return (
    <TouchableOpacity style={[filter.kindTouch, {borderColor: selectFilterRow || pointedExist ? lightBlueColor : loginBorderColor}]} activeOpacity={0.8} onPress={()=> pressFilter(f)}>
      <Text style={[filter.kindText, {color: selectFilterRow || pointedExist ? lightBlueColor : loginBorderColor}]}>{kindItem.text}</Text>
    </TouchableOpacity>
  )
}

const kindExist = (kindItem, state)=> {
  let exist = false
  switch(kindItem.type) {
    case 'cc': {
      exist = kindItem.text == state.filtercc ? true : false
    }break
    case 'pressure': {
      exist = kindItem.text == state.filterpressure ? true : false
    }break
    case 'combustible': {
      exist = kindItem.text == state.filtercombustible ? true : false
    }break
    default: {
      exist = kindItem.text == state.filteraddress ? true : false
    }
  }
  return exist
}
