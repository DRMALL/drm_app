import { mainColor, backgroundColor, mainColorPressed, subTitleColor, primaryColor, loginBackgroundColor } from '../common/constants'

export default {
  wrap: {
    height: '100%',
    backgroundColor: loginBackgroundColor,
    position: 'relative',
  },
  fixText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: subTitleColor,
    paddingLeft: 16,
    paddingVertical: 10,
  },
  emailInput: {
    height: 50,
    paddingLeft: 15,
    paddingRight: 120,
    borderWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  getVCodeView: {
    position: 'absolute', 
    right: 16,
  },
  getVCodeButton: {
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  vCodeInput: {
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  nextButtonView: {
    height: 105,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    width: 250,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: primaryColor,
  },
  nextButtonText: {
    fontSize: 16, 
    color: mainColor, 
  },
}