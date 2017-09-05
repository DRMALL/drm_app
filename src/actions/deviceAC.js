import dispatch from './dispatch'
import store from '../utils/store'
import { 
  device_history_set,
  device_hotword_get,
  device_jump_set,
  device_data_get,
  device_clean_text,
  device_initialize_state,
  device_open_modal,
  device_all_devices2,
  device_all_devices_clean,
  device_all_devices,
  device_all_cities,
  device_classrowx_T,
  device_classrowx_F,
  device_botton_press,
  device_filter_cc,
  device_filter_pressure,
  device_filter_combustible,
  device_filter_address,
  device_filter_search_T,
  device_sorttab_press,
  device_sorttab_normal,
  device_class_kind_select,
  device_refresh_T,
  device_refresh_F,
  device_device_ccsort,
  device_device_presort,
  device_device_fuelsort,
  device_setallrow_false,
} from '../common/actStrings'

const setHistoryData = (payload)=> {
  dispatch(device_history_set, payload)
}

const getHotword = (payload)=> {
  dispatch(device_hotword_get, payload)
}

const setJumpData = (payload)=> {
  dispatch(device_jump_set, payload)
}

const getDeviceData = (payload)=> {
  dispatch(device_data_get, payload)
}

const pressCleanText = ()=> {
  dispatch(device_clean_text)
}

const deviceInitializeState = (sortData, classifyData)=> {
  let stateObj = {}
  sortData.map((sortText, index)=> {
    if(index == 0) stateObj[`sortRow${index}`] = true
    else stateObj[`sortRow${index}`] = false
  })
  classifyData.map((item, index) => {
    stateObj[`classRow${index+1}`] = false
  })
  stateObj['classRowNum'] = classifyData.length+1

  dispatch(device_initialize_state, stateObj)
}

const openModal = (which)=> {
  let state = store.getState().device
  dispatch(device_open_modal, {
    classifyRow: which == 'classifyRow' ? !state.classifyRow : false,
    sortRow: which == 'sortRow' ? !state.sortRow : false,
    filterRow: which == 'filterRow' ? !state.filterRow : false,
    filterSearch: false,
  })
}

const setAllDevices2 = (payload)=> {
  dispatch(device_all_devices2, payload)
}

const setAllDevices = (payload)=> {
  let { cleanPress, filterSearch, filtercc, filterpressure, filtercombustible, filteraddress } = store.getState().device
  if(cleanPress) {
    dispatch(device_all_devices_clean, payload)
  } else {
    dispatch(device_all_devices, {
      allDevicesData: payload,
      filtercc: filterSearch ? filtercc : 'null',
      filterpressure: filterSearch ? filterpressure : 'null',
      filtercombustible: filterSearch ? filtercombustible : 'null',
      filteraddress: filterSearch ? filteraddress : 'null',
      filterRow: false,
    })
  }
}

const setAllCities = (payload)=> {
  dispatch(device_all_cities, payload)
}

const pressClass = (index)=> {
  let lengthNum = store.getState().device.classRowNum
  for(let i = 0; i < lengthNum; i++) {
    if(index == i) {
      dispatch(device_classrowx_T, {
        [`classRow${index}`]: true,
      })
    }
    else dispatch(device_classrowx_F, {
      [`classRow${i}`]: false,
    })
  }
}

const setBottonState = (which)=> {
  let bfoState = store.getState().device
  dispatch(device_botton_press, {
    [which]: !bfoState[which],
    filterSearch: false,
    confirmPress: false,
    filtercc: !bfoState.cleanPress ? 'null' : bfoState.filtercc,
    filterpressure: !bfoState.cleanPress ? 'null' : bfoState.filterpressure,
    filtercombustible: !bfoState.cleanPress ? 'null' : bfoState.filtercombustible,
    filteraddress: !bfoState.cleanPress ? 'null' : bfoState.filteraddress,
  })
}

