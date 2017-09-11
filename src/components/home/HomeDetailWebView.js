import React from 'react'
import { View, WebView, Dimensions } from 'react-native'
import onMessage from '../../funcs/home/onMessage'
import handleDom from '../../funcs/home/handleDom'
import store from '../../utils/store'

let windowHeight = Dimensions.get('window').height

export default props => {
  let { contentLength, content,  } = props
    , viewHeight = store.getState().home.height
    , webViewScreenHeight = Math.round(contentLength*17/12)
    , heightMultiple = webViewScreenHeight/Number(windowHeight)
  return (
    <View style={{height: Math.round(webViewScreenHeight - (Math.pow(((heightMultiple+2.2)/10), 2)*windowHeight)), paddingHorizontal: 16}}>
      <WebView 
        style={{height: '100%'}}
        automaticallyAdjustContentInsets={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        // scrollEnabled={false}
        onMessage={onMessage}
        injectedJavaScript={handleDom()}
        source={{html: content}}
        decelerationRate='fast'
      />
    </View>
  )
}