import { subTitleColor } from '../common/constants'

export default {
  wrap: {
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign:'center',
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff', 
  },
  searchTouch: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 4, 
    backgroundColor: '#fff',
  },
  searchImg: {
    width: 15,
    height: 15,
    marginRight: 5,
    resizeMode: 'contain',
  },
  searchText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: subTitleColor,
  },
}