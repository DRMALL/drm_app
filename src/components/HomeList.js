import React from 'react'
import { View, Text, Image, ListView, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { mainColor, contentColor } from '../common/constants'
import { inTheEnd } from '../common/strings'
import { home } from '../styles'
import EmptyContent from '../components/units/EmptyContent'

const picMaskIcon = require('../images/navigation_icons/pic_mask.png')

export default props => {
  let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  })
  let finalDs = ds.cloneWithRows(props.data)
    , dataLength = props.data.length
  if(dataLength == 0) return (
    <ScrollView
      refreshControl={<RefreshControl 
        refreshing={props.isRefreshing}
        onRefresh={props.onHomeRefresh}
        colors={['#ff0000', '#00ff00', '#0000ff']}
        progressBackgroundColor={mainColor}
        title='下拉刷新'
        titleColor={contentColor}
      />}
    >
      <EmptyContent />
    </ScrollView>
  )
  return(
    <ListView 
      refreshControl={<RefreshControl 
        refreshing={props.isRefreshing}
        onRefresh={props.onHomeRefresh}
        colors={['#ff0000', '#00ff00', '#0000ff']}
        progressBackgroundColor={mainColor}
        title='下拉刷新'
        titleColor={contentColor}
      />}
      dataSource={finalDs}
      renderRow={(rowData, sectionID, rowID) => <HomeListItem rowData={rowData} rowID={rowID} dataLength={dataLength} navigation={props.navigation} />} 
      enableEmptySections={true}
    />
  )
}

const HomeListItem = ({ rowData, rowID, dataLength, navigation }) => {
  const { _id, title, images, } = rowData
  return(
    <View style={{width: '100%'}}>
      <TouchableOpacity 
        style={home.wrap} 
        activeOpacity={0.8} 
        onPress={()=> navigation.navigate('homeDetail', {newsId: _id})}
      >
        <Image source={{uri: images[0].url}} style={home.img} />
        <View style={home.cover}>
          <Text style={home.title} numberOfLines={2}>{title}</Text>
        </View>
        <Image style={{width: '100%', height: '100%', resizeMode: 'stretch', position: 'absolute' }} source={picMaskIcon}/>
      </TouchableOpacity>
      <Text style={[home.endText, rowID == (dataLength-1) ? { } : {display: 'none' }]}>{inTheEnd}</Text>
    </View>
  )
}


