import { mainColor, mainColorPressed, subTitleColor, contentColor, lightRedColor, lightBlueColor } from '../common/constants'

export default {
  scrollView: {
    backgroundColor: mainColorPressed,
  },
  itemView: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: subTitleColor,
    backgroundColor: mainColor,
  },
  empty: {
    width: 14,
    height: 14,
    marginTop: 3,
  },
  redDot: {
    width: 14,
    height: 14,
    marginTop: 3,
    borderRadius: 7,
    backgroundColor: lightRedColor,
  },
  textPart: {
    width: '95%',
    paddingLeft: 5,
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 15,
    color: subTitleColor,
  },
  textTime: {
    fontSize: 12,
    color: subTitleColor,
  },
  textAbstract: {
    fontSize: 17,
    color: contentColor,
  },
  textState: {
    lineHeight: 22,
    fontWeight: 'bold',
    color: lightBlueColor,
  },
  endText: {
    alignSelf: 'center', 
    paddingVertical: 15,
    color: subTitleColor, 
    fontWeight: 'bold', 
    opacity: 0.8
  },
}