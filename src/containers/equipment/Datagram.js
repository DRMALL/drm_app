import React, { Component }from 'react'
import { View, Text, Image, ListView, TouchableOpacity, WebView, Dimensions, Alert } from 'react-native'
import { primaryColor, contentColor, mainColor, backgroundColor, loginBackgroundColor } from '../../common/constants'
import { tokenKey, internalServerError } from '../../common/strings'
import { other } from '../../styles'
import { getMoniterdevsNumField } from '../../apis'
import { getPort } from '../../utils/fetchMethod'
import { checkToken } from '../../utils/handleToken'
// import SplashScreen from 'react-native-splash-screen'

// import store from '../../utils/store'

const datagramPic = require('../../images/datagram.png')
const cancelIcon = require('../../images/navigation_icons/cancel.png')

export default class Datagram extends Component {
  static navigationOptions = {
    headerStyle: {
      width: '200%',
      height: 0,
      left: -50,
      backgroundColor: primaryColor,
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      winWidth: Dimensions.get('window').width,
      winHeight: Dimensions.get('window').height,
      gramdata: null,
    }
  }

  componentDidMount() {
    // store.getState().statu.socketIo.close()
    if(this.props.navigation.state.params) {
      this.getMoniterDevOne()
    }
  }

  getMoniterDevOne() {
    let { gramNumber, gramField } = this.props.navigation.state.params
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getMoniterdevsNumField}?number=${gramNumber}&field=${gramField}&token=${token}`)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        this.setState({
          gramdata: res.data.values
        })
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  onLayoutChange() {
    this.setState({
      winWidth: Dimensions.get('window').width,
      winHeight: Dimensions.get('window').height,
    })
  }

  scriptContentFun() {
    let dataData = []
      , startTime = 9999999999999
      , { gramdata } = this.state
      , dataLen = gramdata && gramdata.length > 1 ? gramdata.length : 1
      , dateDataNum = new Date().getTime()
    if(gramdata) {
      gramdata.forEach((item)=> {
        startTime = startTime > item.timeStamp ? item.timeStamp : startTime
        dataData.push(`[${item.timeStamp}, ${Math.floor(Number(item.num)*10)/10}],`)
      })
    } else {
      startTime = 1000*60*30
      for(var i = 0; i < 10; i++) {
        dataData.push(`[${(dateDataNum - 86400000*i)}, ${Math.floor(0*10)/10}],`)    //Math.floor(Math.random() * (1001))
      }
    }
    dataData.splice(0, 0, '[')
    dataData.push(']')
    const scriptContent = `
      var myChart = echarts.init(document.getElementById('main'));
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        axisPointer: {
          link: {xAxisIndex: 'all'},
          label: {
            backgroundColor: '#777'
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
        },
        dataZoom: [
          {
            startValue: ${startTime - dataLen*1000*60*30},
          },
          {
            type: 'slider',
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2,
            },
            dataBackground: {
              areaStyle: {
                color: 'rgba(0,0,0,.01)',
              },
            },
          },
          {
            type: 'inside',
          }
        ],
        series: [
          {
            name: 'DRM设备指标数据',
            type: 'line',
            connectNulls: true,
            showSymbol: false,
            smooth: true,
            lineStyle: {
              normal: {
                color: '#ec0996',
              },
            },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#da9825',
                  }, {
                    offset: 1, color: '#bc345d',
                  }],
                  globalCoord: false,
                },
              },
            },
            data: ${dataData.join('')},
          }
        ]
      };
      myChart.setOption(option);
    `
    return scriptContent
  }

  render() {
    let { navigation } = this.props
      , { winWidth, winHeight, gramdata } = this.state
      // , winWidth = Dimensions.get('window').width
      // , winHeight = Dimensions.get('window').height
    let htmlContent = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>ECharts</title>
          <script src="http://echarts.baidu.com/dist/echarts.js"></script>
          <script src="http://momentjs.cn/downloads/moment.min.js"></script>
        </head>
        <body style="background-color: #F7F7F7;">
          <div id="main" style="width: ${winWidth < winHeight ? (winWidth - 20) : winWidth}px; height: ${winWidth < winHeight ? 240 : winHeight - 100}px;"></div>
        </body>
      </html>`
    if(!gramdata && navigation.state.params) return <View />
    return(
      <View onLayout={this.onLayoutChange.bind(this)} style={{height: '100%', width: '100%', paddingVertical: 10, paddingHorizontal: 20, paddingTop: 40, backgroundColor: loginBackgroundColor}}>
        <TouchableOpacity style={{position: 'absolute', padding: 10}} onPress={()=> navigation.goBack()}>
          <Image style={{resizeMode: 'contain'}} source={cancelIcon}/>
        </TouchableOpacity>
        <WebView
          style={{height: '100%', backgroundColor: loginBackgroundColor}}
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          injectedJavaScript={this.scriptContentFun()}
          source={{html: htmlContent}}
          decelerationRate='fast'
        />
      </View>
    )
  }
}

// componentDidMount() {
//     setTimeout(() => {
//       SplashScreen.hide()
//     }, 2000)
//   }

      // window.addEventListener('resize', ()=> 
      //   element.stye.width = window.clientWidth
      // )

            // axisLabel: {
            //   formatter: function (value, index) {
            //     var date = new Date(value);
            //     var yearMonDay = [date.getFullYear(), (date.getMonth() + 1), date.getDate()];
            //     var houres = [yearMonDay.join('/'), date.getHours() + '时']
            //     var minutes = [yearMonDay.join('/'), date.getHours() + ':' + date.getMinutes() ]
            //     if(date.getMinutes() != 0) return minutes.join(' ')
            //     else if(date.getHours() != 0) return houres.join(' ')
            //     return yearMonDay.join('/');
            //   },
            // },

//         <Image style={{width: '100%', height: 200, resizeMode: 'contain'}} source={datagramPic}/>