import { mainColor, subTitleColor, backgroundColor, contentColor, loginBackgroundColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  wrap: {
    height: '100%', 
    width: '100%',
    backgroundColor: loginBackgroundColor,
  },
  selectText: {
    paddingHorizontal: 16, 
    paddingVertical: 10,
    fontSize: 14,
    color: subTitleColor,
    backgroundColor: loginBackgroundColor,
  },
  ymView: {
    height: 60,
    paddingHorizontal: 10, 
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
  },
  ymText: {
    fontSize: 20,
    color: contentColor,
  },
  fixWeekView: {
    paddingHorizontal: 16, 
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  fixWeekText: {
    fontSize: 11,
    color: subTitleColor,
  },
  calenView: {
    paddingHorizontal: 16, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  dayGridView: {
    width: `${99.9999/7}%`,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dayView: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    zIndex: 2,
  },
  backView: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  backNextView: {
    width: '50%',
    height: 36,
  },
  dayText: {
    fontSize: 15,
    color: contentColor,
    alignSelf: 'center',
  },
}