const pressFilterParams = (type, kind)=> {
  let { filtercc, filterpressure, filtercombustible, filteraddress } = store.getState().device
  switch(type) {
    case 'cc': {
      dispatch(device_filter_cc, kind == filtercc ? 'null' : kind)
    }break
    case 'pressure': {
      dispatch(device_filter_pressure, kind == filterpressure ? 'null' : kind)
    }break
    case 'combustible': {
      dispatch(device_filter_combustible, kind == filtercombustible ? 'null' : kind)
    }break
    default: {
      dispatch(device_filter_address, kind == filteraddress ? 'null' : kind)
    }
  }
}

const setFilterSearchTrue = (sortData)=> {
  let stateObj = {
    filterSearch: true, 
    filterRow: false,
  }
  sortData.map((sortText, index)=> {
    if(index == 0) stateObj[`sortRow${index}`] = true
    else stateObj[`sortRow${index}`] = false
  })
  dispatch(device_filter_search_T, stateObj)
}

const sortTabPress = (s)=> {
  let state = store.getState().device
  dispatch(device_sorttab_press, {
    [`sortRow${s}`]: !state[`sortRow${s}`], 
    sortTypesNum: !state[`sortRow${s}`] ? s+1 : 0,
    sortRow: !state[`sortRow${s}`] ? false : true,
    classj: !state[`sortRow${s}`] ? 0 : state.classj,
    kindk: !state[`sortRow${s}`] ? 0 : state.kindk,
    classKinds: !state[`sortRow${s}`] ? '全部' : state.classKinds,
  })
}

const sortTabNormal = (index)=> {
  dispatch(device_sorttab_normal, {
    [`sortRow${index}`]: false,
  })
}

const selectClassKind = (j, k, type, kind)=> {
  let stNum = store.getState().device.sortTypesNum-1
  dispatch(device_class_kind_select, {
    classj: j,
    kindk: k,
    classKindsType: type,
    classKinds: kind,
    classifyRow: false,
    sortTypesNum: 1,
    sortRow0: true,
    [`sortRow${stNum}`]: stNum == 0 ? true : false,
  })
}

const isRefresh = ()=> {
  dispatch(device_refresh_T)
}

const isnotRefresh = ()=> {
  dispatch(device_refresh_F)
}

const setCcsort = (data)=> {
  return new Promise((resovle, reject)=> {
    let sortCC = {
      class: '排量',
      kinds: [],
    }
    data.forEach((item, i)=> {
      sortCC.kinds.push({
        text: item.text,
        type: 'cc',
      })
    })
    dispatch(device_device_ccsort, sortCC)
    resovle(sortCC)
  })
}

const setPresort = (data)=> {
  return new Promise((resovle, reject)=> {
    let sortPRE = {
      class: '压力范围',
      kinds: [],
    }
    data.forEach((item, i)=> {
      sortPRE.kinds.push({
        text: item.text,
        type: 'pressure',
      })
    })
    dispatch(device_device_presort, sortPRE)
    resovle(sortPRE)
  })
}

const setFuelsort = (data)=> {
  return new Promise((resovle, reject)=> {
    let sortFUEL = {
      class: '使用燃料',
      kinds: [],
    }
    data.forEach((item, i)=> {
      sortFUEL.kinds.push({
        text: item.text,
        type: 'combustible',
      })
    })
    dispatch(device_device_fuelsort, sortFUEL)
    resovle(sortFUEL)
  })
}

const setAllRowFalse = ()=> {
  // console.log('1')
  dispatch(device_setallrow_false)
}

export default {
  setHistoryData,
  getHotword,
  setJumpData,
  getDeviceData,
  pressCleanText,
  deviceInitializeState,
  openModal,
  setAllDevices2,
  setAllDevices,
  setAllCities,
  pressClass,
  setBottonState,
  pressFilterParams,
  setFilterSearchTrue,
  sortTabPress,
  sortTabNormal,
  selectClassKind,
  isRefresh,
  isnotRefresh,
  setCcsort,
  setPresort,
  setFuelsort,
  setAllRowFalse,
}