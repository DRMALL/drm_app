import { mainColor, subTitleColor, lightBlueColor, backgroundColor, loginBackgroundColor, contentColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  wrap: {
    width: '100%',
    backgroundColor: loginBackgroundColor,
  },
  archivesTab: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  touchTab: {
    width: '33.333%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
  },
  archivesTabText: {
    marginRight: 5,
    fontSize: 15,
  },
  archivesItemTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  archivesItemImg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    resizeMode: 'cover',
    marginLeft: 16,
  },
  archivesItemOther: {
    width: '80%',
  },
  archivesNoTime: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  archivesNoTime2: {
    justifyContent: 'center',
  },
  archivesItemNo: {
    fontSize: 16,
  },
  archivesItemTime: {
    marginRight: 16,
    fontSize: 12,
    color: contentColor,
  },
  archivesItemLabsView: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  archivesItemLabBorder: {
    width: 60,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    borderColor: lightBlueColor,
    marginRight: 8,
  },
  archivesItemLab: {
    fontSize: 12,
    color: lightBlueColor,
  },
  archivesItemDetail: {
    width: '100%',
    lineHeight: 23,
    color: contentColor,
    paddingRight: 16,
  },
  halfOpacityView: {
    height: '100%', 
    backgroundColor: 'black', 
    opacity: 0.5,
  },
}