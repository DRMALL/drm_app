import { mainColor, lightBlueColor } from '../common/constants'

export default {
  addPicView: {

  },
  addPicTouch: {
    padding: 16,
  },
  addPicImg: {
    height: 50, 
    width: 50,
  },
  showImg: {
    width: 100,
    resizeMode: 'cover',
  },
  actionShowView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
  actionButton: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: lightBlueColor,
    backgroundColor: mainColor,
  },
  actionText: {
    fontSize: 18,
  },
  halfOpacityView: {
    height: '100%', 
    backgroundColor: 'black', 
    opacity: 0.5,
  },
}