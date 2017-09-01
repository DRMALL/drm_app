import store from '../utils/store'
import dispatch from './dispatch'
import { 
  statu_refresh_T,
  statu_refresh_F,
  statu_tab_select,
  statu_tab_normal,
  statu_datalist_get,
} from '../common/actStrings'

const isRefresh = ()=> {
  dispatch(statu_refresh_T)
}

const isnotRefresh = ()=> {
  dispatch(statu_refresh_F)
}

const pressStatusTab = (index)=> {
  let { statusArr } = store.getState().statu
  statusArr.map((item, i)=> {
    if(index == i) {
      dispatch(statu_tab_select, {
        [`StatuTabRow${index}`]: true,
        situation: item,
      })
    } else dispatch(statu_tab_normal, {[`StatuTabRow${i}`]: false})
  })
}

const getStatusData = (payload)=> {
  dispatch(statu_datalist_get, payload)
}

export default {
  isRefresh,
  isnotRefresh,
  pressStatusTab,
}