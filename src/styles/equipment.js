import { mainColor, backgroundColor, subTitleColor } from '../common/constants'

export default {
  wrap: {
    width: '100%',
    backgroundColor: backgroundColor,
  },
  fixText: {
    height: 40,
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: subTitleColor,
    paddingVertical: 9,
    paddingLeft: 15,
    color: subTitleColor,
  },
  stateText: {
    height: 60,
    fontSize: 18,
    paddingVertical: 18,
    paddingLeft: 15,
    backgroundColor: mainColor,
  },
  imgView: {
    width: '100%',
    backgroundColor: mainColor,
  },
  img: {
    width: '90%',
    height: 200,
    marginVertical: 10,
    marginHorizontal: 15,
    resizeMode: 'contain',
    backgroundColor: mainColor,
  },
  twoTextView: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: subTitleColor,
    paddingLeft: 15,
  },
  fix2Text: {
    fontSize: 16,
    color: subTitleColor,
  },
  dataView: {
    backgroundColor: mainColor,
  },
  dataTouch: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: subTitleColor,
    paddingLeft: 15,
  },
  textTouch: {
    fontSize: 15, 
  },
  imgTouch: {
    width: 15,
    position: 'absolute',
    right: 15,
  },
  logView: {
    paddingVertical: 10,
    backgroundColor: mainColor,
  },
  logText: {
    fontSize: 15, 
    color: subTitleColor, 
    paddingLeft: 15,
    lineHeight: 22,
  },
}