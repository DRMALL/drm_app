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
          style={filter.button} 
          title={cleanUp} 
          titleStyle={filter.buttonTitle} 
          // onPressIn={()=> pressBotton(`cleanPress`)} 
          // delayPressOut={10}
          // onPressOut={()=> pressBotton(`cleanPress`)} 
          onPress={()=> pressBotton(`cleanPress`)}
          activeOpacity={0.8}
        />
        <Button 
          style={[filter.button, {backgroundColor: lightBlueColor, borderColor: lightBlueColor}]} 
          title={confirm} 
          titleStyle={[filter.buttonTitle, {color: mainColor} ]} 
          // onPressIn={()=> pressBotton(`confirmPress`)} 
          // delayPressOut={100}
          // onPressOut={()=> pressBotton(`confirmPress`)} 
          onPress={()=> pressConfirmReturn()}
          activeOpacity={0.8}
        />
      </View>
    </View>
  )
}

class FilterClassItem extends Component {cleanPress
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
        // this.setState({ [`filterRow${f}`]: !this.state[`filterRow${f}`] })
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
      <View style={classItem.class == '其他的' ? filter.otherView : filter.pailiangView}>
        <View style={classItem.class == '其他的' ? filter.secondView : filter.pailiangSecondView}>
          <Text style={filter.classText}>{'按' + classItem.class}</Text>
          <Text style={classItem.class == '其他的' ? filter.attachText : {height: 0}}>{classItem.class == '其他的' ? '' : ''}</Text>
        </View>
        <View style={{marginHorizontal: 15}}>
          <View style={filter.kindView}>
            {classItem.kinds.map((kindItem, f)=> <FilterKindItem key={f} kindItem={kindItem} f={f} state={state} sonstate={this.state} pressFilter={this.pressFilter.bind(this)} />)}
          </View>
        </View>
      </View>
    )
  }
}

const FilterKindItem = props => {
  let { kindItem, f, state, sonstate, pressFilter } = props
    , selectFilterRow = sonstate[`filterRow${f}`]
    , pointedExist = kindExist(kindItem, state)
  return (
    <TouchableOpacity style={filter.kindTouch} activeOpacity={0.8} onPress={()=> pressFilter(f)}>
      <Text style={[filter.kindText, selectFilterRow || pointedExist ? {color: lightBlueColor, borderColor: lightBlueColor } : {color: loginBorderColor, borderColor: loginBorderColor }]}>{kindItem.text}</Text>
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
