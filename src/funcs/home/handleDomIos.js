import React from 'react'
import { Dimensions } from 'react-native'

let windowWidth = Math.round((Dimensions.get('window').width-60))

export default () => {
  const injectdScript = ` 
    const arr = document.getElementsByTagName(\"img\")
        , blocks = document.getElementsByTagName(\"blockquote\");

    for (var j = 0; j < blocks.length; j ++) {
      blocks[j].style.borderLeft = '3px solid #eee';
      blocks[j].style.margin = '10px 0';
      blocks[j].style.paddingLeft = '10px';
    }
    for(var i = 0; i < arr.length; i++) {
      arr[i].width = ${windowWidth};
    };
    document.title = document.documentElement.scrollHeight;
  `
  return injectdScript
}