import { mainColor, subTitleColor, lightBlueColor, lightRedColor, backgroundColor, loginBackgroundColor } from '../common/constants'

export default {
  wrap: {
    height: '100%',
    backgroundColor: loginBackgroundColor,
  },
  touchView: {
    borderWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    width: 230,
    fontSize: 17,
    fontWeight: 'bold',
  },
  solvedText: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    color: lightBlueColor,
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: lightBlueColor,
  },
  unsolvedText: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    color: lightRedColor,
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: lightRedColor,
  },
  kindsText: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 20,
    color: subTitleColor,
  },
}