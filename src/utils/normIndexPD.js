
export default (keyText, eqpData)=> {
  let numText = 'NN.NN'
  eqpData = eqpData === undefined ? [] : eqpData
  eqpData.map((item, e)=> {
    if(keyText == normReturnType(item.key)) {
      numText = item.value
    }
  })
  return numText
}

const normReturnType = (key)=> {
  let normType = ''
  switch(key) {
    case 'norm1': normType = '氧气入口压力1';break
    case 'norm2': normType = '氧气流量1';break
    case 'norm3': normType = '氧气累计流量1';break
    case 'norm4': normType = '天然气入口压力1';break
    case 'norm5': normType = '天然气出口压力1';break
    case 'norm6': normType = '天然气流量1';break
    case 'norm7': normType = '天然气流量2';break
    case 'norm8': normType = '天然气累计流量1';break
    case 'norm9': normType = '天然气累计流量2';break
    case 'norm10': normType = '水入口压力1';break
    case 'norm11': normType = '水入口压力2';break
    case 'norm12': normType = '水泵出口压力1';break
    case 'norm13': normType = '水泵出口压力2';break
    case 'norm14': normType = '水流量1';break
    case 'norm15': normType = '水流量2';break
    case 'norm16': normType = '水累计流量1';break
    case 'norm17': normType = '水累计流量2';break
    case 'norm18': normType = '热载体温度1';break
    case 'norm19': normType = '热载体温度2';break
    case 'norm20': normType = '热载体压力1';break
    case 'norm21': normType = '热载体压力2';break
    case 'norm22': normType = '冷却水温度1';break
    case 'norm23': normType = '冷却水温度2';break
    case 'norm24': normType = '空燃比1';break
    case 'norm25': normType = '可燃气1含量';break
    case 'norm26': normType = '可燃气2含量';break
    case 'norm27': normType = '可燃气3含量';break
    case 'norm28': normType = '水箱PV';break
    case 'norm29': normType = '水箱SV';break
    case 'norm30': normType = '冷却水温度PV';break
    case 'norm31': normType = '冷取水温度SV';break
    case 'norm32': normType = '加热水箱';break
    case 'norm33': normType = '压缩空气';break
    default: null
  }
  return normType
}