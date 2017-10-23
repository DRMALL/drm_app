# drm_app

* [开发文档](#开发文档)
* [安卓打包](#安卓打包)
* [ios打包](#ios打包)

## 开发文档
本项目使用react-native来开发app的ios及android；路由是使用react-navigation，其中的StackNavigator和TabNavigator分别控制页面的跳转和底部tabbar页面的跳转；采用redux对state进行管理，开发中还使用到Android Studio和Xcode中，点击左边项目的主文件夹这两个应用。

clone到本地使用
```js
  git clone https://github.com/DRMALL/drm_app.git
  cd drm_app
  yarn install 或者 npm install
  npm start 或者 react-native run-android 或者 react-native run-ios

  注意：需要有真机连接或有可以打开模拟器的应用，才能在本地调试
```

## 安卓打包
用Android Studio打开本项目，在底部Terminal（如果没进入drm_app，先用cd drm_app）输入:    

```js
  cd android && ./gradlew assembleRelease
```
如果还没有生成签名密钥和配置gradle变量，请看[这里](http://reactnative.cn/docs/0.49/signed-apk-android.html#content "React Native")      


## ios打包
[配置apple开发者证书流程](http://www.cnblogs.com/sk-fengzi/p/5670087.html "_失控的疯子")      
[苹果开发者中心](https://developer.apple.com "Apple Developer")      

首先登录apple开发者账号，下载相关的 Certificates 和 Provisioning Profiles 到本地，并双击生效；      
在Xcode中，点击左边项目的主文件夹drm_app，右边 General -> Signing中的Automatically manage signing的钩去掉，下面会出现Signing(Debug) 和 Signing(Release) ，在里面选上相对应的Provisioning Profiles证书， 然后在到 Build Settings -> Signing ，也选上:     

![General]()      

![Build Settings]()      

接着左上角的stop右边的框中选择 Generic iOS Device ，然后再点击菜单栏中的 Product -> Archive ，开始打包。      

```js
  //Xcode:  Version 9.0.1 (9A1004)
  Export -> Ad Hoc -> 全部不选择立即点击Next -> 选择证书，再点击Next -> Export -> 选择保存路径     
  //这样就生成ios的ipa文件    
```



如果内容有更改，删除原assets的文件夹和index.ios.jsbundle， 运行 npm run bundle-ios ， 重新bundle后， 把assets的文件夹和index.ios.jsbundle重新添加进Xcode的drm_app的drm_app文件夹中，再重新打包。      

注：    
Xcode中的AppDelegate.m    
```js
  ...

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];    //本地运行用这一句     
  //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"index.ios" withExtension:@"jsbundle"];    //打包时用这一句，不用上面那句     

  ...
```
