
export default (keyText, eqpData)=> {
  let numText = 'NN.NN'
  eqpData = eqpData === undefined ? [] : eqpData
  eqpData.map((item, e)=> {
    var key = Object.keys(item)
    if(keyText == normReturnType(key[0])) {
      numText = item[key]
    }
  })
  return numText
}

const normReturnType = (key)=> {
  let norType = ''
  switch(key) {
    case 'nor1': norType = '氧气入口压力1';break
    case 'nor2': norType = '氧气流量1';break
    case 'nor3': norType = '氧气累计流量1';break
    case 'nor4': norType = '天然气入口压力1';break
    case 'nor5': norType = '天然气出口压力1';break
    case 'nor6': norType = '天然气流量1';break
    case 'nor7': norType = '天然气流量2';break
    case 'nor8': norType = '天然气累计流量1';break
    case 'nor9': norType = '天然气累计流量2';break
    case 'nor10': norType = '水入口压力1';break
    case 'nor11': norType = '水入口压力2';break
    case 'nor12': norType = '水泵出口压力1';break
    case 'nor13': norType = '水泵出口压力2';break
    case 'nor14': norType = '水流量1';break
    case 'nor15': norType = '水流量2';break
    case 'nor16': norType = '水累计流量1';break
    case 'nor17': norType = '水累计流量2';break
    case 'nor18': norType = '热载体温度1';break
    case 'nor19': norType = '热载体温度2';break
    case 'nor20': norType = '热载体压力1';break
    case 'nor21': norType = '热载体压力2';break
    case 'nor22': norType = '冷却水温度1';break
    case 'nor23': norType = '冷却水温度2';break
    case 'nor24': norType = '空燃比1';break
    case 'nor25': norType = '可燃气1含量';break
    case 'nor26': norType = '可燃气2含量';break
    case 'nor27': norType = '可燃气3含量';break
    case 'nor28': norType = '水箱PV';break
    case 'nor29': norType = '水箱SV';break
    case 'nor30': norType = '冷却水温度PV';break
    case 'nor31': norType = '冷取水温度SV';break
    case 'nor32': norType = '加热水箱';break
    case 'nor33': norType = '压缩空气';break
    default: null
  }
  return norType
}