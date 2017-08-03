import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { lightBlueColor, subTitleColor } from '../../common/constants'
import { sort } from '../../styles'

export default props => {
  let { data, state, pressSort } = props
  return (
    <View style={sort.modalWrap}>
      <ScrollView>
        {
          data.map((sortItem, s)=> <SortItemRow key={s} sortItem={sortItem} s={s} state={state} pressSort={pressSort}/>)
        }
      </ScrollView>
    </View>
  )
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