import dispatch from './dispatch'

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
  getOneData,
  showShare,
  hiddenShare,
}