import { mainColor, titleColor, backgroundColor, subTitleColor, loginBackgroundColor, contentColor } from '../common/constants'

export default {
  wrap: {
    width: '100%',
    backgroundColor: loginBackgroundColor,
  },
  fixText: {
    height: 40,
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: backgroundColor,
    paddingVertical: 9,
    paddingLeft: 15,
    color: subTitleColor,
  },
  stateText: {
    height: 60,
    fontSize: 18,
    paddingVertical: 19,
    paddingLeft: 15,
    backgroundColor: mainColor,
  },
  imgView: {
    width: '100%',
    height: 280,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: mainColor,
  },
  img: {
    width: '100%',
    height: 260,
    resizeMode: 'contain',
    backgroundColor: mainColor,
  },
  twoTextView: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: backgroundColor,
    paddingLeft: 15,
  },
  fix2Text: {
    fontSize: 16,
    color: subTitleColor,
  },
  fix3Text: {
    fontSize: 12,
    color: contentColor,
  },
  dataView: {
    backgroundColor: mainColor,
  },
  dataTouch: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: backgroundColor,
    paddingLeft: 15,
    backgroundColor: mainColor,
  },
  textTouch: {
    fontSize: 15, 
  },
  imgTouch: {
    width: 15,
    position: 'absolute',
    right: 15,
  },
  iDataItemTouch: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: backgroundColor,
    paddingLeft: 15,
    backgroundColor: backgroundColor
  },
  iDataItemText: {
    fontSize: 14,
    color: contentColor,
  },
  iDataItemText2: {
    position: 'absolute',
    fontSize: 10,
    color: subTitleColor,
  },
  iDataItemImg: {
    position: 'absolute',
    right: 15,
    tintColor: titleColor,
  },
  logView: {
    paddingVertical: 10,
    backgroundColor: mainColor,
  },
  logText: {
    fontSize: 15, 
    color: contentColor, 
    paddingLeft: 15,
    lineHeight: 22,
  },
}