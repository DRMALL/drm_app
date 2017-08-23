import { mainColor, lightBlueColor, subTitleColor } from '../common/constants'

export default {
  addPicView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: subTitleColor,
    borderStyle: 'dashed',
    backgroundColor: mainColor,
  },
  addPicText: {
    fontSize: 150,
    color: subTitleColor,
    fontWeight: '100',
    lineHeight: 160,
  },
  addPicTouch: {
    width: '100%',
    paddingTop: 5,
    paddingHorizontal: 16,
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
    margin: 0.5,
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