import React from 'react'
import { View, Image, TextInput, TouchableOpacity } from 'react-native'
import { subTitleColor } from '../../common/constants'
import { inputDeviceTypes } from '../../common/strings'
import { search } from '../../styles'

import deviceAC from '../../actions/deviceAC'
import getDeviceOnchange from '../../funcs/search/getDeviceOnchange'
import getDeviceSubmit from '../../funcs/search/getDeviceSubmit'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const searchIcon = require('../../images/navigation_icons/search.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')

export default props => {
  let { state, navigation, cleanText } = props
    , { pressCleanText } = deviceAC
  return (
    <View style={search.header}>
      <TouchableOpacity style={search.touchBack} onPress={()=> navigation.goBack()}>
        <Image source={gobackWhiteIcon}/>
      </TouchableOpacity>
      <View style={search.inputView}>
        <TextInput 
          autoCapitalize='none' 
          style={search.inputText} 
          placeholder={inputDeviceTypes} 
          placeholderTextColor={subTitleColor}
          underlineColorAndroid='transparent'
          autoFocus={true}
          value={state.text}
          onChangeText={getDeviceOnchange}
          onSubmitEditing={getDeviceSubmit}
        />
        <Image style={search.searchIcon} source={searchIcon}/>
        {
          state.text != '' ? <TouchableOpacity style={search.cancelTouch} onPress={pressCleanText}>
            <Image style={search.cancelIcon} source={cancelIcon}/>
          </TouchableOpacity> : <Image style={{height: 0}}/>
        }
      </View>
    </View>
  )
}