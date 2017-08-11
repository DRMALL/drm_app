import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import TabBarItem from '../components/units/TabBarItem'
import DiagnosisTab from '../components/units/DiagnosisTab'
import DiagnoseCategory from '../components/DiagnoseCategory'
import { tokenKey } from '../common/strings'
import { checkToken } from '../utils/handleToken'
import { getPort } from '../utils/fetchMethod'
import { getBugs, getCate } from '../apis'
// import { diagnosisTabData } from '../utils/virtualData'

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
        isMounted: false,
        allDiagnoseData: [],
        allCateData: [],
        selectedCate: '',
      }
      for(var i = 0; i < 10; i++) {
        if(i == 0) diagTabState[`tabTypeRow${i}`] = true
        else diagTabState[`tabTypeRow${i}`] = false
      }
      return diagTabState
    })()
  }

  componentDidMount() {
    this.setState({isMounted: true})
    this.getDiagnosis()
    this.getDiagnoseCate()
  }

  componentWillUnmount(){
    this.setState({isMounted: false})
  }

  getDiagnosis() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getBugs}?token=${token}`)
      if(!res) {
        alert('result is null')
      } else if(res.code == 200) {
        if(this.state.isMounted) {
          this.setState({
            allDiagnoseData: res.data,
          })
        }
      } else alert(JSON.stringify(res))
    })
  }

  getDiagnoseCate() {
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getCate}?token=${token}`)
      if(!res) {
        alert('result is null')
      } else if(res.code == 200) {
        if(this.state.isMounted) {
          this.setState({
            allCateData: res.data,
            selectedCate: res.data[0].text,
          })
        }
      } else alert(JSON.stringify(res))
    })
  }

  pressTab(dt) {
    this.state.allCateData.map((itemTabType, index)=> {
      if(this.state.isMounted) {
        if(dt == index) {
          this.setState({
            [`tabTypeRow${dt}`]: true,
            selectedCate: itemTabType.text,
          })
        } else this.setState({[`tabTypeRow${index}`]: false})
      }
    })
  }

  render() {
    let { allDiagnoseData, allCateData, selectedCate } = this.state
      , sortDiagnoseData = []
    allDiagnoseData.forEach((oneDiagnose)=> {
      if(oneDiagnose.category.text == selectedCate) {
        sortDiagnoseData = sortDiagnoseData.concat(oneDiagnose)
      }
    })
    return(
      <View style={{height: '100%', paddingBottom: 45}}>
        <DiagnosisTab state={this.state} diagData={allCateData} pressTab={this.pressTab.bind(this)}/>
        <DiagnoseCategory diagnoseData={sortDiagnoseData} {...this.props} />
      </View>
    )
  }
}