import { mainColor, subTitleColor, backgroundColor } from '../common/constants'

export default {
  wrap: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  img: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginLeft: 15,
    top: 20,
  },
  nextView: {
    width: '99.99%',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  cover: {
    width: '67%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  NoText: {
    width: '100%',
    fontSize: 18, 
    fontWeight: 'bold',
  },
  text: {
    width: '86%',
    fontSize: 16,
  },
  touch: {
    width: 45,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 2,
  },
  touchText: {
    fontSize: 14
  },
}