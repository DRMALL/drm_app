import { mainColor, mainColorPressed, backgroundColor, subTitleColor } from '../common/constants'

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
  categoryTouch: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchText: {
    fontSize: 15,
    color: subTitleColor,
  },
  touchImg: {
    marginLeft: 10,
  },
  oneCategoryTouch: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  oneCategoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: subTitleColor,
  },
}