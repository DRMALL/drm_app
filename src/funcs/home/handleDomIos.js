import React from 'react'
import { Dimensions } from 'react-native'

let windowWidth = Math.round((Dimensions.get('window').width-60))

export default () => {
  const injectdScript = ` 
    const arr = document.getElementsByTagName(\"img\");
    for(var i = 0; i < arr.length; i++) {
      arr[i].width = ${windowWidth};
    };
    document.title = document.documentElement.scrollHeight;
  `
  return injectdScript
}