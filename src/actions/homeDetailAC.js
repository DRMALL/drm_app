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

export default {
  isRefresh,
  isnotRefresh,
  getOneData,
  showShare,
  hiddenShare,
}