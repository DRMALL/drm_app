import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { primaryColor, mainColor, contentColor } from '../../common/constants'
import { orderDynamic, orderContent, orderReturn, solved, unsolved } from '../../common/strings'
import { dynamicOrder } from '../../styles'
import Button from '../units/Button'
// import { messagesList } from '../../utils/virtualData'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const emptyIcon = require('../../images/navigation_icons/empty.png')

export default class DynamicOrder extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{orderDynamic}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <Image style={{marginLeft: 20}} source={emptyIcon}/>,
  })
  render() {
    let { msgItem } = this.props.navigation.state.params
    // let msgItem = messagesList[0]
    return (
      <ScrollView style={dynamicOrder.wrap}>
        <Text style={dynamicOrder.fixContentText}>{orderContent}</Text>
        <View style={dynamicOrder.orderView}>
          <Text style={dynamicOrder.titleText}>{msgItem.abstract}</Text>
          <Text style={dynamicOrder.describeText}>{msgItem.describe}</Text>
          <View style={dynamicOrder.picsView}>
            {
              msgItem.pics.map((picItem, p)=> <OrderImg key={p} picItem={picItem} index={p}/>)
            }
          </View>
        </View>
        <View style={dynamicOrder.returnTimeView}>
          <Text style={dynamicOrder.fixReturnText}>{orderReturn}</Text>
          <Text style={dynamicOrder.returnTime}>{msgItem.returnTime}</Text>
        </View>
        <Text style={dynamicOrder.returnDescribe}>{msgItem.returnDescribe}</Text>
        <View style={dynamicOrder.buttonView}>
          <Button 
            style={dynamicOrder.unsolvedButton} 
            title={unsolved} 
            titleStyle={{color: contentColor}} 
            activeOpacity={0.8} 
            onPress={()=> alert('没有解决')} 
          />
          <Button 
            style={dynamicOrder.solvedButton} 
            title={solved} 
            titleStyle={{color: mainColor}} 
            activeOpacity={0.8} 
            onPress={()=> alert('已解决')} 
          />
        </View>
      </ScrollView>
    )
  }
}

const OrderImg= props => {
  let { picItem, index } = props
  return (
    <Image style={dynamicOrder.img} source={picItem}/>
  )
}