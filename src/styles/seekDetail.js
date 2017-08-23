import { mainColor, lightBlueColor, contentColor, backgroundColor, mainColorPressed, subTitleColor } from '../common/constants'

export default {
  headerView: {
    position: 'relative', 
    top: -10,
  },
  gobackIcon: {
    position: 'absolute', 
    padding: 20, 
    marginTop: 20,
  },
  shareIcon: {
    position: 'absolute', 
    padding: 20, 
    marginTop: 20,
    right: 0,
  },
  picsView: {
    width: '100%',
    height: 220,
  },
  pics: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    backgroundColor: backgroundColor, 
  },

//
  fixText: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: backgroundColor,
    fontSize: 14,
    color: subTitleColor,
  },
  textView: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  fixItemText: {
    width: 85,
    marginRight: 25,
    paddingVertical: 22,
    fontSize: 14,
    color: contentColor,
  },
  seekItemText: {
    paddingVertical: 22,
    fontSize: 16,
    color: contentColor,
  },
  itemText: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: 0.5,
    borderColor: backgroundColor,
    fontSize: 16,
    color: contentColor,
    backgroundColor: mainColor,
  },
}