import dispatch from './dispatch'

const isRefresh = ()=> {
  dispatch('SEEK_DIAGNOSE_TRUE')
}

const isnotRefresh = ()=> {
  dispatch('SEEK_DIAGNOSE_FALSE')
}

const normalCate = (payload)=> {
  dispatch('DIAGNOSE_DATA_GET', payload)
}

const getDiagnoseData = (payload)=> {
  dispatch('DIAGNOSE_CATE_GET', payload)
}

const getDiagCate = (payload)=> {
  dispatch('DIAGNOSE_TAB_TRUE', payload)
}

const selectCate = (payload)=> {
  dispatch('DIAGNOSE_TAB_FALSE', payload)
}

export default {
  isRefresh,
  isnotRefresh,
  normalCate,
  getDiagnoseData,
  getDiagCate,
  selectCate,
}