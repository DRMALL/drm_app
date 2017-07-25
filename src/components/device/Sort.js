import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { lightBlueColor, subTitleColor } from '../../common/constants'
import { sort } from '../../styles'

export default class Sort extends Component {
  constructor(props) {
    super(props)
    this.state = (props => {
      let sortStateObj = {}
      props.data.map((sortText, index)=> {
        sortStateObj[`sortRow${index}`] = false
      })
      return sortStateObj
    })(props)
  }

  pressSort(s) {
    this.props.data.map((sortText, index)=> {
      if(s == index) {
        this.setState({ [`sortRow${s}`]: !this.state[`sortRow${s}`] })
      } else this.setState({ [`sortRow${index}`]: false })
    })
  }

  render() {
    let { data } = this.props
    return (
      <View style={sort.modalWrap}>
        <ScrollView>
          {
            data.map((sortItem, s)=> <SortItemRow key={s} sortItem={sortItem} s={s} state={this.state} pressSort={this.pressSort.bind(this)}/>)
          }
        </ScrollView>
      </View>
    )
  }
}

const SortItemRow = props => {
  let { sortItem, s, state, pressSort } = props
    , selectSortRow = state[`sortRow${s}`]
  return (
    <TouchableOpacity style={sort.sortTouch} activeOpacity={0.8} onPress={()=> pressSort(s)}>
      <Text style={[sort.sortText, {color: selectSortRow ? lightBlueColor : subTitleColor}]}>{sortItem.text}</Text>
    </TouchableOpacity>
  )
}