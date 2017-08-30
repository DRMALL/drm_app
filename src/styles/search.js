import { mainColor, primaryColor, backgroundColor, contentColor, subTitleColor } from '../common/constants'
import { StyleSheet } from 'react-native'

export default {
  header: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: primaryColor,
  },
  touchBack: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  inputView: {
    width: '85%',
    position: 'relative',
    justifyContent: 'center',
    paddingRight: 16,
  },
  inputText: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 3,
    fontSize: 12,
    backgroundColor: mainColor,
  },
  searchIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    position: 'absolute',
    marginHorizontal: 8,
  },
  cancelTouch: {
    position: 'absolute',
    right: 22,
  },
  cancelIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },

  fixText: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
  },
  deleteSweep: {
    position: 'absolute', 
    right: 10, 
    padding: 10,
  },
  mapView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: mainColor,
  },
  historyView: {
    paddingHorizontal: 4, 
    paddingVertical: 20,
    borderTopWidth: StyleSheet.hairlineWidth, 
    borderBottomWidth: StyleSheet.hairlineWidth, 
    borderColor: backgroundColor, 
  },
  touchHistory: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: subTitleColor,
    borderRadius: 3,
  },
  historyText: {
    fontSize: 10,
    color: contentColor,
  },
  touchHot: {
    width: '50%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: backgroundColor,
  },
  hotSearchIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginHorizontal: 16,
  },
  hotText: {
    width: 130,
    fontSize: 14,
    color: contentColor,
  },
}