import { subTitleColor, backgroundColor, mainColor, contentColor } from '../common/constants'

export default {
  wrap: {
    backgroundColor: subTitleColor,
  },
  touchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: contentColor,
  },
}