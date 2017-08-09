import { subTitleColor, backgroundColor, mainColor, contentColor, loginBackgroundColor } from '../common/constants'

export default {
//Seek
  dataColumnView: {
    backgroundColor: mainColor,
    opacity: 1,
  },
  itemTouch: {
    height: 55,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  itemText: {
    fontSize: 16,
    color: subTitleColor,
  },
  halfOpacityView: {
    height: '100%', 
    backgroundColor: 'black', 
    opacity: 0.5,
  },

//SeekCategory
  wrap: {
    width: '100%',
    backgroundColor: loginBackgroundColor,
  },
  captionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    backgroundColor: backgroundColor,
  },
  materialLongCodeView: {
    width: '28%',
    borderRightWidth: 0.5,
    borderColor: subTitleColor,
  },
  materialNameView: {
    width: '26%',
    borderRightWidth: 0.5,
    borderColor: subTitleColor,
  },
  materialModelsView: {
    width: '28%',
    borderRightWidth: 0.5,
    borderColor: subTitleColor,
  },
  materialUnitesView: {
    width: '18%',
  },
  captionText: {
    alignSelf: 'center',
    fontSize: 14,
    color: subTitleColor,
  },
  touchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 28,
    paddingVertical: 20,
    borderWidth: 0.5,
    borderColor: backgroundColor,
    backgroundColor: mainColor,
  },
  text: {
    fontSize: 14,
    color: contentColor,
  },
}