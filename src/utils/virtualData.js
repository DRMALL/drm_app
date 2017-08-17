export const homeList = [
  {
    id: 0,
    img: require('../images/pic1.jpeg'),
    title: '多元热流体稠油增产技术在金海采油厂开始现场实验'
  },
  {
    id: 1,
    img: require('../images/pic2.jpeg'),
    title: '多元热流体稠油增产技术在金海采油厂开始现场实验'
  },
  {
    id: 2,
    img: require('../images/pic1.jpeg'),
    title: '多元热流体稠油增产技术在金海采油厂开始现场实验'
  },
  {
    id: 3,
    img: require('../images/pic2.jpeg'),
    title: '多元热流体稠油增产技术在金海采油厂开始现场实验'
  },
  {
    id: 4,
    img: require('../images/pic1.jpeg'),
    title: '多元热流体稠油增产技术在金海采油厂开始现场实验'
  },
  {
    id: 5,
    img: require('../images/pic2.jpeg'),
    title: '多元热流体稠油增产技术在金海采油厂开始现场实验'
  },
]

//状态监控数据
export const statusList = [
  {
    id: 0,
    photo: require('../images/pic3.png'),
    deviceNo: '设备编号001',
    deviceState: true,
    normal: true,
    stopTime: '2017-07-17',
    updateTime: '2017-08-08 19:30',
  },
  {
    id: 1,
    photo: require('../images/pic3.png'),
    deviceNo: '设备编号002',
    deviceState: false,
    normal: false,
    stopTime: '2017-08-06',
    updateTime: '2017-08-07 19:30',
  },
  {
    id: 2,
    photo: require('../images/pic3.png'),
    deviceNo: '设备编号003',
    deviceState: true,
    normal: true,
    stopTime: '2017-07-18',
    updateTime: '2017-08-06 19:30',
  },
  {
    id: 3,
    photo: require('../images/pic3.png'),
    deviceNo: '设备编号004',
    deviceState: false,
    normal: false,
    stopTime: '2017-08-01',
    updateTime: '2017-08-04 19:30',
  },
  {
    id: 4,
    photo: require('../images/pic3.png'),
    deviceNo: '设备编号005',
    deviceState: false,
    normal: false,
    stopTime: '2017-07-30',
    updateTime: '2017-08-01 19:30',
  },
  {
    id: 5,
    photo: require('../images/pic3.png'),
    deviceNo: '设备编号006',
    deviceState: true,
    normal: true,
    stopTime: '2017-07-20',
    updateTime: '2017-07-19 19:30',
  },
]

