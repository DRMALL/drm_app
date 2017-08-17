import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { primaryColor, mainColor } from '../../common/constants'
import { unsolvedGoToPushOrder, tokenKey } from '../../common/strings'
import { diagDetail } from '../../styles'
import Button from '../../components/units/Button'
import ShareModal from '../../components/units/ShareModal'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getBug } from '../../apis'
import { diagnosisData } from '../../utils/virtualData'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const shareIcon = require('../../images/navigation_icons/share.png')

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
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 20}} onPress={()=> navigation.state.params.share()}>
      <Image source={shareIcon}/>
    </TouchableOpacity>,
  });

  constructor(props) {
    super(props)
    this.state = {
      oneBugData: {},
      shareShow: false,
      topView: {position: 'relative', zIndex: 3},
      nextView: {position: 'absolute', zIndex: 2},
    }
  }
  componentDidMount () {  
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
        alert('result is none')
      } else if(res.code == 200) {
        this.setState({
          oneBugData: res.data,
        })
      } else alert(JSON.stringify(res))
    })
  }

  pressShareCancel() {
    this.setState({
      shareShow: false,
    })
  }

  render() {
    let { navigation } = this.props
      , { oneBugData, shareShow, topView, nextView } = this.state
      , { categoryText } = navigation.state.params
    return (
      <View>
        <ScrollView style={[diagDetail.wrap, shareShow ? nextView : topView]}>
          <Text style={diagDetail.titleText}>{oneBugData.title}</Text>
          <Text style={diagDetail.kindText}>{categoryText}</Text>
          <Text style={diagDetail.contentText}>{oneBugData.content}</Text>
          
          <View style={diagDetail.buttonView}>
            <Button 
              style={diagDetail.button} 
              title={unsolvedGoToPushOrder} 
              titleStyle={{fontSize: 14, color: mainColor}} 
              activeOpacity={0.8} 
              onPress={()=> navigation.navigate('pushOrder', {name: 'PushOrder'})}
            />
          </View>
        </ScrollView>
        <ShareModal state={this.state} pressShareCancel={this.pressShareCancel.bind(this)}/>
      </View>
    )
  }
}

// <Image style={diagDetail.img} source={diagItemData.pic}/>
//         <Text style={diagDetail.contentText}>{diagItemData.returnDescribe}</Text>