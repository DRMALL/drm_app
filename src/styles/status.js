import { mainColor, subTitleColor } from '../common/constants'

export default {
  wrap: {
    width: '100%',
    flexDirection: 'row',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: subTitleColor,
    backgroundColor: mainColor,
  },
  img: {
    width: '12%',
    height: '100%',
    resizeMode: 'contain',
    marginLeft: 15,
  },
  cover: {
    width: '88%',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  NoText: {
    fontSize: 18, 
    fontWeight: 'bold',
  },
  text: {
    width: '100%',
    fontSize: 16,
  },
  touch: {
    width: 45,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    borderWidth: 0.5,
    borderRadius: 2,
    marginTop: 18,
  },
  touchText: {
    fontSize: 14
  },
}