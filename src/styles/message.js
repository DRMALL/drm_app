import { mainColor, loginBackgroundColor, subTitleColor, contentColor, lightRedColor, lightBlueColor, backgroundColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  scrollView: {
    backgroundColor: loginBackgroundColor,
  },
  itemView: {
    backgroundColor: subTitleColor,
  },
  itemTouchView: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  empty: {
    width: 14,
    height: 14,
    marginTop: 3,
  },
  redDot: {
    width: 14,
    height: 14,
    marginTop: 3,
    borderRadius: 7,
    backgroundColor: lightRedColor,
  },
  textPart: {
    width: '95%',
    paddingLeft: 5,
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 15,
    color: subTitleColor,
  },
  textTime: {
    fontSize: 12,
    color: subTitleColor,
  },
  textAbstract: {
    marginVertical: 8,
    fontSize: 17,
    color: contentColor,
  },
  textState: {
    lineHeight: 20,
  },
  endText: {
    alignSelf: 'center', 
    paddingVertical: 15,
    color: subTitleColor,  
    opacity: 0.8
  },
}