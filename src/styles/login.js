import { mainColor, loginBackgroundColor, loginBorderColor, primaryColor } from '../common/constants'

export default {
  wrap: {
    height: '110%',
    alignItems: 'center',
    // flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: loginBackgroundColor,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    lineHeight: 35,
  },
  textInput: {
    height: 40,
    width: 280,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: loginBorderColor,
    opacity: 0.5,
    backgroundColor: mainColor,
    paddingLeft: 15,
    marginBottom: 10,
  },
  touchOpacity: {
    height: 40,
    width: 280,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: primaryColor,
  },
  touchLoginText: {
    fontSize: 15,
    overflow: 'hidden',
    color: mainColor,
  },
  touchForgetText: {
    fontSize: 15,
    color: loginBorderColor,
    opacity: 0.5,
  },
}