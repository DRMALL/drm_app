import React, { Component }from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, WebView, StyleSheet, Keyboard, Platform } from 'react-native'
// import { RichTextEditor, RichTextToolbar } from 'react-native-zss-rich-text-editor'
// import KeyboardSpacer from 'react-native-keyboard-spacer'
import ImagePicker from 'react-native-image-crop-picker'
import { primaryColor, mainColor, subTitleColor, lightBlueColor, titleColor } from '../../common/constants'
import { pushOrder, cancel, publish, pushOrderPlaceholder1, pushOrderPlaceholder2, pushOrderPlaceholder3, tokenKey, internalServerError } from '../../common/strings'
import { pushOrderS } from '../../styles'
import { postNewOrder, postOrderUpload, postOrderDelimg } from '../../apis'
import { postPort, postFormDataPort } from '../../utils/fetchMethod'
import { checkToken } from '../../utils/handleToken'
import { orderTypesData } from '../../utils/virtualData'

const dropdownNormal = require('../../images/dropdown_normal.png')
const dropdownSelected = require('../../images/dropdown_selected.png')
const add2Icon = require('../../images/add2.png')
const deleteIcon = require('../../images/delete.png')

export default class PushOrder extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{pushOrder}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 15}} onPress={() => navigation.goBack()}>
     <Text style={{ fontSize: 15, color: '#FFF'}} >{cancel}</Text>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => navigation.state.params.pressPublishConfirm()}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{publish}</Text>
    </TouchableOpacity>,
  });

  constructor(props) {
    super(props)
    this.state = (props=> {
      let orderStateObj = {
        order_title: '',
        order_category: pushOrderPlaceholder3,
        order_content: '',
        categoryPress: false,
        richToolbarShow: false,
        worderImg: [],
        noOpen: false,
        uploadRes: { code: 201 },
      }
      orderTypesData.map((item, index)=> {
        orderStateObj[`categoryHanding${index}`] = false
      })
      return orderStateObj
    })(props)
  }

  componentDidMount() {  
    this.props.navigation.setParams({  
      pressPublishConfirm: () => this.pressPublishConfirm(), 
    })
  }

  // componentWillMount() {
  // }

  // componentWillUnmount() {
  // }

  pressPublishConfirm() {
    let { order_title, order_category, order_content } = this.state
    if(order_title == undefined || order_title == '') {
      return Alert.alert('错误', '标题不能为空',
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(order_category == undefined || order_category == pushOrderPlaceholder3) {
      return Alert.alert('错误', pushOrderPlaceholder3,
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    } else if(order_content == undefined || order_content == '') {
      return Alert.alert('错误', '反馈不能为空',
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
    Alert.alert('提示', `确认提交工单？`,
      [ {text: '取消', onPress: () => 'OK'}, 
        {text: '确定', onPress: () => this.pressPublish()}, ],
      { cancelable: false }
    )
  }

  pressPublish() {
    checkToken(tokenKey)
    .then(async token => {
      let { order_title, order_category, order_content, worderImg } = this.state
      let bodyData = {
        title: order_title,
        category: order_category,
        content: order_content,
        images: worderImg,
      }
      let res = await postPort(`${postNewOrder}?token=${token}`, bodyData)
      if(!res) {
        Alert.alert('错误', internalServerError,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 201) {
        Alert.alert('通知', '已发送',
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
        setTimeout(() => {
          this.props.navigation.goBack()
        }, 2000)
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  pressCategory() {
    this.setState({
      categoryPress: !this.state.categoryPress
    })
  }

  pressOneCategory(i) {
    let selectCHanding = !this.state[`categoryHanding${i}`]
    orderTypesData.map((item, index)=> {
      if(i == index) {
        this.setState({
          [`categoryHanding${i}`]: selectCHanding,
          order_category: selectCHanding ? item : pushOrderPlaceholder3,
          categoryPress: !this.state.categoryPress,
        })
      } else this.setState({[`categoryHanding${index}`]: false})
    })
  }

  openPicLib() {
    return new Promise((resovle, reject)=> {
      let dataToPost = [ ]
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
          resovle(dataToPost)
        }).catch(e =>
          Alert.alert('错误', '调取相册出错',
            [ {text: 'OK', onPress: () => 'OK'}, ],
            { cancelable: false }
          )
        )
      } else {
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
          resovle(dataToPost)
        }).catch(e => 
          Alert.alert('错误', '调取相册出错',
            [ {text: 'OK', onPress: () => 'OK'}, ],
            { cancelable: false }
          )
        )
      }
    })
  }

  uploadOrderImg() {
    this.setState({ noOpen: true, })
    setTimeout(()=> this.setState({ noOpen: false, }), 2000)
    checkToken(tokenKey)
    .then(token => {
      this.openPicLib().then(async (dataToPost)=> {
        let formData = new FormData()
        for(var i = 0;i < dataToPost.length; i++){
          var uri = dataToPost[i].uri
          var index = uri.lastIndexOf("\/")
          var name  = uri.substring(index + 1, uri.length)
          let file = {uri: uri, type: 'multipart/form-data', name: name } 
          formData.append('order', file)
        }
        let res = await postFormDataPort(`${postOrderUpload}?token=${token}`, formData)
        let worderImgNew = this.state.worderImg
        if(res.code == 201) {
          this.setState({
            worderImg: worderImgNew.concat([res.data]),
            uploadRes: res,
          })
        } else {
          this.setState({
            worderImg: worderImgNew,
            uploadRes: res,
          })
        }
      })
    })
  }

  delOrderImg(url) {
    checkToken(tokenKey)
    .then(async token => {
      let bodyData = {
        url: url,
      }
      let res = await postPort(`${postOrderDelimg}?token=${token}`, bodyData)
      if(!res) {
        Alert.alert('错误', `${internalServerError}或操作有误`,
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      } else if(res.code == 201) {
        let worderImgDel = []
        this.state.worderImg.forEach((imgItem, index)=> {
          if(imgItem.url !== url) {
            worderImgDel.push(imgItem)
          }
        })
        this.setState({
          worderImg: worderImgDel,
        })
      } else {
        Alert.alert('错误', JSON.stringify(res.message),
          [ {text: 'OK', onPress: () => 'OK'}, ],
          { cancelable: false }
        )
      }
    })
  }

  onChangeOtitle(order_title) {
    this.setState({ order_title })
  }

  onChangeOcontent(order_content) {
    if(order_content.split('').length > 1000) {
      Alert.alert('错误', '文本不能超过1000字',
        [ {text: 'OK', onPress: () => 'OK'}, ],
        { cancelable: false }
      )
    }
    this.setState({ order_content })
  }

  render() {
    let { categoryPress, order_category, richToolbarShow, worderImg, noOpen, uploadRes } = this.state
      , renderOrderImg = []
    for(var i = 0; i < worderImg.length+1; i++) {
      if(i == worderImg.length && i < 6) {
        renderOrderImg.push(
          <TouchableOpacity key={i} onPress={()=> this.uploadOrderImg()} disabled={noOpen}>
            <Image style={pushOrderS.worderImage} source={add2Icon}/>
          </TouchableOpacity>
        )
      } else if(i < 6) {
        let worderImgUrl = `${worderImg[i].url}`
        renderOrderImg.push(
          <View key={i} >
            <Image style={pushOrderS.worderImage} source={{uri: worderImg[i].url}}/>
            <TouchableOpacity style={{position: 'absolute', bottom: 11, right: 11}} onPress={()=> this.delOrderImg(worderImgUrl)}>
              <Image style={{width: 30, height: 30,}} source={deleteIcon}/>
            </TouchableOpacity>
          </View>
        )
      }
    }
    return (
      <ScrollView style={pushOrderS.wrap}>
        <TextInput 
          style={pushOrderS.textInput}
          placeholder={pushOrderPlaceholder1} 
          placeholderTextColor={subTitleColor}
          underlineColorAndroid='transparent'
          maxLength={128}
          onChangeText={this.onChangeOtitle.bind(this)}
          selectTextOnFocus={true}
          autoCapitalize='none'
        />
        <View style={pushOrderS.empty}/>
        <TouchableOpacity style={pushOrderS.categoryTouch} 
          activeOpacity={0.8} 
          onPress={this.pressCategory.bind(this)}
        > 
          <Text style={[pushOrderS.touchText, categoryPress ? {color: lightBlueColor} : (order_category != pushOrderPlaceholder3 ? { color: titleColor } : {})]}>{order_category}</Text>
          <Image style={pushOrderS.touchImg} source={categoryPress ? dropdownSelected : dropdownNormal}/>
        </TouchableOpacity>
        <View>
          {
            orderTypesData.map((otypeItem, indexo)=> 
            <TouchableOpacity key={indexo} 
              style={[categoryPress ? pushOrderS.oneCategoryTouch : {height: 0}, 
                      this.state[`categoryHanding${indexo}`] ? {backgroundColor: lightBlueColor} : {}
                    ]} 
              activeOpacity={0.8} 
              onPress={()=> this.pressOneCategory(indexo)}
            >
              <Text style={[pushOrderS.oneCategoryText, this.state[`categoryHanding${indexo}`] ? {color: mainColor} : {}]}>
                {otypeItem}
              </Text>
            </TouchableOpacity>)
          }
        </View>
        <View style={pushOrderS.empty}/>
        <View style={pushOrderS.worderImageView}>
          { renderOrderImg }
        </View>
        <Text style={[pushOrderS.warningText, uploadRes && uploadRes.code == 201 ? {display: 'none'} : {}]}>{ !uploadRes.code ? internalServerError : (uploadRes.code == 413 ? '图片过大或数量超限' : (uploadRes.code == 201 ? '' : uploadRes.message))}</Text>
        <TextInput 
          style={[pushOrderS.textInput2, {marginTop: 15}]} 
          placeholder={pushOrderPlaceholder2} 
          placeholderTextColor={subTitleColor}
          multiline={true} 
          numberOfLines={50} 
          underlineColorAndroid='transparent'
          maxLength={1001}
          onChangeText={this.onChangeOcontent.bind(this)}
          selectTextOnFocus={true}
          autoCapitalize='none'
        />
      </ScrollView>
    )
  }
}

// {
//   <View style={styles.container}>
//           <RichTextEditor
//               ref={(r)=>this.richtext = r}
//               style={styles.richText}
//               initialTitleHTML={null}
//               initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
//               editorInitializedCallback={() => this.onEditorInitialized()}
//           />
//           <RichTextToolbar getEditor={() => this.richtext}/>
//         </View> 
//         <KeyboardSpacer/>
// }

  // onEditorInitialized() {
  //   this.setFocusHandlers();
  //   this.getHTML();
  // }

  // async getHTML() {
  //   const titleHtml = await this.richtext.getTitleHtml();
  //   const contentHtml = await this.richtext.getContentHtml();
  //   //alert(titleHtml + ' ' + contentHtml)
  // }

  // setFocusHandlers() {
  //   this.richtext.setTitleFocusHandler(() => {
  //     //alert('title focus');
  //   });
  //   this.richtext.setContentFocusHandler(() => {
  //     //alert('content focus');
  //   });
  // }

  // this.getHTML = this.getHTML.bind(this);
    // this.setFocusHandlers = this.setFocusHandlers.bind(this);

// <KeyboardAvoidingView behavior={'padding'} >
// </KeyboardAvoidingView>