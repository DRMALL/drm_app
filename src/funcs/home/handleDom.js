import React from 'react'
import { Dimensions } from 'react-native'

let windowWidth = Math.round((Dimensions.get('window').width-60))

export default () => {
  const injectdScript = `
    (function () {
      const arr = document.getElementsByTagName(\"img\")
      let height = null
      for (let i = 0; i < arr.length; i ++) {
        arr[i].width = ${windowWidth}
      }
      function changeHeight() {
        if (document.body.scrollHeight != height) {
          height = document.body.scrollHeight
          if (window.postMessage) {
            window.postMessage(JSON.stringify({
              type: 'setHeight',
              height: height,
            }))
          }
        }
      }
      setInterval(changeHeight, 100)
    } () )`
  // return [...].join('\n')
  return injectdScript
}