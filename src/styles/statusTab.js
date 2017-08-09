import { primaryColor, subTitleColor, mainColor, backgroundColor } from '../common/constants'

export default {
  wrap: {
    width: '100%',
    height: 50,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  text: {
    fontSize: 16,
    height: '90%',
    paddingVertical: 10,

  },
  vunoline: {
    width: '100%',
    height: '10%',
    borderRadius: 2,
  },
  vuline: {
    width: '100%',
    height: '10%',
    borderRadius: 2,
    backgroundColor: primaryColor,
  },
  touchHighlignt: {
    width: '33.3333%',
    alignItems: 'center',
  },
}