import dispatch from './dispatch'

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
  normalCate,
  getDiagnoseData,
  getDiagCate,
  selectCate,
}