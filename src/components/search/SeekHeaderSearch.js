import React from 'react'
import { View, Image, TextInput, TouchableOpacity } from 'react-native'
import { subTitleColor } from '../../common/constants'
import { inputPartsKeywords } from '../../common/strings'
import { search } from '../../styles'

import getSeekOnchange from '../../funcs/search/getSeekOnchange'
import getSeekSubmit from '../../funcs/search/getSeekSubmit'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const searchIcon = require('../../images/navigation_icons/search.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')

export default props => {
  let { state, navigation, cleanText } = props
  return (
    <View style={search.header}>
      <TouchableOpacity style={search.touchBack} onPress={()=> navigation.goBack()}>
        <Image source={gobackWhiteIcon}/>
      </TouchableOpacity>
      <View style={search.inputView}>
        <TextInput 
          autoCapitalize='none' 
          style={search.inputText} 
          placeholder={inputPartsKeywords} 
          placeholderTextColor={subTitleColor}
          underlineColorAndroid='transparent'
          autoFocus={true}
          value={state.text}
          onChangeText={getSeekOnchange}
          onSubmitEditing={getSeekSubmit}
        />
        <Image style={search.searchIcon} source={searchIcon}/>
        {
          state.text != '' ? <TouchableOpacity style={search.cancelTouch} onPress={cleanText}>
            <Image style={search.cancelIcon} source={cancelIcon}/>
          </TouchableOpacity> : <Image style={{height: 0}}/>
        }
      </View>
    </View>
  )
}