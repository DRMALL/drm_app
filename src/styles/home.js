import { backgroundColor, subTitleColor, mainColor } from '../common/constants'

export default {
  wrap: {
    width: '100%',
    backgroundColor,
  },
  img: {
    position: 'absolute',
    width: '100%',
    height: 240,
  },
  cover: {
    zIndex: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: 240,
    backgroundColor: 'rgba(0,0,0,.2)'
  },
  title: {
    width: '95%',
    padding: 16,
    fontSize: 20,
    lineHeight: 22,
    color: mainColor,
  },
  endText: {
    paddingVertical: 30,
    alignSelf: 'center',
    fontSize: 14,
    color: subTitleColor,
  },
}

