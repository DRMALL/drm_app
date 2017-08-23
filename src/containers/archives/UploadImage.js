import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Platform, Alert, StatusBar, Dimensions } from 'react-native'
import { NavigationActions } from 'react-navigation'
import ImagePicker from 'react-native-image-crop-picker'
import { primaryColor, loginBackgroundColor } from '../../common/constants'
import { tokenKey, deviceLabel } from '../../common/strings'
import { uploadImage } from '../../styles'
import { checkToken } from '../../utils/handleToken'
import { postFormDataPort } from '../../utils/fetchMethod'
import { postDeviceImages } from '../../apis'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const deleteIcon = require('../../images/delete.png')
const addIcon = require('../../images/add.png')
let dataToPost = []

export default class UploadImage extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >图片信息</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 20}} onPress={() => navigation.goBack()}>
      <Image source={gobackWhiteIcon}/>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={()=> navigation.state.params.commitPageConfirm()}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >上传</Text>
    </TouchableOpacity>,
  });

  constructor(props){
    super(props)
    this.state={
      images: [],
      showPic: false,
      imgData: null,
      actionButtonShow: false,
      topView: {position: 'relative', zIndex: 3},
      nextView: {position: 'absolute', zIndex: 2},
    }
  }

  componentWillMount(){
    this.props.navigation.setParams({
      commitPageConfirm: this.commitPageConfirm.bind(this),
    })
  }

  commitPageConfirm() {
    if(this.state.images[0] == null){
      Alert.alert('警告', '没有选择图片',
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else {
      Alert.alert('提示', `确认上传这${this.state.images.length}张图片`,
        [ {text: '取消', onPress: () => 'OK'}, 
          {text: '确定', onPress: () => this.commitPage()}, ],
        { cancelable: false }
      )
    }
  }

  actionShow(stateField, imgData) {
    this.setState({
      [`${stateField}`]: !this.state[`${stateField}`],
      imgData: !this.state[`${stateField}`] ? imgData : null,
    })
  }

  //拍照
  pickSingleWithCamera() {
    dataToPost = this.state.images
    ImagePicker.openCamera({
      cropping: false,
      width: Math.round((Dimensions.get('window').width-20)),
      height: 300,
    }).then(image => {
      dataToPost.push({
        uri: image.path,
        width: image.width,
        height: image.height,
      })
      this.setState({
        images: dataToPost,
        actionButtonShow: false,
      })
    }).catch(e => 
      Alert.alert('错误', '调取拍照出错',
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    )
  }

  //相册
  openPicLib() {
    dataToPost = this.state.images
    if(Platform.OS === 'ios'){
      ImagePicker.openPicker({
        width: 480,
        height: 300,
        multiple: true,
        waitAnimationEnd: false,
        compressImageQuality: 0.5,
        mediaType: 'photo',
      }).then(images => {
        for (var i=0; i<images.length; i++) {
          dataToPost.push({
            uri: images[i].path,
            width: images[i].width,
            height: images[i].height,
            mime: images[i].mime,
          })
        }
        this.setState({
          images: dataToPost,
          actionButtonShow: false,
        })
      }).catch(e =>
        Alert.alert('错误', '调取相册出错',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      )
    }else{
      ImagePicker.openPicker({
        width: 480,
        height: 300,
        cropping: false,
        cropperCircleOverlay: false,
        compressImageMaxWidth: 480,
        compressImageMaxHeight: 640,
        compressImageQuality: 0.5,
        mediaType: 'photo',
        compressVideoPreset: 'MediumQuality'
      }).then(image => {
        dataToPost.push({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime
        })
        this.setState({
          images: dataToPost,
          actionButtonShow: false,
        })
      }).catch(e => 
        Alert.alert('错误', '调取相册出错',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      )
    }
  }

  //上传
  commitPage() {
    let formData = new FormData()
      , { deviceId } = this.props.navigation.state.params
    dataToPost = []
    for(var i = 0;i < this.state.images.length; i++){
      var uri = this.state.images[i].uri
      var index = uri.lastIndexOf("\/")
      var name  = uri.substring(index + 1, uri.length)
      let file = {uri: uri, type: 'multipart/form-data', name: name } 
      formData.append('devices', file)
    }
    checkToken(tokenKey)
    .then(async token => {
      let res = await postFormDataPort(`${postDeviceImages}?deviceId=${deviceId}&token=${token}`, formData)
      if(!res) {
        Alert.alert('错误', 'Internal Server Error',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 413) {
        Alert.alert('错误', '图片过大',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 201) {
        this.setState({
          images: [],
          actionButtonShow: false,
        })
        Alert.alert('成功', '已上传',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ 
              routeName: 'main', 
              params: {},
              action: NavigationActions.navigate({ routeName: `${deviceLabel}`}),
            }),
            NavigationActions.navigate({ 
              routeName: 'detail', 
              params: {
                deviceId: deviceId, 
              }, 
            })
          ]
        })
        this.props.navigation.dispatch(resetAction)
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  deletePic(len) {
    let newImages = []
    this.state.images.map((imageOne, index)=> {
      if(len == index) newImages = newImages
      else {
        newImages.push(imageOne)
      }
    })
    this.setState({
      images: newImages,
    })
    dataToPost = newImages
  }

  renderImage(image, mainView, len) {
    let imagesLength = this.state.images.length
    return (
      <View>
        <View style={{ alignItems: 'center', paddingHorizontal: 16, paddingTop: 10}}>
          <Image style={{width: '100%', height: 230, resizeMode: 'contain' }} source={image} />
          <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 26}} onPress={()=> this.deletePic(len)}>
            <Image source={deleteIcon}/>
          </TouchableOpacity>
        </View>
        {
          (len+1) == imagesLength ? mainView : null
        }
      </View>
    )
  }

  render(){
    let { topView, nextView, actionButtonShow, showPic } = this.state
      , mainView
    if(this.state.images != null && this.state.images.length >= 6){
      mainView = null
    }else{
      mainView = <TouchableOpacity style={uploadImage.addPicTouch} onPress={()=>{this.actionShow('actionButtonShow')}} activeOpacity={0.7} >
        <Image style={{width: '100%', height: 180, resizeMode: 'contain' }} source={addIcon}/>
      </TouchableOpacity>
    }
    return(
      <View style={{height: '100%', width: '100%'}}>
      <StatusBar backgroundColor={primaryColor} barStyle='light-content'/>
        <View style={[nextView, {height: '100%', width: '100%'}]}>
          {
            //<Image style={uploadImage.addPicImg} source={addPicIcon} />
            // <View style={uploadImage.addPicView}>
            //   <Text style={uploadImage.addPicText}>+</Text>
            // </View>
            this.state.images.length == 0 ? mainView : null
          }
          <ScrollView>
            {this.state.images ? this.state.images.map((i, len) => <View key={i.uri}>{this.renderImage(i, mainView, len)}</View>) : null}
          </ScrollView>
        </View>
        <View style={[topView, actionButtonShow ? {} : {height: 0}]}>
          <TouchableOpacity onPress={()=> this.actionShow('actionButtonShow')}>
            <View style={uploadImage.halfOpacityView}/>
          </TouchableOpacity>
          <View style={uploadImage.actionShowView}>
            <TouchableOpacity style={uploadImage.actionButton} onPress={()=> this.openPicLib()}>
              <Text style={uploadImage.actionText}>从相册选取</Text>
            </TouchableOpacity>
            <TouchableOpacity style={uploadImage.actionButton} onPress={()=> this.pickSingleWithCamera()}>
              <Text style={uploadImage.actionText}>拍照一张</Text>
            </TouchableOpacity>
            <View style={{height: 10}}/>
            <TouchableOpacity style={uploadImage.actionButton} onPress={()=> this.actionShow('actionButtonShow')}>
              <Text style={uploadImage.actionText}>关闭</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
