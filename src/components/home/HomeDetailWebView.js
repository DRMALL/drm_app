import React from 'react'
import { View, WebView } from 'react-native'
import onMessage from '../../funcs/home/onMessage'
import handleDom from '../../funcs/home/handleDom'
import store from '../../utils/store'

export default props => {
  let { contentLength, content } = props
    , viewHeight = store.getState().home.height
  return (
    <View style={{height: Math.round(contentLength*17/12), paddingHorizontal: 16}}>
      <WebView 
        style={{height: '100%'}}
        automaticallyAdjustContentInsets={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scrollEnabled={false}
        onMessage={onMessage}
        injectedJavaScript={handleDom()}
        source={{html: content}}
        decelerationRate='fast'
      />
    </View>
  )
}