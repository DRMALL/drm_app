const home = {
  newsListData: null,
  newsOneData: null,
  shareShow: false,
  topView: {position: 'relative', zIndex: 3},
  nextView: {position: 'absolute', zIndex: 2},
}

export default (state = home, action) => {
  switch (action.type) {
    case 'HOME_DATA_GET':
      return Object.assign({}, state, { newsListData: action.payload })
    case 'HOME_ONE_DATA_GET':
      return Object.assign({}, state, { newsOneData: action.payload })
    case 'HOME_SHARE_SHOW':
      return Object.assign({}, state, { shareShow: true })
    case 'HOME_SHARE_HIDDEN':
      return Object.assign({}, state, { shareShow: false })
    default:
      return state
  }
}
