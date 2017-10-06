import React, { Component } from 'react'
import { View, Text, Image, ListView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import moment from 'moment'
import socket from 'socket.io-client'
import { Navigator } from 'react-native-deprecated-custom-components'
import Lightbox from 'react-native-lightbox'
import { equipmentName, equipmentRunState, equipmentRunImg, equipmentIndexData, indexDataUpdateTime, equipmentRunningLog, internalServerError, tokenKey } from '../common/strings'
import { subTitleColor, primaryColor } from '../common/constants'
import { equipment } from '../styles'
import { equipmentDataList, equipmentLogList } from '../utils/virtualData'
import IndexData from '../components/equipment/IndexData'
import RunningLog from '../components/equipment/RunningLog'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getMoniterdevsNum } from '../apis'

import store from '../utils/store'
import statuAC from '../actions/statuAC'

const gobackWhiteIcon = require('../images/navigation_icons/goback_white.png')
const emptyIcon = require('../images/navigation_icons/empty.png')
const pic4 = require('../images/pic4.png')

export default class Equipment extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{navigation.state.params.statuItemNumber || '00000000'}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <Image style={{marginLeft: 20}} source={emptyIcon}/>,
  });

  constructor(props) {
    super(props)
    this.state = store.getState().statu
  }

  componentDidMount() {
    statuAC.getEquipData({})
    this.getMonNumData()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(()=> this.setState(store.getState().statu) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  getMonNumData() {    //获取数据库数据，存eqNumberData
    checkToken(tokenKey)
    .then(async token => {
      let { statuItemNumber } = this.props.navigation.state.params
      let res = await getPort(`${getMoniterdevsNum}?number=${statuItemNumber}&token=${token}`)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        // if(res.data === null) {
        //   Alert.alert('提示', '暂无内容,请刷新再试',
        //     [ {text: 'OK', onPress: () => 'ok'}, ],
        //     { cancelable: false }
        //   )
        //   this.props.navigation.goBack()
        // } else 
        statuAC.setEqNumItemData(res.data)
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  render() {
    let { equipmentData, eqNumberData } = this.state
      , { statuItemNumber } = this.props.navigation.state.params
      , isNormal = false
      , equipmentItemData = {}
    equipmentData.map((eqItem, index)=> {
      if(statuItemNumber == eqItem.number) {
        isNormal = true
        equipmentItemData = eqItem
      }
    })
    return (
      <ScrollView style={equipment.wrap}>
        <Text style={equipment.fixText}>{equipmentRunState}</Text>
        <Text style={equipment.stateText}>{isNormal ? '正常运行' : '离线'}</Text>
        
        <View style={equipment.twoTextView}>
          <Text style={equipment.fix2Text}>{equipmentIndexData}</Text>
          <Text style={[equipment.fix3Text, {position: 'absolute', right: 15}]}>{
            indexDataUpdateTime + `${equipmentItemData.rnTimestamp ? moment(equipmentItemData.rnTimestamp).format('YYYY-MM-DD HH:mm') : (
              eqNumberData ? moment(eqNumberData.updatedAt).format('YYYY-MM-DD HH:mm') : '0000-00-00 00:00'
            )}`
          }</Text>
        </View>
        <View style={equipment.dataView}>
          <IndexData indexData={equipmentDataList} equipmentItemData={equipmentItemData} eqNumberData={eqNumberData} {...this.props}/>
        </View>
        
      </ScrollView>
    )
  }
}

// {
//   <Text style={equipment.fixText}>{equipmentRunImg}</Text>
//         <Lightbox style={equipment.imgView}>
//           <Image style={equipment.img} source={pic4}/> 
//         </Lightbox>
//   <Text style={equipment.fixText}>{equipmentRunningLog}</Text>
//         <View style={equipment.logView}>
//           { equipmentLogList.map((log, i)=> <RunningLog key={i} log={log} /> ) }
//         </View>
// }