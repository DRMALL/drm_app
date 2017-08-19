import dispatch from './dispatch'

const getInfomationData = (payload)=> {
  dispatch('INFO_DATA_GET', payload)
}

export default {
  getInfomationData,
}