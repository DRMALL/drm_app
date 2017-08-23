import { mainColor, backgroundColor, subTitleColor, contentColor } from '../common/constants'

export default {
  modalWrap: {
    backgroundColor: mainColor,
    opacity: 1
  },
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 15,
  },
  button: {
    width: 135,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: subTitleColor,
  },
  buttonTitle: {
    fontSize: 15,
  },
  pailiangView: {
    // height: 80,
    justifyContent: 'center',
    paddingVertical: 5,
    borderWidth: 0.5,
    borderColor: backgroundColor,
  },
  otherView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: backgroundColor,
  },
  pailiangSecondView: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondView: {
    height: 30,
    justifyContent: 'center',
  },
  classText: {
    fontSize: 12,
    marginLeft: 15,
  },
  attachText: {
    fontSize: 10,
    color: contentColor,
    marginLeft: 10,
  },
  kindView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    // overflow: 'visible',
  },
  kindTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginVertical: 5,
  },
  kindText: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 0.5,
    borderRadius: 3,
    fontSize: 14,
  },
}