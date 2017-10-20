
## 结构文档

* [结构文档](#结构文档)



index.android.js和index.ios.js为RN项目的入口文件，都指向到src/index.js，再到src/containers/Routes这个路由主文件。    



```js
drm_app/    
  │
  ├── android/        //安卓包路径，app/build/outputs/apk/app-release.apk    
  │    
  ├── ios/        //苹果打包时如果有更改，bundle/里需重新bundle    
  │    
  ├── src/        //主文件夹    
  │    │
  │    ├── actions/    //（更改store的action文件）    
  │    │    
  │    ├── apis/    //（与后端API对接的URL）    
  │    │
  │    ├── common/    //（固定的字符串，样式及action的type名）    
  │    │    
  │    ├── components/    //（存放页面所关联的组件）    
  │    │
  │    ├── containers/    //（存放页面）    
  │    │        │
  │    │        ├── archives/
  │    │        │     ├── Calendars.js    //设备档案 - 设备详情 - 日历
  │    │        │     ├── Detail.js    //设备档案 - 设备详情
  │    │        │     ├── Remark.js    //设备档案 - 设备详情 - 备注
  │    │        │     ├── TimePoint.js    //设备档案 - 设备详情 - 时间线
  │    │        │     └── UploadImage.js    //设备档案 - 设备详情 - 上传图片
  │    │        │
  │    │        ├── diagnose/
  │    │        │     ├── DiagDetail.js    //故障诊断 - 工单详情
  │    │        │     └── PushOrder.js    //故障诊断 - 提交工单
  │    │        │
  │    │        ├── equipment/
  │    │        │     └── Datagram.js    //状态监控 - 设备详情 - 折线图
  │    │        │
  │    │        ├── information/
  │    │        │     ├── Address.js    //个人信息 - 通讯地址
  │    │        │     ├── CompanyName.js    //个人信息 - 公司名称
  │    │        │     ├── Phone.js    //个人信息 - 联系电话
  │    │        │     ├── ResetPassword.js    //个人信息 - 修改密码
  │    │        │     └── UserName.js    //个人信息 - 用户名
  │    │        │
  │    │        ├── login/
  │    │        │     ├── EmailVerify.js    //登录 - 邮箱验证
  │    │        │     └── SetPassword.js    //登录 - 重置密码
  │    │        │
  │    │        ├── message/
  │    │        │     └── DynamicOrder.js    //消息 - 消息详情
  │    │        │
  │    │        ├── search/
  │    │        │     ├── SearchDevice.js    //设备档案搜索
  │    │        │     ├── SearchDiagnose.js    //故障诊断搜索
  │    │        │     ├── SearchSeek.js    //配件检索搜索
  │    │        │     └── SearchStatus.js    //状态监控搜索
  │    │        │
  │    │        ├── seek/
  │    │        │     └── SeekDetail.js    //配件检索 - 配件详情
  │    │        │
  │    │        ├── Device.js    //设备档案
  │    │        ├── Diagnose.js    //故障诊断
  │    │        ├── Equipment.js    //状态监控 - 设备详情
  │    │        ├── Home.js    //首页
  │    │        ├── HomeDetail.js    //首页 - 新闻详情
  │    │        ├── Information.js    //个人信息
  │    │        ├── Login.js    //登录
  │    │        ├── Message.js    //消息
  │    │        ├── Routes.js    //路由
  │    │        ├── Seek.js    //配件检索
  │    │        └── Status.js    //状态监控
  │    │    
  │    ├── funcs/    //（函数）    
  │    │
  │    ├── images/    //（本项目图片）    
  │    │    
  │    ├── reducers/    //（存放redux相关的reducer文件）    
  │    │
  │    ├── styles/    //（样式）    
  │    │    
  │    ├── utils/    //（请求方式、AsyncStorage存取、转换、虚拟数据）    
  │    │    
  │    └── index.js    //入口文件    
  │
  └── package.json    //

```

