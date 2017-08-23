import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { primaryColor, mainColor, subTitleColor, backgroundColor } from '../../common/constants'
import { timeLineScreening, cancel, confirm, pleaseSelectStartTime, pleaseSelectEndTime, deviceLabel } from '../../common/strings'
import { calendars } from '../../styles'

import DayList from '../../components/archives/DayList'

const splitDate = (date)=> {
  let objectDate = { year: null, month: null, day: null, week: null, hour: null, minute: null, second: null}
    , dateRe = typeof date == 'date' ? date : new Date(date)
  objectDate.year = dateRe.getFullYear()
  objectDate.month = dateRe.getMonth() + 1
  objectDate.day = dateRe.getDate()
  objectDate.week = dateRe.getDay()
  objectDate.hour = dateRe.getHours()
  objectDate.minute = dateRe.getMinutes()
  objectDate.second = dateRe.getSeconds()
  return objectDate
}

const monthToDays = (year, month)=> {
  let month0 = month < 10 ? `0${month}` : `${month}`
    , month1 = (month+1) < 10 ? `0${month+1}` : `${month+1}`
    , startMonthDay = `${year}-${month0}-01`
    , endMonthDay = month == 12 ? `${year+1}-01-01` : `${year}-${month1}-01`
    , startWeek = new Date(startMonthDay).getDay()
    , timeSlot = new Date(endMonthDay).getTime() - new Date(startMonthDay).getTime()
    , slotLength = timeSlot/(24*60*60*1000)
    , timeSlotArr = []
    , timeSlotArrTD = []
  for(var w = 0; w < startWeek; w++) {
    timeSlotArr.push('')
  }
  for(var i = 1; i <= slotLength; i++) {
    timeSlotArr.push(`${i}`)
  }
  //ListView二维数组
  for(var tol = 0; tol < (timeSlotArr.length/7); tol++) {
    var sectionArr = []
    for(var rnum = 0; rnum < 7; rnum++) {
      sectionArr.push(timeSlotArr[tol*7 + rnum])
    }
    timeSlotArrTD.push(sectionArr)
  }
  return timeSlotArrTD
}

const gobackIcon = require('../../images/navigation_icons/goback.png')
const intoIcon = require('../../images/navigation_icons/into.png')

export default class Calendars extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: mainColor, alignSelf: 'center' }} >{timeLineScreening}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 15}} onPress={() => navigation.goBack()}>
      <Text style={{ fontSize: 15, color: mainColor}}>{cancel}</Text>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => navigation.state.params.comeToDetail()}>
      <Text style={{ fontSize: 15, color: mainColor}}>{confirm}</Text>
    </TouchableOpacity>,
  });

  constructor(props) {
    super(props)
    let nowdate = new Date()
      , nowdateObj = splitDate(nowdate)
      , dayArr = monthToDays(nowdateObj.year, nowdateObj.month)
    this.state = (props=> {
      let calendState = {
        year: nowdateObj.year,
        month: nowdateObj.month,
        day: nowdateObj.day,
        dayArray: dayArr,
        startTime: '',
        startTimestamp: 0,
        endTime: '',
        endTimestamp: 0, 
        pointNum: 0,
        selectTextTF: false,
        resetTime: false,
      }
      return calendState
    })(props)
  }

  componentDidMount() {
    this.props.navigation.setParams({
      comeToDetail: this.comeToDetail.bind(this),
    })
  }

  comeToDetail() {
    let { deviceId } = this.props.navigation.state.params
      , { startTime, endTime } = this.state
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ 
          routeName: 'main', 
          params: {},
          action: NavigationActions.navigate({ routeName: `${deviceLabel}`}),
        }),
        NavigationActions.navigate({ 
          routeName: 'detail', 
          params: {
            deviceId: deviceId, 
            startTime: startTime, 
            endTime: endTime,
          }, 
        })
      ]
    })
    this.props.navigation.dispatch(resetAction)
    
  }

  pressMinusMonth() {
    let { ds, year, month } = this.state
      , monthMinus = month == 1 ? 12 : month-1
      , yearMinus = month == 1 ? year-1 : year
      , dayArrMinus = monthToDays(yearMinus, monthMinus)
    this.setState({
      year: yearMinus,
      month: monthMinus,
      dayArray: dayArrMinus,
    })
  }

  pressIncreaseMonth() {
    let { ds, year, month } = this.state
      , monthIncrease = month == 12 ? 1 : month+1
      , yearIncrease = month == 12 ? year+1 : year
      , dayArrIncrease = monthToDays(yearIncrease, monthIncrease)
    this.setState({
      year: yearIncrease,
      month: monthIncrease,
      dayArray: dayArrIncrease,
    })
  }

  pressDayItem(dayTime, dayStamp) {
    this.setState( bfoState=> {
      return {
        startTimestamp: bfoState.resetTime ? dayStamp : 
          (bfoState.startTimestamp == 0 ? dayStamp : bfoState.startTimestamp),
        startTime: bfoState.resetTime ? dayTime : 
          (bfoState.startTimestamp == 0 ? dayTime : bfoState.startTime),
        endTimestamp: bfoState.resetTime ? 0 : 
          (bfoState.startTimestamp != 0 && bfoState.endTimestamp == 0 ? dayStamp : bfoState.endTimestamp),
        endTime: bfoState.resetTime ? '' : 
          (bfoState.startTimestamp != 0 && bfoState.endTimestamp == 0 ? dayTime : bfoState.endTime),
        pointNum: bfoState.resetTime ? 1 : 
          (bfoState.startTimestamp == 0 ? 1 : (bfoState.endTimestamp == 0 ? 2 : bfoState.pointNum)),
        resetTime: bfoState.startTimestamp != 0 && bfoState.endTimestamp == 0 ? true : false,
        selectTextTF: bfoState.pointNum == 0 || bfoState.pointNum == 2 ? true : false,
      }
    })
  }

  render() {
    let weekArr = ['日','一','二','三','四','五','六']
    let { year, month, dayArray, selectTextTF } = this.state
    return (
      <ScrollView style={calendars.wrap}>
        <StatusBar backgroundColor={primaryColor} barStyle='light-content'/>
        <Text style={calendars.selectText}>{selectTextTF ? pleaseSelectEndTime : pleaseSelectStartTime}</Text>
        <View style={{backgroundColor: mainColor}}>
          <View style={calendars.ymView}>
            <TouchableOpacity style={{padding: 10}} onPress={this.pressMinusMonth.bind(this)}>
              <Image source={gobackIcon}/>
            </TouchableOpacity>
            <Text style={calendars.ymText}>{`${year}年${month}月`}</Text>
            <TouchableOpacity style={{padding: 10}} onPress={this.pressIncreaseMonth.bind(this)}>
              <Image source={intoIcon}/>
            </TouchableOpacity>
          </View>
          <View style={calendars.fixWeekView}>
            {
              weekArr.map((item, index)=> <View style={calendars.dayGridView} key={index}>
                <Text style={calendars.fixWeekText}>{item}</Text>
              </View>)
            }
          </View>
          <DayList data={dayArray} state={this.state} pressDayItem={this.pressDayItem.bind(this)}/>
          <View style={{paddingBottom: 20}}/>
        </View>
      </ScrollView>
    )
  }
}

