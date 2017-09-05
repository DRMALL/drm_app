import dispatch from './dispatch'
import { 
  home_refresh_T,
  home_refresh_F,
  home_one_data_get,
  home_share_show,
  home_share_hidden,
  home_webview_height,
  home_webview_heightcash,
  home_routes_msgpress,
  home_headerpic_enlarge,
  home_headerpic_shut,
} from '../common/actStrings'

const isRefresh = ()=> {
  dispatch(home_refresh_T)
}

const isnotRefresh = ()=> {
  dispatch(home_refresh_F)
}

const getOneData = (payload)=> {
  dispatch(home_one_data_get, payload)
}

const showShare = (data)=> {
  dispatch(home_share_show)
}

const hiddenShare = (data)=> {
  dispatch(home_share_hidden)
}

const changeWVHeight = (payload)=> {
  dispatch(home_webview_height, payload)
}

const changeWVHeightCash = (payload)=> {
  dispatch(home_webview_heightcash, payload)
}

const changeMsgPress = (payload)=> {
  dispatch(home_routes_msgpress, payload)
}

const enlargeHeaderPic = (payload)=> {
  dispatch(home_headerpic_enlarge, payload)
}

const shutHeaderPic = ()=> {
  dispatch(home_headerpic_shut)
}

export default {
  isRefresh,
  isnotRefresh,
  getOneData,
  showShare,
  hiddenShare,
  changeWVHeight,
  changeWVHeightCash,
  changeMsgPress,
  enlargeHeaderPic,
  shutHeaderPic,
}