import React, { Component }from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { primaryColor, mainColor, subTitleColor, lightBlueColor, titleColor } from '../../common/constants'
import { pushOrder, cancel, publish, pushOrderPlaceholder1, pushOrderPlaceholder2, pushOrderPlaceholder3 } from '../../common/strings'
import { pushOrderS } from '../../styles'
import { postNewOrder } from '../../apis'
import { postPort } from '../../utils/fetchMethod'
import { checkToken } from '../../utils/handleToken'
import { orderTypesData } from '../../utils/virtualData'

const dropdownNormal = require('../../images/dropdown_normal.png')
const dropdownSelected = require('../../images/dropdown_selected.png')
let titleData
  , categoryData
  , contentData

export default class PushOrder extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitle: <Text style={{ fontSize: 20, color: '#FFF', alignSelf: 'center' }} >{pushOrder}</Text>,
    headerLeft: <TouchableOpacity style={{padding: 10, paddingLeft: 15}} onPress={() => navigation.goBack()}>
     <Text style={{ fontSize: 15, color: '#FFF'}} >{cancel}</Text>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={{padding: 10, paddingRight: 15}} onPress={() => PushOrder.pressPublish(navigation)}>
      <Text style={{ fontSize: 15, color: '#FFF'}} >{publish}</Text>
    </TouchableOpacity>,
  });

  static pressPublish(navigation) {
    checkToken('drmAppToken')
    .then(async token => {
      let bodyData = {
        title: titleData,
        category: categoryData,
        content: contentData,
      }
      let res = await postPort(`${postNewOrder}?token=${token}`, bodyData)
      if(!res) {
        alert('server error')
      } else if(res.code == 201) {
        alert('已发送')
        setTimeout(() => {
          navigation.goBack()
        }, 2000)
      } else alert(JSON.stringify(res.message))
    })
  }

  constructor(props) {
    super(props)
    this.state = (props=> {
      let orderStateObj = {
        order_title: '',
        order_category: pushOrderPlaceholder3,
        order_content: '',
        categoryPress: false,
      }
      orderTypesData.map((item, index)=> {
        orderStateObj[`categoryHanding${index}`] = false
      })
      return orderStateObj
    })(props)
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
        categoryData = item
      } else this.setState({[`categoryHanding${index}`]: false})
    })
  }

  onChangeOtitle(order_title) {
    this.setState({ order_title })
    titleData = order_title
  }

  onChangeOcontent(order_content) {
    this.setState({ order_content })
    contentData = order_content
  }

  render() {
    let { categoryPress, order_category } = this.state
    return (
      <View style={pushOrderS.wrap}>
        <TextInput 
          style={pushOrderS.textInput}
          placeholder={pushOrderPlaceholder1} 
          placeholderTextColor={subTitleColor}
          underlineColorAndroid='transparent'
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
          onChangeText={this.onChangeOcontent.bind(this)}
          selectTextOnFocus={true}
          autoCapitalize='none'
        />
      </View>
    )
  }
}