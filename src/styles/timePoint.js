import { backgroundColor, mainColorPressed, contentColor, subTitleColor, mainColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  wrap: {
    height: '100%',
    backgroundColor: mainColor,
  },
  nextWrap: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
  },
  fixText: {
    paddingHorizontal: 16,
    fontSize: 15,
    color: contentColor,
  },
  touch: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    marginLeft: 10,
  },
  dateText: {
    fontSize: 15,
    color: subTitleColor,
  },
  emptyView: {
    width: '100%', 
    height: 10, 
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColorPressed,
  },
  textAreaInput: {
    height: '100%',
    textAlignVertical: 'top', 
    paddingHorizontal: 16,
    paddingTop: 10,
    fontSize: 16, 
  },
  textInput: {
    textAlignVertical: 'top', 
    paddingHorizontal: 16,
    paddingTop: 10,
    fontSize: 16, 
  },
  lineItemTouch: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
    opacity: 1,
  },
  typeText: {
    fontSize: 18,
    color: contentColor,
    marginRight: 16,
  },
}