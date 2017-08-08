import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { lightBlueColor, contentColor, backgroundColor, mainColor, subTitleColor } from '../../common/constants'
import { classify } from '../../styles'

const intoIcon = require('../../images/navigation_icons/into.png')

export default props => {
  let { data, state, pressClass, changeClassKinds } = props
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
        {data.map((item, i)=> <ClassRow key={i} item={item} index={i} state={state} pressClass={pressClass} />)}
      </ScrollView>
      <ScrollView style={{width: '50%'}}>
          {
            data.map((item, j)=> 
              state[`classRow${j}`] == true ? <KindRow key={j} item={item} j={j} state={state} changeClassKinds={changeClassKinds}/> : <Text key={j} style={{height: 0}}></Text>
            )
          }
      </ScrollView>
    </View>
  )
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
      let kindStateObj = { rowNum: props.item.kinds.length+1 }
      props.item.kinds.map((kind, x) => {
        if(props.j == props.state.classj && props.state.kindk == 0) kindStateObj[`kindsRow0`] = true
        else if(props.j == props.state.classj && (x+1) == props.state.kindk) kindStateObj[`kindsRow${x+1}`] = true
        else kindStateObj[`kindsRow${x+1}`] = false
      })
      return kindStateObj
    })(props)
  }

  pressKind(j, k, type, kind) {
    let lengthNum = this.state.rowNum
    for(let x = 0; x < lengthNum; x++) {
      if(k == x) {
        this.setState({[`kindsRow${k}`]: true})
      }
      else this.setState({[`kindsRow${x}`]: false})
    }
    this.props.changeClassKinds(j, k, type, kind)
  }

  render() {
    let { item, j } = this.props
    let { kinds } = item
    let allKindNum = 0
    kinds.forEach((one)=> {
      allKindNum += one.num
    })
    let whole = [{
      title: '全部',
      type: '',
      num: allKindNum,
    }]
    kinds = whole.concat(kinds)
    return (
      <View>
        {
          kinds.map((kindItem, k)=> <KindItemRow key={k} kindItem={kindItem} j={j} index={k} state={this.state} pressKind={this.pressKind.bind(this)}/>)
        }
      </View>
    )
  }
}

const KindItemRow = props => {
  let { kindItem, j, index, state, pressKind } = props
    , selectKindRow = state[`kindsRow${index}`]
  return (
    <TouchableOpacity style={classify.classTouch} activeOpacity={0.8} onPress={()=> pressKind(j, index, kindItem.type, kindItem.title)}>
      <Text style={[classify.textClass, {color: selectKindRow ? lightBlueColor : contentColor}]}>{kindItem.title}</Text>
      <View style={[classify.numBorder, {backgroundColor: selectKindRow ? lightBlueColor : subTitleColor, marginRight: 15}]}>
        <Text style={classify.textNum}>{kindItem.num}</Text>
      </View>
    </TouchableOpacity>
  )
}


