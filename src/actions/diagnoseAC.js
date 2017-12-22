import dispatch from './dispatch'
import {
  diag_refresh_T,
  diag_refresh_F,
  diag_data_get,
  diag_cate_get,
  diag_tab_T,
  diag_tab_F,
  diag_history_set,
  diag_hotword_get,
  diag_jump_set,
  diag_searchdata_get,
  diag_clean_text,
} from '../common/actStrings'

const isRefresh = ()=> {
  dispatch(diag_refresh_T)
}

const isnotRefresh = ()=> {
  dispatch(diag_refresh_F)
}

const getDiagnoseData = (payload)=> {
  dispatch(diag_data_get, payload)
}

const getDiagCate = (payload)=> {
  dispatch(diag_cate_get, payload)
}

const selectCate = (payload)=> {
  dispatch(diag_tab_T, payload)
}

const normalCate = (payload)=> {
  dispatch(diag_tab_F, payload)
}

const setHistoryData = (payload)=> {
  dispatch(diag_history_set, payload)
}

const getHotword = (payload)=> {
  dispatch(diag_hotword_get, payload)
}

const setJumpData = (payload)=> {
  dispatch(diag_jump_set, payload)
}

const getBugsData = (payload)=> {
  dispatch(diag_searchdata_get, payload)
}

const pressCleanText = ()=> {
  dispatch(diag_clean_text)
}

export default {
  isRefresh,
  isnotRefresh,
  normalCate,
  getDiagnoseData,
  getDiagCate,
  selectCate,
  setHistoryData,
  getHotword,
  setJumpData,
  getBugsData,
  pressCleanText,
}
