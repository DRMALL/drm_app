import { mainColor, mainColorPressed, backgroundColor, subTitleColor, lightRedColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  wrap: {
    height: '100%',
    backgroundColor: mainColor,
  },
  empty: {
    height: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColorPressed,
  },
  textInput: {
    height: 50,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  textInput2: {
    height: 400,
    textAlignVertical: 'top',
    paddingHorizontal: 16,
    fontSize: 15,
  },
  categoryTouch: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchText: {
    fontSize: 15,
    color: subTitleColor,
  },
  touchImg: {
    marginLeft: 10,
  },
  oneCategoryTouch: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  oneCategoryText: {
    fontSize: 14,
    color: subTitleColor,
  },
  worderImageView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  worderImage: {
    width: 60,
    height: 60, 
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: subTitleColor,
  },
  warningText: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    fontSize: 12,
    color: lightRedColor,
  },
}