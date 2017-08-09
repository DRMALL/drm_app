import { backgroundColor, subTitleColor, mainColor, mainColorPressed, contentColor, primaryColor, loginBackgroundColor } from '../common/constants'

export default {
  wrap: {
    height: '100%',
    backgroundColor: loginBackgroundColor,
  },
  fixContentText: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: subTitleColor,
    borderWidth: 0.5,
    borderColor: backgroundColor,
  },
  orderView: {
    backgroundColor: mainColor,
  },
  titleText: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: contentColor,
  },
  describeText: {
    paddingHorizontal: 16,
    paddingBottom: 15,
    fontSize: 14,
    lineHeight: 18,
    color: contentColor,
  },
  picsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',    //flexbox换行
    paddingHorizontal: 20,
    paddingBottom: 15,
    overflow: 'visible',
  },
  returnTimeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderColor: backgroundColor,
  },
  fixReturnText: {
    fontSize: 14,
    color: subTitleColor,
  },
  returnTime: {
    fontSize: 12,
    color: subTitleColor
  },
  returnDescribe: {
    paddingHorizontal: 16,
    paddingVertical: 25,
    fontSize: 14,
    lineHeight: 18,
    color: contentColor,
    backgroundColor: mainColor,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  unsolvedButton: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: subTitleColor,
  },
  solvedButton: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 6,
    backgroundColor: primaryColor,
  },
  img: {
    width: 102, 
    height: 60, 
    margin: 4,
  },
}