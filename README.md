# drm_app

* [开发文档](#开发文档)
* [结构文档](#结构文档)

## 开发文档
本项目使用react-native来开发app的ios及android；路由是使用react-navigation，其中的StackNavigator和TabNavigator分别控制页面的跳转和底部tabbar页面的跳转；采用redux对state进行管理，开发中还使用到Android Studio和Xcode这两个应用。

clone到本地使用
```js
  git clone https://github.com/DRMALL/drm_app.git
  cd drm_app
  yarn install 或者 npm install
  npm start 或者 react-native run-android 或者 react-native run-ios

  注意：需要有真机连接或有可以打开模拟器的应用，才能在本地调试
```


## 结构文档
index.android.js和index.ios.js为RN项目的入口文件，都指向到src/index.js，再到src/containers/Routes这个路由主文件。

> ———— drm_app
>> ———— src
>>> ———— actions （更改store的action文件）    
>>> ———— apis （与后端API对接的URL）    
>>> ———— common （固定的字符串，样式及action的type名）    
>>> ———— components （存放页面所关联的组件）    
>>> ———— containers （存放页面）    
>>> ———— funcs （函数）    
>>> ———— images （本项目图片）    
>>> ———— reducers （存放redux相关的reducer文件）    
>>> ———— styles （样式）    
>>> ———— utils （请求方式、AsyncStorage存取、转换、虚拟数据）    

