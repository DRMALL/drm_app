import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { lightBlueColor, contentColor, backgroundColor, mainColor } from '../../common/constants'
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
        <View style={{width: '50%', backgroundColor: backgroundColor}}>
          {data.map((item, i)=> <ClassRow key={i} item={item} index={i} state={this.state} pressClass={this.pressClass.bind(this)} />)}
        </View>
        <View style={{width: '50%'}}>
            {
              data.map((item, j)=> 
                this.state[`classRow${j}`] == true ? <KindRow key={j} item={item} /> : <Text key={j} style={{height: 0}}></Text>
              )
            }
          
        </View>
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

const KindRow = props => {
  let { item } = props
  return (
    <View>
      {
        item.kinds.map((kindItem, k)=> <TouchableOpacity key={k} style={classify.classTouch} activeOpacity={0.8} onPress={()=> 'touch'}>
          <Text style={classify.textClass}>{kindItem.title}</Text>
          <View style={classify.numBorder}>
            <Text style={classify.textNum}>{kindItem.num}</Text>
          </View>
        </TouchableOpacity>)
      }
    </View>
  )
}


