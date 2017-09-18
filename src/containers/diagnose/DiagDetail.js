import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, WebView, Dimensions, RefreshControl, Platform } from 'react-native'
import { primaryColor, mainColor } from '../../common/constants'
import { unsolvedGoToPushOrder, tokenKey, internalServerError } from '../../common/strings'
import { diagDetail } from '../../styles'
import Button from '../../components/units/Button'
import ShareModal from '../../components/units/ShareModal'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getBug } from '../../apis'
import { diagnosisData } from '../../utils/virtualData'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const emptyIcon = require('../../images/navigation_icons/empty.png')
const shareIcon = require('../../images/navigation_icons/share.png')

let windowWidth = Math.round((Dimensions.get('window').width-60))

export default class DiagDetail extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 10, marginHorizontal: 10 }}>
        <Text style={{ fontSize: 18, color: '#FFF', alignSelf: 'center' }} >{navigation.state.params.bugsTitle}</Text>
      </View>
    </ScrollView>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 20}} onPress={()=> ''}>
      <Image source={emptyIcon}/>
    </TouchableOpacity>,
  });
  //navigation.state.params.share()
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      oneBugData: {},
      shareShow: false,
      topView: {position: 'relative', zIndex: 3},
      nextView: {position: 'absolute', zIndex: 2},
      wbHeight: 0,
    }
  }
  
  componentDidMount() {  
    this.setState({wbHeight: 0})
    this.props.navigation.setParams({  
      share: () => this.shareFun(), 
    })
    this.getOneBug()
  }

  shareFun() {  
    this.setState({
      shareShow: true,
    })
  }

  getOneBug() {
    let bugsId = this.props.navigation.state.params.bugsId
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getBug}?id=${bugsId}&token=${token}`)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 200) {
        this.setState({
          oneBugData: res.data,
        })
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  onIsRefresh() {
    this.setState({isRefreshing: true})
    this.getOneBug()
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, 2000)
  }

  pressShareCancel() {
    this.setState({
      shareShow: false,
    })
  }

  webviewNavigationChange(navState) {
    let height = parseInt(navState.title) || 500
    if(height > 0) {
      this.setState({wbHeight: height + 100})
    }
  }

  render() {
    let { navigation } = this.props
      , { oneBugData, shareShow, topView, nextView, isRefreshing, wbHeight } = this.state
      , { categoryText } = navigation.state.params
      , contentLength = oneBugData.content ? oneBugData.content.split('').length : 0
    return (
      <View>
        <View style={[diagDetail.wrap, shareShow ? nextView : topView]}>
          <ScrollView 
            style={{height: '100%'}}
            refreshControl={<RefreshControl 
              refreshing={isRefreshing}
              onRefresh={this.onIsRefresh.bind(this)}
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor={mainColor}
            />}
          >
            <Text style={diagDetail.titleText}>{oneBugData.title}</Text>
            <Text style={diagDetail.kindText}>{categoryText}</Text>
            <View style={{ paddingHorizontal: 16, height: wbHeight }}>
              <WebView 
                style={{height: '100%'}}
                automaticallyAdjustContentInsets={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                // scrollEnabled={false}
                injectedJavaScript={Platform.OS === 'ios' ? this.handleDiagDomIos() : this.handleDiagDomAndroid()}
                onNavigationStateChange={this.webviewNavigationChange.bind(this)}
                source={{html: oneBugData.content}}
                decelerationRate='fast'
              />
            </View>
          </ScrollView>
          <View style={diagDetail.buttonView}>
            <Button 
              style={diagDetail.button} 
              title={unsolvedGoToPushOrder} 
              titleStyle={{fontSize: 14, color: mainColor}} 
              activeOpacity={0.8} 
              onPress={()=> navigation.navigate('pushOrder', {name: 'PushOrder'})}
            />
          </View>
        </View>
        <ShareModal state={this.state} pressShareCancel={this.pressShareCancel.bind(this)}/>
      </View>
    )
  }

  handleDiagDomIos() {
    const injectdScript = `
      const arr = document.getElementsByTagName(\"img\");
      var height = null;
      for (var i = 0; i < arr.length; i ++) {
        arr[i].width = ${windowWidth};
      }
      document.title = document.documentElement.scrollHeight;
    `
    return injectdScript
  }

  handleDiagDomAndroid() {
    const injectdScript = `
      const arr = document.getElementsByTagName(\"img\");
      var height = null;
      for (var i = 0; i < arr.length; i ++) {
        arr[i].width = ${windowWidth};
      }
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
}

// <Text style={diagDetail.contentText}>{oneBugData.content}</Text>
// <Image style={diagDetail.img} source={diagItemData.pic}/>
//         <Text style={diagDetail.contentText}>{diagItemData.returnDescribe}</Text>