//状态监控-设备名数据
export const equipmentDataList = [
  {
    id: 1,
    title: '本类别数据名称1',
    textArr: [
      { 
        text: '氧气入口压力1',
        num: 'NN.NN',
        unit: 'MPa',
      },
      { 
        text: '氧气流量1',
        num: 'NN.NN',
        unit: 'Kg/h',
      },
      { 
        text: '氧气累计流量1',
        num: 'NN.NN',
        unit: 'Kg',
      },
      { 
        text: '天然气入口压力1',
        num: 'NN.NN',
        unit: 'MPa',
      },
      { 
        text: '天然气出口压力1',
        num: 'NN.NN',
        unit: 'MPa',
      },
      { 
        text: '天然气流量1',
        num: 'NN.NN',
        unit: 'Kg/h',
      },
      { 
        text: '天然气流量2',
        num: 'NN.NN',
        unit: 'Kg/h',
      },
      { 
        text: '天然气累计流量1',
        num: 'NN.NN',
        unit: 'Kg',
      },
      { 
        text: '天然气累计流量2',
        num: 'NN.NN',
        unit: 'Kg',
      },
      { 
        text: '水入口压力1',
        num: 'NN.NN',
        unit: 'MPa',
      },
      { 
        text: '水入口压力2',
        num: 'NN.NN',
        unit: 'MPa',
      },
      { 
        text: '水泵出口压力1',
        num: 'NN.NN',
        unit: 'MPa',
      },
      { 
        text: '水泵出口压力2',
        num: 'NN.NN',
        unit: 'MPa',
      },
      { 
        text: '水流量1',
        num: 'NN.NN',
        unit: 'T/h',
      },
      { 
        text: '水流量2',
        num: 'NN.NN',
        unit: 'T/h',
      },
      { 
        text: '水累计流量1',
        num: 'NN.NN',
        unit: 'T',
      },
      { 
        text: '水累计流量2',
        num: 'NN.NN',
        unit: 'T',
      },
    ]
  },
  {
    id: 2,
    title: '本类别数据名称2',
    textArr: [
      { 
        text: '热载体温度1',
        num: 'NN.NN',
        unit: '°C',
      },
      { 
        text: '热载体温度2',
        num: 'NN.NN',
        unit: '°C',
      },
      { 
        text: '热载体压力1',
        num: 'NN.NN',
        unit: 'MPa',
      },
      { 
        text: '热载体压力2',
        num: 'NN.NN',
        unit: 'MPa',
      },
      { 
        text: '冷却水温度1',
        num: 'NN.NN',
        unit: '°C',
      },
      { 
        text: '冷却水温度2',
        num: 'NN.NN',
        unit: '°C',
      },
      { 
        text: '空燃比1',
        num: 'NN.NN',
        unit: '无',
      },
    ]
  },
  {
    id: 3,
    title: '本类别数据名称3',
    textArr: [
      { 
        text: '可燃气1含量',
        num: 'NN.NN',
        unit: '%',
      },
      { 
        text: '可燃气2含量',
        num: 'NN.NN',
        unit: '%',
      },
      { 
        text: '可燃气3含量',
        num: 'NN.NN',
        unit: '%',
      },
    ]
  },
  {
    id: 4,
    title: '本类别数据名称4',
    textArr: [
      { 
        text: '水箱PV',
        num: 'NN.NN',
        unit: 'm',
      },
      { 
        text: '水箱SV',
        num: 'NN.NN',
        unit: 'm',
      },
      { 
        text: '冷却水温度PV',
        num: 'NN.NN',
        unit: '°C',
      },
      { 
        text: '冷取水温度SV',
        num: 'NN.NN',
        unit: '°C',
      },
      { 
        text: '加热水箱',
        num: 'NN.NN',
        unit: '°C',
      },
      { 
        text: '压缩空气',
        num: 'NN.NN',
        unit: 'MPa',
      },
    ]
  },
]

//状态监控-设备名-日志数据
export const equipmentLogList = [
  {
    id: 1,
    time: '2017-05-01 15:21:32',
  },
  {
    id: 2,
    time: '2017-05-02 15:21:32',
  },
  {
    id: 3,
    time: '2017-05-03 15:21:32',
  },
  {
    id: 4,
    time: '2017-05-04 15:21:32',
  },
  {
    id: 5,
    time: '2017-05-05 15:21:32',
  },
]

//设备档案数据
export const deviceArchivesList = [
  {
    id: 1,
    name: '',
    number: '设备编号12345678901',
    images: require('../images/pic3.png'),
    cc: '单发生器',
    pressure: '25Mpa',
    combustible: '天然气型',
    online: true,
    incharge: '',
    address: '',
    timelines: [],
    description: '单发生器的多元热流体设备，以天然气为能源，压力范围：25Mpa。',
    createdAt: '2017-01-01',
  },
  {
    id: 2,
    name: '',
    number: '设备编号12345678902',
    images: require('../images/pic3.png'),
    cc: '单发生器',
    pressure: '30Mpa',
    combustible: '原油型',
    online: true,
    incharge: '',
    address: '',
    timelines: [],
    description: '单发生器的多元热流体设备，以天然气为能源，压力范围：25Mpa。',
    createdAt: '2017-01-02',
  },
  {
    id: 3,
    name: '',
    number: '设备编号12345678903',
    images: require('../images/pic3.png'),
    cc: '双发生器',
    pressure: '35Mpa',
    combustible: '柴油型',
    online: true,
    incharge: '',
    address: '',
    timelines: [],
    description: '单发生器的多元热流体设备，以天然气为能源，压力范围：25Mpa。',
    createdAt: '2017-01-03',
  },
  {
    id: 4,
    name: '',
    number: '设备编号12345678904',
    images: require('../images/pic3.png'),
    cc: '三发生器',
    pressure: '25Mpa',
    combustible: '天然气型',
    online: true,
    incharge: '',
    address: '',
    timelines: [],
    description: '单发生器的多元热流体设备，以天然气为能源，压力范围：25Mpa。',
    createdAt: '2017-01-04',
  },
  {
    id: 5,
    name: '',
    number: '设备编号12345678905',
    images: require('../images/pic3.png'),
    cc: '单发生器',
    pressure: '25Mpa',
    combustible: '天然气型',
    online: true,
    incharge: '',
    address: '',
    timelines: [],
    description: '单发生器的多元热流体设备，以天然气为能源，压力范围：25Mpa。',
    createdAt: '2017-01-05',
  },
]

