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

const diagnose = {
  isLoading: false,
  isRefreshing: false,
  allDiagnoseData: [],
  allDiagnoseDataMeta: null,
  allCateData: [],
  selectedCate: '',
  text: '',
  jumpData: false,
  bugsData: null,
  historyData: [],
  hotwordData: [],
}

export default (state = diagnose, action) => {
  switch (action.type) {
    case 'DIAGNOSE_CATEGORY_PRESS_START':
      return Object.assign({}, state, { allDiagnoseData: [],  selectedCate: action.payload})
    case 'DIAGNOSE_CATEGORY_PRESS_SUCCESS':
      return Object.assign({}, state, { allDiagnoseData: action.payload.data, allDiagnoseDataMeta: action.payload.meta })
    case 'DIAGNOSE_CATEGORY_PRESS_FAILURE':
      return Object.assign({}, state)
    case 'DIAGNOSE_LOAD_MORE_START':
      return Object.assign({}, state, { isLoading: true } )
    case 'DIAGNOSE_LOAD_MORE_SUCCESS':
      let data = state.allDiagnoseData.concat(action.payload.data)
      return Object.assign({}, state, { allDiagnoseData: data, allDiagnoseDataMeta: action.payload.meta, isLoading: false } )
    case 'DIAGNOSE_LOAD_MORE_FAILURE':
      return Object.assign({}, state, { isLoading: false } )
    case diag_refresh_T:
      return Object.assign({}, state, { isRefreshing: true } )
    case diag_refresh_F:
      return Object.assign({}, state, { isRefreshing: false } )
    case diag_data_get:
      return Object.assign({}, state, { allDiagnoseData: action.payload.data, allDiagnoseDataMeta: action.payload.meta })
    case diag_cate_get:
      return Object.assign({}, state, action.payload)
    case diag_tab_T:
      return Object.assign({}, state, action.payload)
    case diag_tab_F:
      return Object.assign({}, state, action.payload)
    case diag_history_set:
      return Object.assign({}, state, {historyData: action.payload} )
    case diag_hotword_get:
      return Object.assign({}, state, {hotwordData: action.payload})
    case diag_jump_set:
      return Object.assign({}, state, action.payload)
    case diag_searchdata_get:
      return Object.assign({}, state, {bugsData: action.payload})
    case diag_clean_text:
      return Object.assign({}, state, {text: '', jumpData: false,})
    default:
      return state
  }
}
