import { mainColor, subTitleColor, lightBlueColor, lightRedColor, backgroundColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  wrap: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  tabText: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    fontSize: 15,
  },
  tabLine: {
    height: 4,
    borderRadius: 2,
  },
}