import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import DiagnosisTab from '../components/units/DiagnosisTab'
import DiagnoseCategory from '../components/DiagnoseCategory'
import { diagnosisTabData } from '../utils/virtualData'

const diagnoseIconSelected = require('../images/tabbar_icons/tabbar_diagnosis_selected_x.png')
    , diagnoseIconNormal = require('../images/tabbar_icons/tabbar_diagnosis_normal.png')

export default class Diagnose extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={diagnoseIconSelected}
        style={{tintColor: tintColor}}
      />
    )
  };

  constructor(props) {
    super(props)
    this.state = (()=> {
      let diagTabState = {}
      diagnosisTabData.map((itemTabType, index)=> {
        if(index == 0) diagTabState[`tabTypeRow${index}`] = true
        else diagTabState[`tabTypeRow${index}`] = false
      })
      return diagTabState
    })()
  }

  pressTab(dt) {
    diagnosisTabData.map((itemTabType, index)=> {
      if(dt == index) this.setState({[`tabTypeRow${dt}`]: true})
      else this.setState({[`tabTypeRow${index}`]: false})
    })
  }

  render() {
    return(
      <View style={{height: '100%', paddingBottom: 45}}>
        <DiagnosisTab state={this.state} diagData={diagnosisTabData} pressTab={this.pressTab.bind(this)}/>
        <DiagnoseCategory {...this.props} />
      </View>
    )
  }
}