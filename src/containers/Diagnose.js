import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import TabBarItem from '../components/units/TabBarItem'
import DiagnosisTab from '../components/units/DiagnosisTab'
import DiagnoseCategory from '../components/DiagnoseCategory'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getBugs } from '../apis'
import { diagnosisTabData } from '../utils/virtualData'

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
    this.state = (()=> {
      let diagTabState = {
        allDiagnoseData: [],
      }
      diagnosisTabData.map((itemTabType, index)=> {
        if(index == 0) diagTabState[`tabTypeRow${index}`] = true
        else diagTabState[`tabTypeRow${index}`] = false
      })
      return diagTabState
    })()
  }

  componentDidMount() {
    this.getDiagnosis()
  }

  getDiagnosis() {
    checkToken('drmAppToken')
    .then(async token => {
      let res = await getPort(`${getBugs}?token=${token}`)
      if(res.code == 200) {
        this.setState({
          allDiagnoseData: res.data,
        })
      } else alert('getDiagnosis failed')
    })
  }

  pressTab(dt) {
    diagnosisTabData.map((itemTabType, index)=> {
      if(dt == index) this.setState({[`tabTypeRow${dt}`]: true})
      else this.setState({[`tabTypeRow${index}`]: false})
    })
  }

  render() {
    let { allDiagnoseData } = this.state
    return(
      <View style={{height: '100%', paddingBottom: 45}}>
        <DiagnosisTab state={this.state} diagData={diagnosisTabData} pressTab={this.pressTab.bind(this)}/>
        <DiagnoseCategory diagnoseData={allDiagnoseData} {...this.props} />
      </View>
    )
  }
}