//消息数据
export const messagesList = [
  {
    title: '工单信息',
    abstract: '设备忽然有较大噪音的原因',
    content: '',
    state: '已有回复',
    author: 'admin', 
    images: [],
    published: true,
    publish_time: '2017-01-01',
    read: false,
    describe: '1在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。',
    pics: [
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
    ],
    returnDescribe: '在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。',
    returnTime: '2017-07-28',
  },
  {
    title: '设备监测',
    abstract: '设备编号01234567891',
    content: '',
    state: '出现异常',
    author: 'admin', 
    images: [],
    published: true,
    publish_time: '2017-01-02',
    read: false,
    describe: '2在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。',
    pics: [
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
    ],
    returnDescribe: '在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。',
    returnTime: '2017-07-28',
  },
  {
    title: '工单信息',
    abstract: '设备忽然有较大噪音的原因2',
    content: '',
    state: '已有回复',
    author: 'admin', 
    images: [],
    published: false,
    publish_time: '2017-01-03',
    read: true,
    describe: '3在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。',
    pics: [
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
    ],
    returnDescribe: '在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。',
    returnTime: '2017-07-28',
  },
  {
    title: '工单信息',
    abstract: '设备忽然有较大噪音的原因3',
    content: '',
    state: '已有回复',
    author: 'admin', 
    images: [],
    published: true,
    publish_time: '2017-01-04',
    read: true,
    describe: '4在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。',
    pics: [
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
    ],
    returnDescribe: '在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。',
    returnTime: '2017-07-28',
  },
  {
    title: '设备监测',
    abstract: '设备编号01234567892',
    content: '',
    state: '出现异常',
    author: 'admin', 
    images: [],
    published: true,
    publish_time: '2017-01-05',
    read: true,
    describe: '5在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。',
    pics: [
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
      require('../images/Rectangle.png'),
    ],
    returnDescribe: '在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。',
    returnTime: '2017-07-28',
  },
]

//设备档案-分类数据
export const classifyData = [
  {
    class: '排量', 
    kinds: [
      {
        title: '单发生器',
        type: 'cc',
        num: 1234,
      },
      {
        title: '双发生器',
        type: 'cc',
        num: 1234,
      },
      {
        title: '三发生器',
        type: 'cc',
        num: 1234,
      },
      {
        title: '四发生器',
        type: 'cc',
        num: 1234,
      },
    ],
    num: 1234
  },
  {
    class: '压力范围', 
    kinds: [
      {
        title: '25Mpa',
        type: 'pressure',
        num: 1234,
      },
      {
        title: '30Mpa',
        type: 'pressure',
        num: 1234,
      },
      {
        title: '35Mpa',
        type: 'pressure',
        num: 1234,
      },
      {
        title: '50Mpa',
        type: 'pressure',
        num: 1234,
      },
      // {
      //   title: '60Mpa',
      //   type: 'pressure',
      //   num: 1234,
      // },
      // {
      //   title: '80Mpa',
      //   type: 'pressure',
      //   num: 1234,
      // },
    ],
    num: 1234
  },
  {
    class: '使用燃料', 
    kinds: [
      {
        title: '柴油型',
        type: 'combustible',
        num: 1234,
      },
      {
        title: '原油型',
        type: 'combustible',
        num: 1234,
      },
      {
        title: '天然气型',
        type: 'combustible',
        num: 1234,
      },
    ],
    num: 1234
  },
]

