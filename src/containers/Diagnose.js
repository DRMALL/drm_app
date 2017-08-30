import React, { Component } from 'react'
import { View, Text, Image, Alert } from 'react-native'
import TabBarItem from '../components/units/TabBarItem'
import DiagnosisTab from '../components/units/DiagnosisTab'
import DiagnoseCategory from '../components/DiagnoseCategory'
import { tokenKey, internalServerError } from '../common/strings'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getBugs, getCate } from '../apis'
// import { diagnosisTabData } from '../utils/virtualData'

import store from '../utils/store'
import diagnoseAC from '../actions/diagnoseAC'

const diagnoseIconSelected = require('../images/tabbar_icons/tabbar_diagnosis_selected_x.png')
    , diagnoseIconNormal = require('../images/tabbar_icons/tabbar_diagnosis_normal.png')

export default class Diagnose extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <TabBarItem
        tintColor={tintColor}
        focused={focused}
        normalImage={diagnoseIconNormal} 
        selectedImage={diagnoseIconSelected} 
      />
    )
  };

  constructor(props) {
    super(props)
    this.state = store.getState().diagnose
  }

  componentDidMount() {
    this.getDiagnosis()
    this.getDiagnoseCate()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().diagnose) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  getDiagnosis() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getBugs}?token=${token}`)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        diagnoseAC.getDiagnoseData(res.data) 
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  getDiagnoseCate() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getCate}?token=${token}`)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        diagnoseAC.getDiagCate({
          allCateData: res.data,
          selectedCate: res.data[0].text,
        })
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  pressTab(dt) {
    this.state.allCateData.map((itemTabType, index)=> {
      if(dt == index) {
        diagnoseAC.selectCate({
          [`tabTypeRow${dt}`]: true,
          selectedCate: itemTabType.text,
        })
      } else diagnoseAC.normalCate({[`tabTypeRow${index}`]: false})
    })
  }

  onDiagRefresh() {
    diagnoseAC.isRefresh()
    this.getDiagnosis()
    setTimeout(() => {
      diagnoseAC.isnotRefresh()
    }, 2000)
  }

  render() {
    let { allDiagnoseData, allCateData, selectedCate, isRefreshing } = this.state
      , sortDiagnoseData = []
    allDiagnoseData.forEach((oneDiagnose)=> {
      if(oneDiagnose.category && oneDiagnose.category.text == selectedCate) {
        sortDiagnoseData = sortDiagnoseData.concat(oneDiagnose)
      }
    })
    return(
      <View style={{height: '100%', paddingBottom: 45}}>
        <DiagnosisTab state={this.state} diagData={allCateData} pressTab={this.pressTab.bind(this)}/>
        <DiagnoseCategory diagnoseData={sortDiagnoseData} isRefreshing={isRefreshing} onDiagRefresh={this.onDiagRefresh.bind(this)} {...this.props} />
      </View>
    )
  }
}