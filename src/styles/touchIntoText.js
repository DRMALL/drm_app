import { mainColor, subTitleColor, loginBorderColor, titleColor } from '../common/constants'

export default {
  wrap: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchable: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: subTitleColor,
    backgroundColor: mainColor,
  },
  textkey: {
    position: 'absolute',
    left: 15,
    fontSize: 18,
    textAlign: 'left',
    opacity: 0.8,
  },
  textvalue: {
    position: 'absolute',
    right: 40,
    width: 180,
    fontSize: 16,
    textAlign: 'right',
    color: subTitleColor,
  },
  image: {
    position: 'absolute',
    right: 15,
    tintColor: titleColor,
  },
}