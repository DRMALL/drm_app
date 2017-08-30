import { primaryColor, subTitleColor, mainColor, backgroundColor, contentColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  wrap: {
    width: '100%',
    height: 50,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  text: {
    fontSize: 16,
    height: '90%',
    paddingVertical: 10,
    color: contentColor,
  },
  vunoline: {
    width: '100%',
    height: '10%',
    borderRadius: 2,
  },
  vuline: {
    width: '100%',
    height: '10%',
    borderRadius: 2,
    backgroundColor: primaryColor,
  },
  touchHighlignt: {
    width: '33.3333%',
    alignItems: 'center',
  },
}