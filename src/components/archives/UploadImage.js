import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Platform, Alert, StatusBar, Dimensions } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { primaryColor, loginBackgroundColor } from '../../common/constants'
import { tokenKey } from '../../common/strings'
import { uploadImage } from '../../styles'
import { checkToken } from '../../utils/handleToken'
import { postFormDataPort } from '../../utils/fetchMethod'
import { postDeviceImages } from '../../apis'

const gobackWhiteIcon = require('../../images/navigation_icons/goback_white.png')
const addPicIcon = require('../../images/addPic.png')
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
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={()=> navigation.state.params.commitPage()}>
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
      commitPage: this.commitPage.bind(this),
    })
  }

  actionShow(stateField, imgData) {
    this.setState({
      [`${stateField}`]: !this.state[`${stateField}`],
      imgData: !this.state[`${stateField}`] ? imgData : null,
    })
  }

  //拍照
  pickSingleWithCamera() {
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
        images: dataToPost
      })
    }).catch(
      e => alert(e)
    )
  }

  //相册
  openPicLib() {
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
          images: dataToPost
        })
      }).catch(e =>
        alert(e)
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
          images: dataToPost
        })
      }).catch(e => {
        Alert.alert(e.message
          ? e.message
          : e)
      })
    }
  }

  //上传
  commitPage() {
    let formData = new FormData()
      , { deviceId } = this.props.navigation.state.params
    if(this.state.images[0] == null){
      Alert.alert('⚠️警告', '没有选择图片',
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else {
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
          alert('result is null')
        } else if(res.code == 413) {
          Alert.alert('❌错误', '图片过大',
            [ {text: 'OK', onPress: () => 'OK'}, ],
            { cancelable: false }
          )
        } else if(res.code == 201) {
          this.setState({
            images: [],
          })
          Alert.alert('✅成功', '已上传',
            [ {text: 'OK', onPress: () => 'OK'}, ],
            { cancelable: false }
          )
        } else alert(JSON.stringify(res))
      })
    }
  }

  renderImage(image) {
    return <TouchableOpacity style={{ alignItems: 'center', paddingHorizontal: 16}} onPress={()=> ''}>
      <Image style={{width: 250, height: 250, resizeMode: 'contain' }} source={image} />
    </TouchableOpacity>
  }

  render(){
    let { topView, nextView, actionButtonShow, showPic } = this.state
      , mainView
    if(this.state.images != null && this.state.images.length >= 6){
      mainView = null
    }else{
      mainView = <TouchableOpacity style={uploadImage.addPicTouch} onPress={()=>{this.actionShow('actionButtonShow')}}>
        <Image style={uploadImage.addPicImg} source={addPicIcon} />
      </TouchableOpacity>
    }
    return(
      <View style={{height: '100%', width: '100%'}}>
      <StatusBar hidden={false} backgroundColor={primaryColor} />
        <View style={[nextView, {height: '100%', width: '100%'}]}>
          <ScrollView>
            {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderImage(i)}</View>) : null}
          </ScrollView>
          <View style={uploadImage.addPicView}>
            {mainView}
          </View>
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
