import { mainColor, lightBlueColor, contentColor, backgroundColor, mainColorPressed, subTitleColor, titleColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  headerView: {
    position: 'relative', 
    top: -10,
  },
  gobackIcon: {
    position: 'absolute', 
    padding: 20, 
    marginTop: 20,
  },
  picsView: {
    width: '100%',
    height: 220,
  },
  pics: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: backgroundColor,
  },

//
  wrap: {
    width: '100%',
    backgroundColor: mainColor,
  },
  titleViewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  titleViewColumn: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 20,
    color: titleColor,
  },
  titleTime: {
    fontSize: 12,
  },
  lebalView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 12,
  },
  lebalText: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 12,
    color: lightBlueColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3,
    borderColor: lightBlueColor,
    marginRight: 8,
  },
  ordinaryText: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
    fontSize: 14,
    lineHeight: 24,
    color: contentColor,
  },
  fixTextView: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
    backgroundColor: mainColorPressed,
  },
  textFix: {
    fontSize: 15,
    color: subTitleColor,
  },
  sortText: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    fontSize: 16,
    color: contentColor,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchIcon: {
    marginLeft: 12,
    padding: 3,
  },
  downUpView: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
  },

//
  oneTimeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0,
  },
  oneTimeLineView: {
    height: '100%',
    flexDirection: 'row',
  },
  dateView: {
    width: 70, 
    height: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  dateText: {
    fontSize: 11,
  },
  lineDrawView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  contentView: {
    width: 240,
    alignItems: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    borderColor: mainColorPressed, 
    backgroundColor: mainColorPressed,
  },
  dotView: {
    right: 5, 
    height: 12, 
    width: 12, 
    borderWidth: StyleSheet.hairlineWidth, 
    borderRadius: 6, 
  },
  shortTerm: {
    height: 6, 
    borderLeftWidth: 1, //StyleSheet.hairlineWidth, 
    borderColor: subTitleColor,
  },
  longTerm: {
    borderLeftWidth: 1, //StyleSheet.hairlineWidth, 
    borderColor: subTitleColor,
  },
  typeText: {
    fontSize: 18,  
    color: subTitleColor,
  },
  contentText: {
    lineHeight: 17, 
    color: subTitleColor,
  },
}