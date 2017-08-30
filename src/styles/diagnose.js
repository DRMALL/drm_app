import { mainColor, subTitleColor, lightBlueColor, lightRedColor, backgroundColor, loginBackgroundColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  wrap: {
    height: '100%',
    backgroundColor: loginBackgroundColor,
  },
  touchView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    width: 230,
    fontSize: 17,
  },
  solvedText: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    color: lightBlueColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    borderColor: lightBlueColor,
  },
  unsolvedText: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    color: lightRedColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    borderColor: lightRedColor,
  },
  kindsText: {
    fontSize: 12,
    lineHeight: 20,
    color: subTitleColor,
  },
}