import { all, onState, offState } from '../common/strings'
import { 
  statu_refresh_T,
  statu_refresh_F,
  statu_tab_select,
  statu_tab_normal,
  statu_datalist_get,
  statu_equipdata_get,
  statu_equipitemdata_set,
  statu_equipitemnumdata_set,
  statu_msgred_show,
  statu_search_historydata,
  statu_search_hotworddata,
  statu_search_jumpdata,
  statu_search_data_set,
  statu_search_clean_text,
} from '../common/actStrings'

const statu = (()=> {
  let statusArr = [all, onState, offState]
  let statuStateObj = {
    statusArr: statusArr,
    situation: all,
    isRefreshing: false,
    statusListData: [],
    equipmentData: [],
    equipmentItemData: {},
    eqNumberData: {},
    msgRedShow: false,
    text: '',
    jumpData: false,
    statusData: [],
    historyData: [],
    hotwordData: [],
  }
  statusArr.map((item, index)=> {
    if(index == 0) statuStateObj[`StatuTabRow${index}`] = true
    else statuStateObj[`StatuTabRow${index}`] = false
  })
  return statuStateObj
})()

export default (state = statu, action) => {
  switch (action.type) {
    case statu_refresh_T:
      return Object.assign({}, state, { isRefreshing: true })
    case statu_refresh_F:
      return Object.assign({}, state, { isRefreshing: false })
    case statu_tab_select:
      return Object.assign({}, state, action.payload)
    case statu_tab_normal:
      return Object.assign({}, state, action.payload)
    case statu_datalist_get:
      return Object.assign({}, state, { statusListData: action.payload })
    case statu_equipdata_get:
      return Object.assign({}, state, action.payload)
    case statu_equipitemdata_set: 
      return Object.assign({}, state, { equipmentItemData: action.payload })
    case statu_equipitemnumdata_set: 
      return Object.assign({}, state, { eqNumberData: action.payload })
    case statu_msgred_show: 
      return Object.assign({}, state, { msgRedShow: action.payload })
    case statu_search_historydata:
      return Object.assign({}, state, { historyData: action.payload } )
    case statu_search_hotworddata:
      return Object.assign({}, state, { hotwordData: action.payload } )
    case statu_search_jumpdata:
      return Object.assign({}, state, action.payload )
    case statu_search_data_set:
      return Object.assign({}, state, { statusData: action.payload } )
    case statu_search_clean_text:
      return Object.assign({}, state, { text: '', jumpData: false, } )
    default:
      return state
  }
}