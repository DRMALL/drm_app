import { mainColor, mainColorPressed, backgroundColor } from '../common/constants'

export default {
  wrap: {
    height: '100%',
    backgroundColor: mainColor,
  },
  empty: {
    height: 10,
    borderWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColorPressed,
  },
  textInput: {
    height: 50,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  textInput2: {
    textAlignVertical: 'top',
    paddingHorizontal: 16,
    fontSize: 15,
  },
}