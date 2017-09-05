import React, { Component }from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, WebView, StyleSheet, Keyboard } from 'react-native'
import { RichTextEditor, RichTextToolbar } from 'react-native-zss-rich-text-editor'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { primaryColor, mainColor, subTitleColor, lightBlueColor, titleColor } from '../../common/constants'
import { pushOrder, cancel, publish, pushOrderPlaceholder1, pushOrderPlaceholder2, pushOrderPlaceholder3, tokenKey, internalServerError } from '../../common/strings'
import { pushOrderS } from '../../styles'
import { postNewOrder } from '../../apis'
import { postPort } from '../../utils/fetchMethod'
import { checkToken } from '../../utils/handleToken'
import { orderTypesData } from '../../utils/virtualData'

const dropdownNormal = require('../../images/dropdown_normal.png')
const dropdownSelected = require('../../images/dropdown_selected.png')

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
      }
      orderTypesData.map((item, index)=> {
        orderStateObj[`categoryHanding${index}`] = false
      })
      return orderStateObj
    })(props)
    this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }

  componentDidMount() {  
    this.props.navigation.setParams({  
      pressPublishConfirm: () => this.pressPublishConfirm(), 
    })
  }

  // componentWillMount() {
  //   this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this))
  //   this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this))
  // }

  // _keyboardDidShow(e){
  //     this.setState({
  //       richToolbarShow: true,
  //     })
  //   }

  // _keyboardDidHide(e){
  //   this.setState({
  //     richToolbarShow: false,
  //   })
  // }

  // componentWillUnmount() {
  //   this.keyboardDidShowListener.remove()
  //   this.keyboardDidHideListener.remove()
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
      let { order_title, order_category, order_content } = this.state
      let bodyData = {
        title: order_title,
        category: order_category,
        content: order_content,
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

  onChangeOtitle(order_title) {
    this.setState({ order_title })
  }

  onChangeOcontent(order_content) {
    this.setState({ order_content })
  }

  render() {
    let { categoryPress, order_category, richToolbarShow } = this.state
      , bodyForDisplay = '<p>Wow this is an <b>AMAZING</b> demo!</p>'
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
        
        <TextInput 
          style={[pushOrderS.textInput2, {marginTop: 15}]} 
          placeholder={pushOrderPlaceholder2} 
          placeholderTextColor={subTitleColor}
          multiline={true} 
          numberOfLines={50} 
          underlineColorAndroid='transparent'
          maxLength={1000}
          onChangeText={this.onChangeOcontent.bind(this)}
          selectTextOnFocus={true}
          autoCapitalize='none'
        />
      </ScrollView>
    )
  }

  onEditorInitialized() {
    this.setFocusHandlers();
    this.getHTML();
  }

  async getHTML() {
    const titleHtml = await this.richtext.getTitleHtml();
    const contentHtml = await this.richtext.getContentHtml();
    //alert(titleHtml + ' ' + contentHtml)
  }

  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
      //alert('title focus');
    });
    this.richtext.setContentFocusHandler(() => {
      //alert('content focus');
    });
  }
}

// const styles = StyleSheet.create({
//   container: {
//     height: 480,
//     flexDirection: 'column',
//     backgroundColor: '#fff',
//     paddingTop: 40,
//   },
//   richText: {
//     height: '100%',
//     alignItems:'center',
//     justifyContent: 'center',
//     backgroundColor: 'transparent',
//   },
// });

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

  

// <KeyboardAvoidingView behavior={'padding'} >
// </KeyboardAvoidingView>