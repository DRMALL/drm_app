import { mainColor, subTitleColor, contentColor, primaryColor } from '../common/constants'

export default {
  wrap: {
    width: '100%',
    height: '100%',
    backgroundColor: mainColor,
  },
  titleText: {
    paddingHorizontal: 16,
    paddingVertical: 25,
    fontSize: 24,
  },
  kindText: {
    paddingHorizontal: 16,
    fontSize: 10,
    color: subTitleColor,
  },
  contentText: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    fontSize: 14,
    color: contentColor,
  },
  img: {
    width: '90%',
    height: 200, 
    alignSelf: 'center',
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 50,
  },
  button: {
    paddingHorizontal: 57,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: primaryColor,
  },
}