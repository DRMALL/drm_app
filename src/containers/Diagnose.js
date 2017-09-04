import React, { Component } from 'react'
import { View, Text, Image, Alert } from 'react-native'
import TabBarItem from '../components/units/TabBarItem'
import DiagnosisTab from '../components/units/DiagnosisTab'
import DiagnoseCategory from '../components/DiagnoseCategory'
// import { diagnosisTabData } from '../utils/virtualData'

import store from '../utils/store'
import diagnoseAC from '../actions/diagnoseAC'
import getDiagnosis from '../funcs/diagnose/getDiagnosis'
import getDiagnoseCate from '../funcs/diagnose/getDiagnoseCate'

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
    getDiagnosis()
    getDiagnoseCate()
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().diagnose) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  onDiagRefresh() {
    diagnoseAC.isRefresh()
    getDiagnosis()
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
        <DiagnosisTab state={this.state} diagData={allCateData} />
        <DiagnoseCategory diagnoseData={sortDiagnoseData} isRefreshing={isRefreshing} onDiagRefresh={this.onDiagRefresh.bind(this)} {...this.props} />
      </View>
    )
  }
}