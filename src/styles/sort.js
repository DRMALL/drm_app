import { mainColor, backgroundColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  modalWrap: {
    backgroundColor: mainColor,
    opacity: 1,
  },
  sortTouch: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
  },
  sortText: {
    fontSize: 16,
  },
}