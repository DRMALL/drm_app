import React, { Component }from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, StatusBar, CameraRoll, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import ViewPager from 'react-native-viewpager'
import moment from 'moment'
import { mainColor, loginBorderColor, primaryColor, subTitleColor, contentColor } from '../../common/constants'
import { deviceSort, deviceTimeline, deviceRemarks, tokenKey } from '../../common/strings'
import { detail } from '../../styles'
import { checkToken } from '../../utils/handleToken'
import { getPort, postPort } from '../../utils/fetchMethod'
import { getDevice, getDeviceImages } from '../../apis'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const calendarIcon = require('../../images/navigation_icons/calendar.png')
const editIcon = require('../../images/navigation_icons/edit.png')
const uploadPic = require('../../images/uploadPic.png')

let fetchParams = {
  first: 6,
  groupTypes: 'All',
  assetType: 'Photos'
}

export default class Detail extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 0,
      top: 50,
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      oneDeviceData: {},
      photos: null,
    }
  }

  componentDidMount() {
    this.getOneDevice()
    // let _that = this
    // let promise = CameraRoll.getPhotos(fetchParams)
    // promise.then( data => {
    //   let edges = data.edges
    //   let photos = []
    //   for (let i in edges) {
    //       photos.push(edges[i].node.image.uri)
    //   }
    //   _that.setState({
    //       photos: photos
    //   })
    // }, err => {
    //     alert('获取照片失败！')
    // })
  }

  getOneDevice() {
    let deviceId = this.props.navigation.state.params.deviceId
    checkToken(tokenKey)
    .then(async token => {
      let res = await getPort(`${getDevice}?deviceId=${deviceId}&token=${token}`)
      if(!res) {
        alert('result is none')
      } else if(res.code == 200) {
        this.setState({
          oneDeviceData: res.data[0],
        })
      } else alert(JSON.stringify(res))
    })
  }

  onIsRefresh() {
    this.setState({isRefreshing: true})
    this.getOneDevice()
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, 1000)
  }

  pressUploadPic() {
    let { deviceId } = this.props.navigation.state.params
    checkToken(tokenKey)
    .then(async token => {
      let bodyData = {
        id: deviceId,
      }
      let res = await postPort(`${getDeviceImages}?deviceId=${deviceId}&token=${token}`, bodyData)
      if(!res) {
        alert('server error')
      } else if(res.code == 201) {
        console.log(res)
        alert('上传成功')
      } else alert(JSON.stringify(res))
    })
  }

  render() {
    let { navigation } = this.props
      , { oneDeviceData, isRefreshing, adDataSource, photos } = this.state
      , { _id, images, name, number, cc, pressure, combustible, description, timelines, createdAt, remark } = oneDeviceData
      , nameNumLength = `${name + number}`.split('').length
    // photos = photos || []
    // let photosView = []
    // for(var i = 0; i < 6 ; i += 2) {
    //   photosView.push(
    //     <View key={i} style={styles.row}>
    //       <View style={styles.flex}>
    //         <Image resizeMode="stretch" style={styles.image} source={{uri:photos[i]}}/>
    //       </View>
    //       <View style={styles.flex}>
    //         <Image resizeMode="stretch" style={styles.image} source={{uri:photos[i+1]}}/>
    //       </View>
    //     </View>
    //   )
    // }
    if (!images) return <View />
    return (
      <ScrollView 
        refreshControl={<RefreshControl 
          refreshing={isRefreshing}
          onRefresh={this.onIsRefresh.bind(this)}
          colors={['#ff0000', '#00ff00', '#0000ff']}
          progressBackgroundColor={mainColor}
        />}
      >
        <StatusBar hidden={true}/>
        <View style={detail.wrap}>
          <SwiperHeader picsData={images} navigation={navigation} pressUploadPic={this.pressUploadPic.bind(this)}/>

          

          <View style={nameNumLength > 20 ? detail.titleViewColumn : detail.titleViewRow}>
            <Text style={detail.titleText}>{name + number}</Text>
            <Text style={detail.titleTime}>{moment(createdAt).format('YYYY-MM-DD')}</Text>
          </View>
          <View style={detail.lebalView}>
            <Text style={detail.lebalText}>{cc}</Text>
            <Text style={detail.lebalText}>{pressure}</Text>
            <Text style={detail.lebalText}>{combustible}</Text>
          </View>
          <Text style={detail.ordinaryText}>{description}</Text>
          <View style={detail.fixTextView}>
            <Text style={detail.textFix}>{deviceSort}</Text>
          </View>
          <Text style={detail.sortText}>纯氧复合热载体发生器</Text>
          <View style={detail.fixTextView}>
            <Text style={detail.textFix}>{deviceTimeline}</Text>
            <View style={detail.iconView}>
              <TouchableOpacity style={detail.touchIcon} activeOpacity={0.6} onPress={()=> navigation.navigate('calendars', {deviceId: _id})} >
                <Image source={calendarIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={detail.touchIcon} activeOpacity={0.6} onPress={()=> navigation.navigate('timePoint', {deviceId: _id})} >
                <Image source={editIcon}/>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TimeLineForm timelineData={timelines == undefined ? [] : timelines} />
          </View>
          <View style={detail.fixTextView}>
            <Text style={detail.textFix}>{deviceRemarks}</Text>
            <TouchableOpacity style={detail.touchIcon} activeOpacity={0.6} onPress={()=> navigation.navigate('equipmentRemark', {deviceId: _id, orgDeviceRemark: remark})} >
              <Image source={editIcon}/>
            </TouchableOpacity>
          </View>
          <Text style={detail.ordinaryText} selectable={true}>{remark ? remark : '暂无'}</Text>
        </View>
      </ScrollView>
    )
  }
}

