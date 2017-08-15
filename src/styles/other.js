import { mainColor, subTitleColor, loginBackgroundColor, backgroundColor, loginBorderColor } from '../common/constants'

export default {
  wrap: {
    height: '100%',
    backgroundColor: loginBackgroundColor,
  },
  inputView: {
    position: 'relative',
    justifyContent: 'center',
    marginTop: 35,
    backgroundColor: mainColor,
  },
  textInput: {
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
    paddingRight: 60,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: backgroundColor,
  },
  cancelTouch: {
    position: 'absolute',
    padding: 10,
    right: 6,
  },
  cancelIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },

  //
  loadingView: {
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 8,
  },
  activityInd: {
    height: 50, 
    marginTop: 150,
  },
  loadingText: {
    fontSize: 11, 
    color: loginBorderColor,
  },

  
  //
  halfOpacityView: {
    height: '100%',
    position: 'relative',
    backgroundColor: 'black', 
    opacity: 0.5,
  },
  shareView: {
    width: '100%',
    backgroundColor: loginBackgroundColor,
    position: 'absolute',
    bottom: 0,
  },
  shareToText: {
    fontSize: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  imgView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imgTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  shareImg: {
    height: 66,
    width: 66,
    resizeMode: 'contain',
  },
  shareImgText: {
    fontSize: 14,
    paddingVertical: 10,
  },
  cancelShareTouch: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  cancelShareText: {
    fontSize: 20,
    paddingVertical: 10,
  },
}