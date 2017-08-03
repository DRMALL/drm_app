import { mainColor, subTitleColor, lightBlueColor, backgroundColor } from '../common/constants'

export default {
  wrap: {
    width: '100%',
    backgroundColor: subTitleColor,
  },
  archivesTab: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  touchTab: {
    width: '33.333%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: backgroundColor,
  },
  archivesTabText: {
    marginRight: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  archivesItemTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  archivesItemImg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    resizeMode: 'stretch',
    marginLeft: 16,
  },
  archivesItemOther: {
    width: '80%',
  },
  archivesNoTime: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  archivesNoTime2: {
    justifyContent: 'center',
  },
  archivesItemNo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  archivesItemTime: {
    marginRight: 16,
    fontSize: 12,
  },
  archivesItemLabsView: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  archivesItemLabBorder: {
    width: 60,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: lightBlueColor,
    marginRight: 8,
  },
  archivesItemLab: {
    fontSize: 12,
    color: lightBlueColor,
  },
  archivesItemDetail: {
    width: '100%',
    lineHeight: 23,
    fontWeight: 'bold',
    color: subTitleColor,
    paddingRight: 16,
  },
  halfOpacityView: {
    height: '100%', 
    backgroundColor: 'black', 
    opacity: 0.5
  },
}