import { loginBackgroundColor, subTitleColor, backgroundColor, mainColor, lightRedColor, lightBlueColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  wrap: {
    height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: loginBackgroundColor,
  },
  text: {
    height: 40,
    fontSize: 16,
    paddingVertical: 11,
    paddingLeft: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    color: subTitleColor,
  },
  buttonView: {
    paddingVertical: 15,
    paddingHorizontal: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mainColor,
    borderRadius: 10,
    // backgroundColor: lightRedColor,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    color: lightBlueColor,
  },
}