export const filterData = [
  {
    class: '排量', 
    kinds: [
      {
        text: '单发生器',
        type: 'cc',
        num: 1234,
      },
      {
        text: '双发生器',
        type: 'cc',
        num: 1234,
      },
      {
        text: '三发生器',
        type: 'cc',
        num: 1234,
      },
      {
        text: '四发生器',
        type: 'cc',
        num: 1234,
      },
    ],
    num: 1234
  },
  {
    class: '压力范围', 
    kinds: [
      {
        text: '25Mpa',
        type: 'pressure',
        num: 1234,
      },
      {
        text: '30Mpa',
        type: 'pressure',
        num: 1234,
      },
      {
        text: '35Mpa',
        type: 'pressure',
        num: 1234,
      },
      {
        text: '50Mpa',
        type: 'pressure',
        num: 1234,
      },
      // {
      //   text: '60Mpa',
      //   type: 'pressure',
      //   num: 1234,
      // },
      // {
      //   text: '80Mpa',
      //   type: 'pressure',
      //   num: 1234,
      // },
    ],
    num: 1234
  },
  {
    class: '使用燃料', 
    kinds: [
      {
        text: '柴油型',
        type: 'combustible',
        num: 1234,
      },
      {
        text: '原油型',
        type: 'combustible',
        num: 1234,
      },
      {
        text: '天然气型',
        type: 'combustible',
        num: 1234,
      },
    ],
    num: 1234
  },
]

//设备档案-排序数据
export const sortData = [
  {
    id: 1,
    text: '添加时间最早',
  },
  {
    id: 2,
    text: '添加时间最晚',
  },
  // {
  //   id: 3,
  //   text: '设备编号升序',
  // },
  // {
  //   id: 4,
  //   text: '设备编号降序',
  // },
  // {
  //   id: 5,
  //   text: '替代文本',
  // },
  // {
  //   id: 6,
  //   text: '替代文本',
  // },
  // {
  //   id: 7,
  //   text: '替代文本',
  // },
  // {
  //   id: 8,
  //   text: '替代文本',
  // },
]

//时间线数据
export const timeLineData = [
  {
    time: '2017-12-14',
    title: '保养',
    content: '设备在江苏工厂排产制造。',
  },
  {
    time: '2017-11-22',
    title: '租凭',
    content: '设备在江苏工厂排产制造。',
  },
  {
    time: '2017-10-24',
    title: '维修',
    content: '设备在江苏工厂维修设备在江苏工设备在江苏工厂维修设备在江苏工工维修设备在江苏工工维修设备在江苏工工...',
  },
  {
    time: '2017-07-13',
    title: '安装',
    content: '设备在江苏工厂排产制造。',
  },
]

//时间线类型数据
export const allLineTypeData= [
  {
    id: 1,
    types: '生产',
    reference: '设备在江苏工厂生产。',
  },
  {
    id: 2,
    types: '仓储',
    reference: '设备在江苏工厂仓储。',
  },
  {
    id: 3,
    types: '购买',
    reference: '设备在江苏工厂购买。',
  },
  {
    id: 4,
    types: '运输',
    reference: '设备在江苏工厂运输。',
  },
  {
    id: 5,
    types: '安装',
    reference: '设备在江苏工厂安装。',
  },
  {
    id: 6,
    types: '维修',
    reference: '设备在江苏工厂维修。',
  },
  {
    id: 7,
    types: '租凭',
    reference: '设备在江苏工厂租凭。',
  },
  {
    id: 8,
    types: '保养',
    reference: '设备在江苏工厂保养。',
  },
  {
    id: 9,
    types: '安装',
    reference: '设备在江苏工厂安装。',
  },
  {
    id: 10,
    types: '维修',
    reference: '设备在江苏工厂维修。',
  },
  {
    id: 11,
    types: '租凭',
    reference: '设备在江苏工厂租凭。',
  },
  {
    id: 12,
    types: '保养',
    reference: '设备在江苏工厂保养。',
  },
]

