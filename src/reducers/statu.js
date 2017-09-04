import { all, onState, offState } from '../common/strings'
import { 
  statu_refresh_T,
  statu_refresh_F,
  statu_tab_select,
  statu_tab_normal,
  statu_datalist_get,
  statu_equipdata_get,
  statu_equipitemdata_set,
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
    default:
      return state
  }
}