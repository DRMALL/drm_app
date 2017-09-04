import store from '../utils/store'
import dispatch from './dispatch'
import { 
  statu_refresh_T,
  statu_refresh_F,
  statu_tab_select,
  statu_tab_normal,
  statu_datalist_get,
  statu_equipdata_get,
  statu_equipitemdata_set,
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

const getEquipData = (data)=> {
  let equipmentData = store.getState().statu.equipmentData
  // console.log(data, equipmentData)
  data['rnTimestamp'] = new Date().getTime()
  if(equipmentData[0] == undefined) {
    equipmentData = equipmentData.concat(data)
  } else {
    let exist = false
    equipmentData.map((eqItem, index)=> {
      if(eqItem.number === data.number) {
        exist = true
        equipmentData.splice(index, 1, data)
      } else {
        if((Number(new Date().getTime()) - Number(eqItem.rnTimestamp)) > 30000) {
          equipmentData.splice(index, 1)
        }
      }
    })
    if(!exist) {
      equipmentData = equipmentData.concat(data)
    }
  }
  dispatch(statu_equipdata_get, { equipmentData: equipmentData })
}

const setEqItemData = (payload)=> {
  dispatch(statu_equipitemdata_set, payload)
}

export default {
  isRefresh,
  isnotRefresh,
  pressStatusTab,
  getStatusData,
  getEquipData,
  setEqItemData,
}