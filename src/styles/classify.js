import { mainColor, mainColorPressed, subTitleColor, contentColor } from '../common/constants'

export default {
  modalWrap: {
    flexDirection: 'row',
    backgroundColor: mainColor,
    opacity: 1
  },
  classTouch: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: mainColorPressed,
  },
  textClass: {
    marginLeft: 15,
    fontSize: 14,
    color: contentColor,
  },
  numImgView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numBorder: {
    width: 35,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderRadius: 3,
    backgroundColor: subTitleColor,
  },
  textNum: {
    fontSize: 10,
    color: mainColor,
  },
  imgItem: {
    height: 15,
    resizeMode: 'contain',
    marginRight: 15,
  },
}