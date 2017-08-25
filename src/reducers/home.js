const home = {
  isRefreshing: false,
  newsListData: [],
  newsOneData: {},
  shareShow: false,
  topView: {position: 'relative', zIndex: 3},
  nextView: {position: 'absolute', zIndex: 2},
  height: 0,
  heightCash: 0,
}

export default (state = home, action) => {
  switch (action.type) {
    case 'SEEK_HOME_TRUE':
      return Object.assign({}, state, { isRefreshing: true } )
    case 'SEEK_HOME_FALSE':
      return Object.assign({}, state, { isRefreshing: false } )
    case 'HOME_DATA_GET':
      return Object.assign({}, state, { newsListData: action.payload })
    case 'HOME_ONE_DATA_GET':
      return Object.assign({}, state, { newsOneData: action.payload })
    case 'HOME_SHARE_SHOW':
      return Object.assign({}, state, { shareShow: true })
    case 'HOME_SHARE_HIDDEN':
      return Object.assign({}, state, { shareShow: false })
    case 'HOME_WEBVIEW_HEIGHT':
      return Object.assign({}, state, { height: action.payload })
    case 'HOME_WEBVIEW_HEIGHTCASH':
      return Object.assign({}, state, { heightCash: action.payload })
    default:
      return state
  }
}
