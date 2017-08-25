import dispatch from './dispatch'

const isRefresh = ()=> {
  dispatch('SEEK_HOME_TRUE')
}

const isnotRefresh = ()=> {
  dispatch('SEEK_HOME_FALSE')
}

const getOneData = (payload)=> {
  dispatch('HOME_ONE_DATA_GET', payload)
}

const showShare = (data)=> {
  dispatch('HOME_SHARE_SHOW')
}

const hiddenShare = (data)=> {
  dispatch('HOME_SHARE_HIDDEN')
}

const changeWVHeight = (payload)=> {
  dispatch('HOME_WEBVIEW_HEIGHT', payload)
}

const changeWVHeightCash = (payload)=> {
  dispatch('HOME_WEBVIEW_HEIGHTCASH', payload)
}

export default {
  isRefresh,
  isnotRefresh,
  getOneData,
  showShare,
  hiddenShare,
  changeWVHeight,
}