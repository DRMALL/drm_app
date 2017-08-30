import { mainColorPressed, backgroundColor, mainColor, subTitleColor, primaryColor, loginBackgroundColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  wrap: {
    height: '100%',
    backgroundColor: loginBackgroundColor,
  },
  fixText: {
    fontSize: 15,
    color: subTitleColor,
    paddingLeft: 16,
    paddingVertical: 10,
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  buttonView: {
    height: 105,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 250,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: primaryColor,
  },
  buttonText: {
    fontSize: 16, 
    color: mainColor,
  },
}