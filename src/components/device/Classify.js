import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { lightBlueColor, contentColor, backgroundColor, mainColor, subTitleColor } from '../../common/constants'
import { classify } from '../../styles'

const intoIcon = require('../../images/navigation_icons/into.png')

export default class Classify extends Component {
  constructor(props) {
    super(props)
    this.state = (props => {
      let obj = { rowNum: props.data.length+1, classRow0: true }
      props.data.map((item, index) => {
        obj[`classRow${index+1}`] = false
      })
      return obj
    })(props)
  }

  pressClass(index) {
    let lengthNum = this.state.rowNum
    for(let i = 0; i < lengthNum; i++) {
      if(index == i) {
        this.setState({[`classRow${index}`]: true})
      }
      else this.setState({[`classRow${i}`]: false})
    }
  }

  render() {
    let { data } = this.props
    let allKinds = []
      , allNum = 0
    data.forEach((one)=> {
      allKinds = allKinds.concat(one.kinds)
      allNum += one.num
    })
    let allItem = [{
      class: '全部',
      kinds: allKinds,
      num: allNum,
    }]
    data = allItem.concat(data)
    return (
      <View style={classify.modalWrap}>
        <ScrollView style={{width: '50%', backgroundColor: backgroundColor}}>
          {data.map((item, i)=> <ClassRow key={i} item={item} index={i} state={this.state} pressClass={this.pressClass.bind(this)} />)}
        </ScrollView>
        <ScrollView style={{width: '50%'}}>
            {
              data.map((item, j)=> 
                this.state[`classRow${j}`] == true ? <KindRow key={j} item={item} /> : <Text key={j} style={{height: 0}}></Text>
              )
            }
        </ScrollView>
      </View>
    )
  }
}

const ClassRow = props => {
  let { item, index, state, pressClass } = props
    , selectClassRow = state[`classRow${index}`]
  return (
    <TouchableOpacity style={[classify.classTouch, {backgroundColor: selectClassRow ? mainColor : backgroundColor}]} activeOpacity={0.8} onPress={()=> pressClass(index)}>
      <Text style={classify.textClass}>{item.class == '全部' ? item.class : '按' + item.class}</Text>
      <View style={classify.numImgView}>
        <View style={classify.numBorder}>
          <Text style={classify.textNum}>{item.num}</Text>
        </View>
        <Image style={classify.imgItem} source={intoIcon}/>
      </View>
    </TouchableOpacity>
  )
}

class KindRow extends Component {
  constructor(props) {
    super(props)
    this.state = (props => {
      let kindStateObj = { rowNum: props.item.kinds.length+1, kindsRow0: true }
      props.item.kinds.map((kind, x) => {
        kindStateObj[`kindsRow${x+1}`] = false
      })
      return kindStateObj
    })(props)
  }

  pressKind(k) {
    let lengthNum = this.state.rowNum
    for(let x = 0; x < lengthNum; x++) {
      if(k == x) {
        this.setState({[`kindsRow${k}`]: true})
      }
      else this.setState({[`kindsRow${x}`]: false})
    }
  }

  render() {
    let { kinds } = this.props.item
    let allKindNum = 0
    kinds.forEach((one)=> {
      allKindNum += one.num
    })
    let whole = [{
      title: '全部',
      num: allKindNum,
    }]
    kinds = whole.concat(kinds)
    return (
      <View>
        {
          kinds.map((kindItem, k)=> <KindItemRow key={k} kindItem={kindItem} index={k} state={this.state} pressKind={this.pressKind.bind(this)}/>)
        }
      </View>
    )
  }
}

const KindItemRow = props => {
  let { kindItem, index, state, pressKind } = props
    , selectKindRow = state[`kindsRow${index}`]
  return (
    <TouchableOpacity style={classify.classTouch} activeOpacity={0.8} onPress={()=> pressKind(index)}>
      <Text style={[classify.textClass, {color: selectKindRow ? lightBlueColor : contentColor}]}>{kindItem.title}</Text>
      <View style={[classify.numBorder, {backgroundColor: selectKindRow ? lightBlueColor : subTitleColor, marginRight: 15}]}>
        <Text style={classify.textNum}>{kindItem.num}</Text>
      </View>
    </TouchableOpacity>
  )
}


