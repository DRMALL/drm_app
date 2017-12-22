import React, { Component } from 'react'
import { View, Text, Image, Alert } from 'react-native'
import TabBarItem from '../components/units/TabBarItem'
import DiagnosisTab from '../components/units/DiagnosisTab'
import DiagnoseCategory from '../components/DiagnoseCategory'

import store from '../utils/store'
import diagnoseAC from '../actions/diagnoseAC'
import deviceAC from '../actions/deviceAC'
import getDiagnosis from '../funcs/diagnose/getDiagnosis'
import getDiagnoseCate from '../funcs/diagnose/getDiagnoseCate'
import diagnoseLoadMore from '../actions/diagnoseLoadMore'

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

  async componentDidMount() {
    try {
      await getDiagnoseCate()
      const { selectedCate } = store.getState().diagnose
      await getDiagnosis(selectedCate)
    } catch (e) {
      console.log(e)
    }
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe( ()=> this.setState(store.getState().diagnose) )
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  async onDiagRefresh() {
    diagnoseAC.isRefresh()
    const { selectedCate } = store.getState().diagnose
    await getDiagnosis(selectedCate)
    diagnoseAC.isnotRefresh()
  }

  onScroll(e) {
    const { isLoading, allDiagnoseData, allDiagnoseDataMeta } = store.getState().diagnose
    if (isLoading) return

    if (allDiagnoseDataMeta.offset >= allDiagnoseDataMeta.count) return

    let y = e.nativeEvent.contentOffset.y
    let height = e.nativeEvent.layoutMeasurement.height
    let contentHeight = e.nativeEvent.contentSize.height

    if(y+height>=contentHeight-20){
      diagnoseLoadMore()
    }
  }


  render() {
    let { allDiagnoseData, allCateData, selectedCate, isRefreshing } = this.state

    return(
      <View style={{height: '100%', paddingBottom: 45}}>
        <DiagnosisTab state={this.state} diagData={allCateData} />
        <DiagnoseCategory diagnoseData={allDiagnoseData} isRefreshing={isRefreshing} onDiagRefresh={this.onDiagRefresh.bind(this)} onScroll={this.onScroll.bind(this)} {...this.props} />
      </View>
    )
  }
}