//故障诊断数据
export const diagnosisData = [
  {
    id: 1,
    title: '设备忽然有较大噪音的原因',
    kinds: '知识库·分类名',
    solved: false,
    describe: `1在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    returnDescribe: `在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    pic: require('../images/Rectangle.png'),
  },
  {
    id: 2,
    title: '设备忽然有较大噪音的原因',
    kinds: '知识库·分类名',
    solved: true,
    describe: `2在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    returnDescribe: `在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    pic: require('../images/Rectangle.png'),
  },
  {
    id: 3,
    title: '设备忽然有较大噪音的原因',
    kinds: '知识库·分类名',
    solved: true,
    describe: `3在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    returnDescribe: `在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    pic: require('../images/Rectangle.png'),
  },
  {
    id: 4,
    title: '设备忽然有较大噪音的原因较大的原因',
    kinds: '知识库·分类名',
    solved: true,
    describe: `4在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    returnDescribe: `在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    pic: require('../images/Rectangle.png'),
  },
  {
    id: 5,
    title: '设备忽然有较大噪音的原因设备忽然有较大噪音的原因',
    kinds: '知识库·分类名',
    solved: true,
    describe: `5在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    returnDescribe: `在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    pic: require('../images/Rectangle.png'),
  },
  {
    id: 6,
    title: '设备忽然有较大噪音的原因',
    kinds: '知识库·分类名',
    solved: true,
    describe: `6在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    returnDescribe: `在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    pic: require('../images/Rectangle.png'),
  },
  {
    id: 7,
    title: '设备忽然有较大噪音的原因',
    kinds: '知识库·分类名',
    solved: true,
    describe: `7在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    returnDescribe: `在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    pic: require('../images/Rectangle.png'),
  },
  {
    id: 8,
    title: '设备忽然有较大噪音的原因',
    kinds: '知识库·分类名',
    solved: true,
    describe: `8在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    returnDescribe: `在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。该项目得到采油处的精心指导、钻采院的技术支持、金海采油厂的大力配合、使试验得到顺利开展。第一口试井已经投产，效果有待进一步观察；第二口试验井正在注入当中。` + 
      `\n\n在油田公司领导的亲切关怀下，多元热流体稠油增产技术在金海采油厂开始现场试验。`,
    pic: require('../images/Rectangle.png'),
  },
]

//故障诊断TopTab数据
export const diagnosisTabData = [
  {
    tabTypes: '常见问题',
  },
  {
    tabTypes: '操作规范',
  },
  {
    tabTypes: '安全规程',
  },
  {
    tabTypes: '单位换算',
  },
  {
    tabTypes: '其他分类',
  },
]

//配件搜索数据
export const seekData = [
  {
    longCode: '02.5.0050',
    materialName: '隔爆系统',
    models: '一拖二FFSP',
    unites: '件',
  },
  {
    longCode: '02.5.0051',
    materialName: '隔爆系统',
    models: '一拖三FFSP',
    unites: '件',
  },
  {
    longCode: '02.5.0052',
    materialName: '隔爆系统',
    models: '拖二非防爆',
    unites: '台',
  },
  {
    longCode: '02.5.0055',
    materialName: '隔爆系统',
    models: '一拖三隔爆',
    unites: '台',
  },
  {
    longCode: '02.5.0061',
    materialName: '隔爆系统',
    models: '一拖二防爆',
    unites: '套',
  },
  {
    longCode: '02.5.0068',
    materialName: '隔爆系统',
    models: '一拖三隔爆',
    unites: '副',
  },
  {
    longCode: '02.5.0075',
    materialName: '隔爆系统',
    models: '一拖多隔爆',
    unites: '副',
  },
  {
    longCode: '02.5.0080',
    materialName: '隔爆系统',
    models: '多拖多隔爆',
    unites: '套',
  },
  {
    longCode: '02.5.0050',
    materialName: '隔爆系统',
    models: '一拖二FFSP',
    unites: '件',
  },
  {
    longCode: '02.5.0051',
    materialName: '隔爆系统',
    models: '一拖三FFSP',
    unites: '件',
  },
]

//配件搜索Tab-所有配件数据
export const seekPartsData = [
  {
    id: 1,
    parts: '配件1',
  },
  {
    id: 2,
    parts: '配件2',
  },
  {
    id: 3,
    parts: '配件3',
  },
  {
    id: 4,
    parts: '配件4',
  },
  {
    id: 5,
    parts: '配件5',
  },
  {
    id: 6,
    parts: '配件6',
  },
  {
    id: 7,
    parts: '配件7',
  },
]

//配件搜索Tab-所有类型数据
export const seekTypesData = [
  {
    id: 1,
    types: '类型名1',
  },
  {
    id: 2,
    types: '类型名2',
  },
  {
    id: 3,
    types: '类型名3',
  },
  {
    id: 4,
    types: '类型名4',
  },
  {
    id: 5,
    types: '类型名5',
  },
  {
    id: 6,
    types: '类型名6',
  },
  {
    id: 7,
    types: '类型名7',
  },
]

export const orderTypesData = [
  '故障处理工单',
  '配件工单',
]