import { subTitleColor, backgroundColor, mainColor, contentColor, loginBackgroundColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
//Seek
  dataColumnView: {
    backgroundColor: mainColor,
    opacity: 1,
  },
  itemTouch: {
    height: 55,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  itemText: {
    fontSize: 16,
    color: contentColor,
  },
  halfOpacityView: {
    height: '100%', 
    backgroundColor: 'black', 
    opacity: 0.5,
  },

//SeekCategory
  wrap: {
    width: '100%',
    backgroundColor: loginBackgroundColor,
  },
  captionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    backgroundColor: backgroundColor,
  },
  materialLongCodeView: {
    width: '28%',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: subTitleColor,
  },
  materialNameView: {
    width: '26%',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: subTitleColor,
  },
  materialModelsView: {
    width: '28%',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: subTitleColor,
  },
  materialUnitesView: {
    width: '18%',
  },
  captionText: {
    alignSelf: 'center',
    fontSize: 14,
    color: subTitleColor,
  },
  touchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 28,
    paddingVertical: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: contentColor,
  },
}