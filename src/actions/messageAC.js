import dispatch from './dispatch'

const getAll = (payload)=> {
  dispatch('MESSAGE_ALL_GET', payload)
}

export default {
  getAll,
}