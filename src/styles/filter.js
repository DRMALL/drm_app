import { mainColor, backgroundColor, subTitleColor } from '../common/constants'

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
    fontWeight: 'bold',
  },
  pailiangView: {
    height: 80,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: backgroundColor,
  },
  otherView: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: backgroundColor,
  },
  pailiangSecondView: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  secondView: {
    height: 30,
    justifyContent: 'center',
  },
  classText: {
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  attachText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: subTitleColor,
    marginLeft: 10,
  },
  kindView: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'visible',
  },
  kindTouch: {
    width: 55,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 2,
    marginRight: 5,
  },
  kindText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
}