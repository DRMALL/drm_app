import { mainColor, subTitleColor, loginBackgroundColor, backgroundColor } from '../common/constants'

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
}