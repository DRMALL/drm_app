import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { primaryColor, mainColor, subTitleColor, lightBlueColor, contentColor } from '../../common/constants'
import { newTimeLine, cancel, publish, timelineType, createdTime, pleaseSelect } from '../../common/strings'
import { allLineTypeData } from '../../utils/virtualData'
import { timePoint } from '../../styles'

const dropdownNormal = require('../../images/dropdown_normal.png')
const dropdownSelected = require('../../images/dropdown_selected.png')

export default class TimePoint extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: mainColor, alignSelf: 'center' }}>{newTimeLine}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 15}} onPress={() => navigation.goBack()}>
      <Text style={{ fontSize: 15, color: mainColor}}>{cancel}</Text>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => alert('ok')}>
      <Text style={{ fontSize: 15, color: mainColor}}>{publish}</Text>
    </TouchableOpacity>,
  });

  constructor(props) {
    super(props)
    this.state = (()=> {
      let stateObj = { 
        isDateTimePickerVisible: false,
        date: new Date(),
        selectOne: pleaseSelect,
        touchSelect: false,
        displayView: {height: 0, width: 0},
      }
      allLineTypeData.map((item, i)=> {
        stateObj[`typeRow${i}`] = false
      })
      return stateObj
    })()
  }

  pressTouch(which) {
    this.setState({[which]: !this.state[which]})
  }

  pressSelectItem(index) {
    let typeRowOne = !this.state[`typeRow${index}`]
    allLineTypeData.map((item, i)=> {
      if(index == i) {
        this.setState({
          selectOne: typeRowOne ? item.types : pleaseSelect,
          [`typeRow${index}`]: typeRowOne,
        })
      } else this.setState({[`typeRow${i}`]: false})
    })
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date)
    this.setState({ date: date })
    this._hideDateTimePicker()
  }

  render() {
    let dateData = moment(this.state.date).format('YYYY-MM-DD')
      , touchSelect = this.state.touchSelect
      , displayView = this.state.displayView
    return (
      <View style={timePoint.wrap}>
        <View style={timePoint.nextWrap}>
          <Text style={timePoint.fixText}>{timelineType}</Text>
          <TouchableOpacity style={timePoint.touch} activeOpacity={0.6} onPress={()=> this.pressTouch(`touchSelect`)}>
            <Text style={[timePoint.dateText, touchSelect ? {color: lightBlueColor} : {}]}>{this.state.selectOne}</Text>
            <Image style={timePoint.img} source={touchSelect ? dropdownSelected : dropdownNormal}/>
          </TouchableOpacity>
        </View>
        <View style={touchSelect ? displayView : {}}>
          <View style={timePoint.nextWrap}>
            <Text style={timePoint.fixText}>{createdTime}</Text>
            <TouchableOpacity style={timePoint.touch} activeOpacity={0.6} onPress={this._showDateTimePicker}>
              <Text style={timePoint.dateText}>{`${dateData}`}</Text>
            </TouchableOpacity>
            <DateTimePicker 
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
          </View>
          <View style={timePoint.emptyView}/>
          <TextInput 
            style={timePoint.textInput} 
            placeholder={'请输入文字'} 
            placeholderTextColor={subTitleColor}
            multiline={true} 
            numberOfLines={20} 
            underlineColorAndroid="transparent" 
            onChange={()=> 'onChange'} 
          />
        </View>
        <ScrollView style={touchSelect ? {} : displayView}>
          {
            allLineTypeData.map((lineItem, index)=> <LineTypeItem key={index} lineItem={lineItem} index={index} state={this.state} pressSelectItem={this.pressSelectItem.bind(this)}/>)
          }
        </ScrollView>
      </View>
    )
  }
}

const LineTypeItem = props=> {
  let { lineItem, index, state, pressSelectItem } = props
    , lineSelectRow = state[`typeRow${index}`]
  return (
    <TouchableOpacity style={timePoint.lineItemTouch} activeOpacity={0.8} onPress={()=> pressSelectItem(index)}>
      <Text style={[timePoint.typeText, {color: lineSelectRow ? lightBlueColor : contentColor}]}>{lineItem.types}</Text>
      <Text style={[timePoint.dateText, {width: 280, color: lineSelectRow ? lightBlueColor : subTitleColor}]}>{lineItem.reference}</Text>
    </TouchableOpacity>
  )
}