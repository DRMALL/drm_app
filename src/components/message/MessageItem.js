import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { subTitleColor, lightBlueColor } from '../../common/constants'
import { orderInformat, 
        equipMonitorin, 
        unknown, 
        replyAlready, 
        replyWaiting, 
        abnormal, 
        normal, 
} from '../../common/strings'
import { message } from '../../styles'


export default props => {
  let { navigation, msgItem } = props
  return (
    <View style={message.itemView}>
      <TouchableOpacity style={message.itemTouchView} activeOpacity={0.8} onPress={()=> navigation.navigate('dynamicOrder', { msgId: msgItem._id, msgReaded: msgItem.readed })}>
        <View style={msgItem.readed ? message.empty : message.redDot} />
        <View style={message.textPart}>
          <View style={message.topLine}>
            <Text style={message.textTitle}>
              {msgItem.types == 'order' ? orderInformat : (msgItem.types == 'order' ? equipMonitorin : unknown)}
            </Text>
            <Text style={message.textTime}>{moment(new Date(msgItem.order.time)).format('YYYY-MM-DD')}</Text>
          </View>
          <Text style={message.textAbstract}>{msgItem.des}</Text>
          <Text style={[message.textState, { color: msgItem.readed ? subTitleColor : lightBlueColor }]}>状态：
            {
              msgItem.types == 'order' && msgItem.status ? replyAlready : (
                msgItem.types == 'order' && !msgItem.status ? replyWaiting : (
                  !msgItem.status ? abnormal : normal
                )
              )
            }
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

