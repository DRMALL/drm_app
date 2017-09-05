import { 
  home_refresh_T,
  home_refresh_F,
  home_data_get,
  home_one_data_get,
  home_share_show,
  home_share_hidden,
  home_webview_height,
  home_webview_heightcash,
  home_routes_msgpress,
  home_headerpic_enlarge,
  home_headerpic_shut,
} from '../common/actStrings'

const home = {
  isRefreshing: false,
  newsListData: [],
  newsOneData: {},
  shareShow: false,
  topView: {position: 'relative', zIndex: 3},
  nextView: {position: 'absolute', zIndex: 2},
  height: 0,
  heightCash: 0,
  routesMsgTF: false,
  showdatu: false,
  enlargeUrl: 'null',
}

export default (state = home, action) => {
  switch (action.type) {
    case home_refresh_T:
      return Object.assign({}, state, { isRefreshing: true } )
    case home_refresh_F:
      return Object.assign({}, state, { isRefreshing: false } )
    case home_data_get:
      return Object.assign({}, state, { newsListData: action.payload })
    case home_one_data_get:
      return Object.assign({}, state, { newsOneData: action.payload })
    case home_share_show:
      return Object.assign({}, state, { shareShow: true })
    case home_share_hidden:
      return Object.assign({}, state, { shareShow: false })
    case home_webview_height:
      return Object.assign({}, state, { height: action.payload })
    case home_webview_heightcash:
      return Object.assign({}, state, { heightCash: action.payload })
    case home_routes_msgpress:
      return Object.assign({}, state, { routesMsgTF: action.payload })
    case home_headerpic_enlarge:
      return Object.assign({}, state, { showdatu: true, enlargeUrl: action.payload })
    case home_headerpic_shut:
      return Object.assign({}, state, { showdatu: false })
    default:
      return state
  }
}
