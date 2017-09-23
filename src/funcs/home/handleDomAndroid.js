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
    var wrapper = document.createElement("div");  
    wrapper.id = "height-wrapper";  
    while (document.body.firstChild) {  
      wrapper.appendChild(document.body.firstChild);  
    }  
    document.body.appendChild(wrapper);  
    var i = 0;  
    function updateHeight() {  
      document.title = wrapper.clientHeight;  
      window.location.hash = ++i;  
    }  
    updateHeight();  
    window.addEventListener("load", function() {  
      updateHeight();  
      setTimeout(updateHeight, 1000);  
    });  
    window.addEventListener("resize", updateHeight);
  `
  return injectdScript
}

// return [...].join('\n')
// var height = null;
// function changeHeight() {
//         if (document.body.scrollHeight != height) {
//           height = document.body.scrollHeight;
//           if (window.postMessage) {
//             window.postMessage(JSON.stringify({
//               type: 'setHeight',
//               height: height,
//             }));
//           };
//         };
//       };
//       setInterval(changeHeight, 100);