const SwiperHeader = props => {
  let { picsData, navigation, pressUploadPic } = props
  let picsDataView = []
  for(var i = 0; i < picsData.length+1; i++) {
    if(i == picsData.length) {
      picsDataView.push(
        <TouchUploadPic key={i} pressUploadPic={pressUploadPic}/>
      )
    } else {
      picsDataView.push(
        <View key={i} style={detail.picsView}>
          <Image style={detail.pics} source={{uri: picsData[i].url}}/>
        </View>
      )
    }
  }
  return (
    <View style={detail.headerView}>
      <Swiper height={230} dotColor={loginBorderColor} activeDotColor={mainColor}>
        {picsDataView}
      </Swiper>
      <TouchableOpacity style={detail.gobackIcon} onPress={() => navigation.goBack()}>
        <Image source={gobackWhiteIcon}/>
      </TouchableOpacity>
    </View>
  )
}

const TouchUploadPic =  props => {
  let { pressUploadPic } = props
  return (
    <TouchableOpacity style={detail.picsView} activeOpacity={0.8} onPress={()=> pressUploadPic()}>
      <Image style={detail.pics} source={uploadPic}/>
    </TouchableOpacity>
  )
}

const dateToArr = (date)=> {
  let dateArr = moment(date).format('YYYY-MM-DD').replace(/\-/, '|').split('|')
  return dateArr
}

const TimeLineForm = props => {
  let { timelineData } = props
  return (
    <View style={{paddingVertical: 10}}>
      {
        timelineData.length > 0 ? 
        timelineData.sort((a, b)=> {
          return new Date(b.line_time) - new Date(a.line_time)
        }).map((lineItem, l)=> <LineItem key={l} lineItem={lineItem} l={l} total={timelineData.length} />) : 
        <View style={{height: 50, backgroundColor: mainColor}}/>
      }
    </View>
  )
}

const LineItem = props => {
  let { lineItem, l, total } = props
    , lineItemYear = dateToArr(lineItem.line_time)[0]
    , lineItemDay = dateToArr(lineItem.line_time)[1]
  return (
    <View style={detail.oneTimeView}>
      <View style={detail.oneTimeLineView}>
        <View style={detail.dateView}>
          <Text style={detail.dateText}>{lineItemYear}</Text>
          <Text style={detail.dateText}>{lineItemDay}</Text>
        </View>
        <View style={detail.lineDrawView}>
          <View style={detail.shortTerm} />
          <View style={[detail.dotView, l%2 == 0 ? {backgroundColor: primaryColor, borderColor: primaryColor} : {}]} />
          <View style={[detail.longTerm, {flex: l == total-1 ? 0 : 1}]} />
        </View>
      </View>
      <View style={detail.contentView}>
        <Text style={detail.typeText}>{lineItem.line_type}</Text>
        <Text style={detail.contentText}>{lineItem.line_des}</Text>
      </View>
    </View>
  )
}

// {
//           picsData.map((picItem, index)=> 
//             typeof picItem == 'object' ? <View key={index} style={detail.picsView}>
//               <Image style={detail.pics} source={{uri: picItem.url}}/>
//             </View>
//              : <TouchableOpacity key={index} style={detail.picsView} activeOpacity={0.8} onPress={()=> alert('upload')}>
//               <Image style={detail.pics} source={picItem}/>
//             </TouchableOpacity>
//           )
//         }

// <View style={styles.container}>
//             {photosView}
//           </View>

// const styles = StyleSheet.create({
//   flex:{
//    flex:1
//  },
//  container: {
//    flex: 1,
//    paddingTop: 30,
//    alignItems:'center'
//  },
//  row:{
//    flexDirection: 'row'
//  },
//  image:{
//    height: 120,
//    marginTop: 10,
//    marginLeft: 5,
//    marginRight: 5,
//    borderWidth: 1,
//    borderColor: '#ddd'
//  },
// })
