import { mainColor, subTitleColor, contentColor } from '../common/constants'

export default {
  tabView: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: mainColor,
  },
  tabTouch: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: contentColor,
    marginRight: 10,
  },
}