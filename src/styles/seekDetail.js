import { mainColor, lightBlueColor, contentColor, backgroundColor, mainColorPressed, subTitleColor } from '../common/constants'
import { StyleSheet, Dimensions } from 'react-native'

export default {
  headerView: {
    position: 'relative', 
    top: -5,
  },
  gobackIcon: {
    position: 'absolute', 
    padding: 20, 
    marginTop: 20,
  },
  shareIcon: {
    position: 'absolute', 
    padding: 20, 
    marginTop: 20,
    right: 0,
  },
  picsView: {
    width: '100%',
    height: (Dimensions.get('window').width)/3*2,
  },
  pics: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: backgroundColor, 
  },

//
  fixText: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    fontSize: 14,
    color: subTitleColor,
  },
  textView: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  fixItemText: {
    width: 85,
    marginRight: 25,
    paddingVertical: 22,
    fontSize: 14,
    color: contentColor,
  },
  seekItemText: {
    paddingVertical: 22,
    fontSize: 16,
    color: contentColor,
  },
  itemText: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    fontSize: 16,
    color: contentColor,
    backgroundColor: mainColor,
  },
}