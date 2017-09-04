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
} from '../common/actStrings'

const device = {
  text: '',
  jumpData: false,
  deviceData: [],
  historyData: [],
  hotwordData: [],
  isRefreshing: false,
  classifyRow: false,
  sortRow: false,
  filterRow: false,
  classRowNum: 0,  
  classRow0: true,
  classKindsType: '',
  classKinds: '全部',
  classj: 0,
  kindk: 0,
  confirmPress: false,
  cleanPress: false,
  sortTypesNum: 1,
  filtercc: 'null',
  filterpressure: 'null',
  filtercombustible: 'null',
  filteraddress: 'null',
  filterSearch: false,
  topView: {position: 'relative', zIndex: 3},
  middleView: {width: '100%', position: 'absolute', zIndex: 2},
  allDevicesData: [],
  allDevicesData2: [],
  allCities: [],
}

export default (state = device, action) => {
  switch (action.type) {
    case device_history_set:
      return Object.assign({}, state, {historyData: action.payload} )
    case device_hotword_get:
      return Object.assign({}, state, {hotwordData: action.payload})
    case device_jump_set:
      return Object.assign({}, state, action.payload)
    case device_data_get:
      return Object.assign({}, state, {deviceData: action.payload})
    case device_clean_text:
      return Object.assign({}, state, {text: '', jumpData: false,})

    case device_initialize_state:
      return Object.assign({}, state, action.payload)
    case device_open_modal:
      return Object.assign({}, state, action.payload)
    case device_all_devices2:
      return Object.assign({}, state, {allDevicesData2: action.payload})
    case device_all_devices_clean:
      return Object.assign({}, state, {allDevicesData: action.payload, cleanPress: false,})
    case device_all_devices:
      return Object.assign({}, state, action.payload)
    case device_all_cities:
      return Object.assign({}, state, {allCities: action.payload})
    case device_classrowx_T:
      return Object.assign({}, state, action.payload)
    case device_classrowx_F:
      return Object.assign({}, state, action.payload)
    case device_botton_press:
      return Object.assign({}, state, action.payload)
    case device_filter_cc:
      return Object.assign({}, state, {filtercc: action.payload})
    case device_filter_pressure:
      return Object.assign({}, state, {filterpressure: action.payload})
    case device_filter_combustible:
      return Object.assign({}, state, {filtercombustible: action.payload})
    case device_filter_address:
      return Object.assign({}, state, {filteraddress: action.payload})
    case device_filter_search_T:
      return Object.assign({}, state, {filterSearch: true, filterRow: false,})// classKinds: '全部',
    case device_sorttab_press:
      return Object.assign({}, state, action.payload)
    case device_sorttab_normal:
      return Object.assign({}, state, action.payload)
    case device_class_kind_select:
      return Object.assign({}, state, action.payload)
    case device_refresh_T:
      return Object.assign({}, state, { isRefreshing: true } )
    case device_refresh_F:
      return Object.assign({}, state, { isRefreshing: false } )
    default:
      return state
  }
}