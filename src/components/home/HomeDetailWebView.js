import React from 'react'
import { View, WebView, Dimensions, Platform } from 'react-native'
import onMessage from '../../funcs/home/onMessage'
import handleDomIos from '../../funcs/home/handleDomIos'
import handleDomAndroid from '../../funcs/home/handleDomAndroid'
import onNavigationStateChange from '../../funcs/home/onNavigationStateChange'
import store from '../../utils/store'
import css from '../../utils/css.js'

let windowHeight = Dimensions.get('window').height

export default props => {
  let { contentLength, content } = props
    , viewHeight = store.getState().home.height
  return (
    <View style={{ height: viewHeight, paddingHorizontal: 16 }}>
      <WebView 
        style={{height: '100%'}}
        source={{html: content ? `<style type="text/css">${css()}</style>${content}` : `<p></p>`}}
        automaticallyAdjustContentInsets={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={Platform.OS === 'ios' ? handleDomIos() : handleDomAndroid() }
        // scrollEnabled={false}
        onNavigationStateChange={onNavigationStateChange}
        // onMessage={onMessage}
        decelerationRate='fast'
      />
    </View>
  )
}
