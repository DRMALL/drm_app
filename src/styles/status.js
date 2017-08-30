import { mainColor, subTitleColor, backgroundColor, contentColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  wrap: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  img: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginLeft: 15,
    top: 20,
  },
  nextView: {
    width: '99.99%',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  cover: {
    width: '67%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  NoText: {
    width: '100%',
    fontSize: 18, 
  },
  text: {
    width: '83%',
    fontSize: 16,
    color: contentColor,
  },
  touch: {
    width: 45,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
  },
  touchText: {
    fontSize: 14
  },
}