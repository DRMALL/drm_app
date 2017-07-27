import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars'
import { primaryColor, mainColor, subTitleColor, backgroundColor } from '../../common/constants'
import { timeLineScreening, cancel, confirm } from '../../common/strings'
import {  } from '../../styles'

LocaleConfig.locales['ch'] = {
  monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  monthNamesShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  dayNames: ['星期日', '星期一','星期二','星期三','星期四','星期五','星期六'],
  dayNamesShort: ['日','一','二','三','四','五','六']
};
 
LocaleConfig.defaultLocale = 'ch';

export default class Calendars extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: mainColor, alignSelf: 'center' }} >{timeLineScreening}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 15}} onPress={() => navigation.goBack()}>
      <Text style={{ fontSize: 15, color: mainColor}}>{cancel}</Text>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => alert('ok')}>
      <Text style={{ fontSize: 15, color: mainColor}}>{confirm}</Text>
    </TouchableOpacity>,
  })
  render() {
    return (
      <View style={{height: '100%', width: '100%'}}>
        <Text style={{padding: 10, backgroundColor: backgroundColor}}>请选择时间段结束时间</Text>
        <Calendar 
          current={'2017-07-27'}
          minDate={'2017-01-01'}
          maxDate={'2017-12-31'}
          onDayPress={(day) => {console.log('selected day', day)}}
          monthFormat={'yyyy年MM月'}
          onMonthChange={(month) => {console.log('month changed', month)}}
          hideArrows={true}
          renderArrow={(direction) => (<Arrow />)}
          hideExtraDays={true}
          disableMonthChange={true}
          firstDay={1}
          markedDates={{
            '2017-07-06': {selected: true},
            '2017-07-23': {selected: true},
            // '2017-07-06': [{startingDay: true, color: 'gray', textColor: '#FFF'}],
            // '2017-07-07': [{color: 'gray', textColor: '#FFF'}],
            // '2017-07-08': [{endingDay: true, color: 'gray', textColor: '#FFF'}],
          }}
          // markingType={'interactive'}
        />
      </View>
    )
  }
}