import { mainColor, mainColorPressed, subTitleColor, contentColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  modalWrap: {
    flexDirection: 'row',
    backgroundColor: mainColor,
    opacity: 1
  },
  classTouch: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mainColorPressed,
  },
  textClass: {
    marginLeft: 15,
    fontSize: 16,
    color: contentColor,
  },
  numImgView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numBorder: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderRadius: 2,
  },
  textNum: {
    fontSize: 12,
    color: mainColor,
  },
  imgItem: {
    height: 15,
    resizeMode: 'contain',
    marginRight: 15,
  },
}