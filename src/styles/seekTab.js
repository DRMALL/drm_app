import { mainColor, subTitleColor, contentColor, backgroundColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  tabView: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  tabTouch: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 14,
    color: contentColor,
    marginRight: 10,
  },
}